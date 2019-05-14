
import { combineReducers } from 'redux';

import { practiceReducer } from './practice';
import { algEditorReducer } from './algEditor';

export const uiReducer = combineReducers({
  practice: practiceReducer,
  algEditor: algEditorReducer,
})