import React from 'react';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';


import { AlgList } from './components/AlgList';
import { PractisePanel } from './components/PractisePanel';
import { MenuBar } from './components/MenuBar';
import { history } from './store';


const styles = (theme: Theme): StyleRules => createStyles({
  container: {
    padding: theme.spacing.unit * 2,
  }
});

export type AppProps = WithStyles<typeof styles>;
export const AppBase: React.SFC<AppProps> = ({ classes }: AppProps) => {
  return(
    <ConnectedRouter history={history}>
      <MenuBar />
      <main className={classes.container}>
          <Switch>
            <Route exact path="/" component={PractisePanel} />
            <Route path="/algorithms" component={AlgList} />
            <Route render={() => <div>Not found Error</div>} />
            {/* sss */}
          </Switch>
      </main>
    </ConnectedRouter>
  );
}

export const App = withStyles(styles)(AppBase);