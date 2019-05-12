import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, Grid, Typography, Fab, AppBar, Toolbar } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Cube from 'cubejs';
import { KEY_SPACE } from 'keycode-js';

import { AppState } from '../store';
import { RubiksCube } from './RubiksCube';
import { timerActions } from 'actions/timer';


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
  timerCurrentTime: state.timer.currentTime,
  isTimerRunning: state.timer.isRunning,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  timerToggle: () => dispatch(timerActions.toggle()),
  timerReset: () => dispatch(timerActions.reset()),
});

export type PractisePanelProps = WithStyles<typeof styles> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
export const PractisePanelBase: React.SFC<PractisePanelProps> = 
  ({ classes, timerToggle, timerReset, timerCurrentTime, isTimerRunning }: PractisePanelProps) => {


  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if(e.keyCode === KEY_SPACE) {
        timerToggle();
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [timerToggle]);

  return(
    <div>
      <Grid container>
        <Grid item xs={6} className={classes.slot}>
          <Typography align="center" variant="h4" className={classes.slotTitle}>
            Solve
          </Typography>
          <RubiksCube cube={new Cube()} size={300}/>
          <div className={classes.timer}>{(timerCurrentTime / 1000).toString().substring(0, 5)}</div>
        </Grid>
        <Grid item xs={6} className={classes.slot}>
          <Typography align="center" variant="h4" className={classes.slotTitle}>
            Expected
          </Typography>
          <RubiksCube cube={new Cube()} size={300} />
          <Typography variant="body1" className={classes.alg}>R U R' U R U2 R'</Typography>
        </Grid>
      </Grid>
      <AppBar position="fixed" color="default" className={classes.bottomButtons}>
        <Toolbar>
          <Grid container justify="center">
            <Grid item xs={2}>
              <Fab variant="extended" color="primary" aria-label="next" className={classes.bottomButton}
                onClick={() => timerReset()} onKeyDown={(e) => e.preventDefault()}>
                <ArrowForwardIcon />
                Next
              </Fab>
            </Grid>
            <Grid item xs={2}>
              <Fab variant="extended" color="secondary" aria-label="failed" className={classes.bottomButton}
               onKeyDown={(e) => e.preventDefault()}>
                <CancelIcon />
                Failed
              </Fab>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
    
  );
}

export const PractisePanel = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PractisePanelBase));