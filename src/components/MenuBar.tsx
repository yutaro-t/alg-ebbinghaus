import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

import { AppBar, Toolbar, Button, Typography, Grid } from '@material-ui/core';

import { AppState } from '../store';

const styles = (theme: Theme) => createStyles( {
  button: {
    marginRight: theme.spacing.unit
  },
});

const mapStateToProps = (state: AppState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export interface MenuBarProps extends WithStyles<typeof styles>, ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {

};

export const MenuBarBase: React.SFC<MenuBarProps> = ({ classes }: MenuBarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container> 
          <Grid item xs={2}>
            <Typography variant="h6" color="inherit">
              Alg Ebbinghaus
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button color="inherit" className={classes.button}>
              Practise
            </Button>
            <Button color="inherit" className={classes.button}>
              Algolithms
            </Button>
            <Button color="inherit" className={classes.button}>
              Settings
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export const MenuBar = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MenuBarBase));