import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from 'redux-logger';

import { algListReducer, AlgListState } from './algList/index';

const rootReducer = combineReducers({
  algList: algListReducer,
});

export interface AppState {
  algList: AlgListState,
};

export default function configureStore() {
  const middlewares: any[] = [logger];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}