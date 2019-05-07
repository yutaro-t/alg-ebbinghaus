
import { combineReducers } from 'redux';
import { reduceReducers } from '../../utils/reduce-reducers';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { editorActions } from '../../actions/algList/editor';
import { editorReducer, EditorState, initialState as editorInitialState } from './editor';
import { listReducer, ListState, initialState as listInitialState } from './list';
import { Alg } from '../Alg';



const initialState = {
  editor: editorInitialState,
  list: listInitialState,
};

export const baseReducer = reducerWithInitialState(initialState)
  .case(editorActions.saveAlg, (state)  => {
    return {
      ...state, 
      editor: {alg: new Alg(), validAlg: new Alg()},
      list: {
        algs: [...state.list.algs, state.editor.alg],
      }
    }
  })
  .default((state, action) => {
    return {...state};
  })

export const algListReducer = reduceReducers(baseReducer, 
  combineReducers({
    editor: editorReducer, list: listReducer
  }));

export type AlgListState = ReturnType<typeof algListReducer>;