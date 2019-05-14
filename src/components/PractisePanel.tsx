import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, Grid, Typography, Fab, AppBar, Toolbar } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { KEY_SPACE } from 'keycode-js';

import { AppState } from '../store';
import { RubiksCube } from './RubiksCube';
import { practiceActions } from '../actions/practice';
import { Alg } from '../store/Alg'; 

const styles = (theme: Theme): StyleRules => createStyles({
  slot: {
    textAlign: 'center',
  },
  slotTitle: {
    marginBottom: theme.spacing.unit * 2,
  },
  timer: {
    fontFamily: "sans-serif",
    fontSize: theme.typography.fontSize * 4,
    marginTop: theme.spacing.unit * 4,
  },
  alg: {
    fontSize: theme.typography.fontSize * 3,
    marginTop: theme.spacing.unit * 2,
  },
  bottomButtons: {
    top: 'auto',
    bottom: theme.spacing.unit,
  },
});

const mapStateToProps = (state: AppState) => ({
  ...state.ui.practice,
  algs: state.entities.algs.list
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  next : () => dispatch(practiceActions.next()),
  reset: () => dispatch(practiceActions.reset()),
  fail: () => dispatch(practiceActions.fail()),
  toPressing: () => dispatch(practiceActions.toPressing()),
  start: (alg: Alg) => dispatch(practiceActions.start({alg, auf: ''})),
  stop: () => dispatch(practiceActions.stop()),
});

export type PractisePanelProps = WithStyles<typeof styles> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
export const PractisePanelBase: React.SFC<PractisePanelProps> = 
  ({ classes, currentTime, mode, algs, next, reset, fail, toPressing, start, stop, alg, expectedCube }: PractisePanelProps) => {

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if(e.keyCode === KEY_SPACE && mode === 'wait' && algs.length > 0) {
        toPressing();
      }
    }
    const handleKeyUp = (e:any) => {
      if(e.keyCode === KEY_SPACE && mode === 'press') {
        const i = Math.floor(Math.random() * algs.length);
        start(algs[i]);
      } else if(e.keyCode === KEY_SPACE && mode === 'solve' && algs.length > 0) {
        stop();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [toPressing, start, mode, algs, stop]);

  let secStr = '  ' + Math.floor(currentTime / 1000);
  secStr = secStr.substring(secStr.length - 3);
  let milliStr = '0' + Math.floor(currentTime) % 100;
  milliStr = milliStr.substring(milliStr.length - 2);

  return(
    <div>
      <Grid container>
        <Grid item xs={6} className={classes.slot}>
          <Typography align="center" variant="h4" className={classes.slotTitle}>
            Solve
          </Typography>
          <RubiksCube cube={alg.getCube()} size={300}/>
          <div className={classes.timer}>
            {
              mode === 'press' ? 'READY' :
              currentTime > 0 ? secStr + '.' + milliStr :
              ''
            }
          </div>
        </Grid>
        <Grid item xs={6} className={classes.slot}>
          <Typography align="center" variant="h4" className={classes.slotTitle}>
            Expected
          </Typography>
          <RubiksCube cube={expectedCube} size={300} />
          <Typography variant="body1" className={classes.alg}>
            {mode === 'wait' ? alg.base : ''}
            </Typography>
        </Grid>
      </Grid>
      <AppBar position="fixed" color="default" className={classes.bottomButtons}>
        <Toolbar>
          <Grid container justify="center">
            {/* <Grid item xs={2}>
              <Fab variant="extended" color="primary" aria-label="next" className={classes.bottomButton}
                onClick={() => next()} onKeyDown={(e) => e.preventDefault()}>
                <ArrowForwardIcon />
                Next
              </Fab>
            </Grid> */}
            <Grid item xs={2}>
              <Fab variant="extended" color="secondary" aria-label="failed" className={classes.bottomButton}
               onClick={() => fail()} onKeyDown={(e) => e.preventDefault()}>
                <CancelIcon />
                Failed
              </Fab>
            </Grid>
            <Grid item xs={2}>
              <Fab variant="extended" color="default" aria-label="failed" className={classes.bottomButton}
               onClick={() => reset()} onKeyDown={(e) => e.preventDefault()}>
                <AutorenewIcon />
                Reset
              </Fab>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
    
  );
}

export const PractisePanel = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PractisePanelBase));