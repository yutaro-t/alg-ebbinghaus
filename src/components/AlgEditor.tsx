
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';

import { RubiksCube } from './RubiksCube';
import { AppState } from '../store';
import { createStyles, Paper, TextField, Button } from '@material-ui/core';
import { Delete as DeleteIcon, Save as SaveIcon, SaveAlt as SaveAltIcon, Create as CreateIcon } from '@material-ui/icons';
import { editorActions } from '../actions/algList/editor';

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


const mapStateToProps = (state: AppState) => ({
  ...state.algList.editor,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateBase: (v:string) => dispatch(editorActions.updateBase(v)),
  updatePremove: (v:string) => dispatch(editorActions.updatePremove(v)),
  updateAuf: (v:string) => dispatch(editorActions.updateAuf(v)),
  saveNew: () => dispatch(editorActions.saveNew()),
  save: () => dispatch(editorActions.save()),
  dlt: () => dispatch(editorActions.delete()),
  newF: () => dispatch(editorActions.new()),
  inverse: () => dispatch(editorActions.inverse()),
  mirror: () => dispatch(editorActions.mirror()),
})

export interface AlgEditProps extends WithStyles<typeof styles>, ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
}

export const AlgEditorBase: React.SFC<AlgEditProps> = 
  ({ alg, validAlg, classes, updateBase, updatePremove, updateAuf, saveNew, save, dlt, 
    newF, inverse, mirror, idx }: AlgEditProps) => {
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
      <Button className={classes.button}
        onClick={() => inverse()}
      >
        Inverse
      </Button>
      <Button className={classes.button}
        onClick={() => mirror()}
      >
        Mirror
      </Button>
      <br />
      <Button className={classes.containedButton} 
        variant="contained"
        onClick={() => newF()}
      >
        New<CreateIcon className={classes.icon}/>
      </Button>
      <Button className={classes.containedButton} 
        variant="contained" 
        color="primary"
        disabled={idx === -1}
        onClick={() => save()}
      >
        Save<SaveIcon className={classes.icon}/>
      </Button>
      <Button className={classes.containedButton} 
        variant="contained"
        color="primary"
        onClick={() => saveNew()}
      >
        Save as new<SaveAltIcon className={classes.icon}/>
      </Button>
      <Button className={classes.containedButton}
        variant="contained" 
        color="secondary"
        onClick={() => dlt()}
        disabled={idx === -1}
      >
        Delete<DeleteIcon className={classes.icon} />
      </Button> 
    </Paper>);
};

export const AlgEditor = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AlgEditorBase));