
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Action } from 'typescript-fsa';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';

import { RubiksCube } from './RubiksCube';
import { AppState } from '../store';
import { createStyles, Paper, TextField, Button } from '@material-ui/core';
import { Delete as DeleteIcon, Save as SaveIcon, SaveAlt as SaveAltIcon } from '@material-ui/icons';
import { editorActions } from '../actions/algList/editor';
import { Alg } from '../store/Alg';

const styles = (theme: Theme): StyleRules => createStyles({
  wrapper: {
    textAlign: 'center',
    padding: theme.spacing.unit,

  },
  textField: {
  },
  textFieldWrapper: {
    padding: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  containedButton: {
    margin: theme.spacing.unit,
  },
  icon: {
    marginLeft: theme.spacing.unit,
  }
});

export interface AlgEditProps extends WithStyles<typeof styles> {
  alg: Alg
  validAlg: Alg,
  updateBase: (v: string) => Action<string>,
  updatePremove: (v: string) => Action<string>,
  updateAuf: (v: string) => Action<string>,
  saveAlg: () => Action<void>;
}

const mapStateToProps = (state: AppState) => ({
  ...state.algList.editor,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateBase: (v:string) => dispatch(editorActions.updateBase(v)),
  updatePremove: (v:string) => dispatch(editorActions.updatePremove(v)),
  updateAuf: (v:string) => dispatch(editorActions.updateAuf(v)),
  saveAlg: () => dispatch(editorActions.saveAlg()),
})

export const AlgEditorBase: React.SFC<AlgEditProps> = 
  ({ alg, validAlg, classes, updateBase, updatePremove, updateAuf, saveAlg }: AlgEditProps) => {
    return (<Paper>
      <div className={classes.wrapper}>
        <RubiksCube cube={validAlg.getCube()} size={200}/>
      </div>
      <div className={classes.textFieldWrapper}>
        <TextField
          label="Premove"
          value={alg.premove}
          variant="outlined"
          className={classes.textField}
          onChange={(e) => updatePremove(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Algorithm"
          value={alg.base}
          variant="outlined"
          className={classes.textField}
          onChange={(e) => updateBase(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="AUF"
          value={alg.auf}
          variant="outlined"
          className={classes.textField}
          onChange={(e) => updateAuf(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <Button className={classes.button}>Inverse</Button>
      <Button className={classes.button}>Mirror</Button>
      <br />
      <Button className={classes.containedButton} variant="contained">New</Button>
      <Button className={classes.containedButton} variant="contained" color="primary">Save<SaveIcon className={classes.icon}/></Button>
      <Button className={classes.containedButton} 
        variant="contained"
        color="primary"
        onClick={() => saveAlg()}
        >
        Save as new<SaveAltIcon className={classes.icon}/>
      </Button>
      <Button className={classes.containedButton} variant="contained" color="secondary">Delete<DeleteIcon className={classes.icon} /></Button> 
    </Paper>);
};

export const AlgEditor = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AlgEditorBase));