
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';

import { RubiksCube } from './RubiksCube';
import { AppState } from '../store';
import { createStyles, Paper, TextField, Button } from '@material-ui/core';
import { Delete as DeleteIcon, Save as SaveIcon, SaveAlt as SaveAltIcon, Create as CreateIcon } from '@material-ui/icons';
import { algEditorActions } from '../actions/algEditor';
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


const mapStateToProps = (state: AppState) => ({
  ...state.ui.algEditor,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateBase: (v:string) => dispatch(algEditorActions.updateBase(v)),
  updatePremove: (v:string) => dispatch(algEditorActions.updatePremove(v)),
  updateAuf: (v:string) => dispatch(algEditorActions.updateAuf(v)),
  saveNew: (alg: Alg) => dispatch(algEditorActions.saveNew(alg)),
  save: (idx: number, alg: Alg) => dispatch(algEditorActions.save({idx, alg})),
  dlt: (idx: number) => dispatch(algEditorActions.delete(idx)),
  newF: () => dispatch(algEditorActions.new()),
  inverse: () => dispatch(algEditorActions.inverse()),
  mirror: () => dispatch(algEditorActions.mirror()),
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
        onClick={() => save(idx, alg)}
      >
        Save<SaveIcon className={classes.icon}/>
      </Button>
      <Button className={classes.containedButton} 
        variant="contained"
        color="primary"
        onClick={() => saveNew(alg)}
      >
        Save as new<SaveAltIcon className={classes.icon}/>
      </Button>
      <Button className={classes.containedButton}
        variant="contained" 
        color="secondary"
        onClick={() => dlt(idx)}
        disabled={idx === -1}
      >
        Delete<DeleteIcon className={classes.icon} />
      </Button> 
    </Paper>);
};

export const AlgEditor = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AlgEditorBase));