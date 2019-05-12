import { createStore, combineReducers, applyMiddleware} from "redux";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';

import { algListReducer } from './algList/index';
import { timerMiddleware } from '../middlewares/timer';
import { timerReducer } from './timer';

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  algList: algListReducer,
  timer: timerReducer,
  router: connectRouter(history),
});

export type AppState = ReturnType<typeof rootReducer>;


export function configureStore() {
  const middlewares: any[] = [logger, routerMiddleware(history), timerMiddleware];

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
}

export default configureStore;