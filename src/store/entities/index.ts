
import { combineReducers } from 'redux';

import { algsReducer } from './algs';

export const entitiesReducer = combineReducers({
  algs: algsReducer,
})