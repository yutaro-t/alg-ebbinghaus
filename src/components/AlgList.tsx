
import React from 'react';
import { connect } from 'react-redux';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import { Dispatch } from 'redux';

import { RubiksCube } from './RubiksCube';
import { AlgEditor } from './AlgEditor';
import { Alg } from '../store/Alg';
import { AppState } from '../store';
import { listActions } from '../actions/algList/list';
import { createStyles, CardContent, CardActionArea, Card, Grid, Typography } from '@material-ui/core';

const styles = (theme: Theme): StyleRules => createStyles({
  picture: {
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
  },
  card: {
    display: 'flex',
  }
})

export interface AlgListBaseProps extends WithStyles<typeof styles> {
  algs: Alg[],
}

const mapStateToProps= (state: AppState) => ({
  algs: state.algList.list.algs,
  selectedIdx: state.algList.editor.idx,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  select: (v: number) => dispatch(listActions.select(v)),
});

export type AlgListProps = AlgListBaseProps & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>


export const AlgListBase: React.SFC<AlgListProps> = 
    ({ algs, classes, select, selectedIdx }: AlgListProps) => {

  const toElement = (alg: Alg, idx: number) => {

    return (<Grid item xs = {4} key={idx}>
      <Card raised={idx === selectedIdx}>
        <CardActionArea  className={classes.card} onClick={() => select(idx)}>
          <div className={classes.picture}>
            <RubiksCube cube={alg.getCube()} size={100}/>
          </div>
          <CardContent>
            <Typography variant="body2" gutterBottom>{alg.premove}</Typography>
            <Typography variant="body1" gutterBottom>{alg.base}</Typography>
            <Typography variant="body2" gutterBottom>{alg.auf}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>)
  }

  return (
    <Grid container spacing={24}>
      <Grid item xs={9}>
        <Grid container spacing={16}>
          {algs.map(toElement)}
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <AlgEditor />
      </Grid>
    </Grid>
  )
};


export const AlgList = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AlgListBase));
export default AlgList;