import { createStore, combineReducers, applyMiddleware} from "redux";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger'

import { timerMiddleware } from '../middlewares/timer';
import { uiReducer } from './ui';
import { entitiesReducer } from './entities';

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  ui: uiReducer,
  entities: entitiesReducer,
  router: connectRouter(history),
});

export type AppState = ReturnType<typeof rootReducer>;


export function configureStore() {
  const logger = createLogger({
    predicate: (getState, action) => action.type !== 'PRACTICE/TICK'
  });

  const middlewares: any[] = [logger, routerMiddleware(history), timerMiddleware];

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
}

export default configureStore;