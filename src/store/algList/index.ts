
import { combineReducers } from 'redux';
import { reduceReducers } from '../../utils/reduce-reducers';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { editorActions } from '../../actions/algList/editor';
import { listActions } from '../../actions/algList/list';
import { editorReducer, initialState as editorInitialState } from './editor';
import { listReducer, initialState as listInitialState } from './list';



const initialState = {
  editor: editorInitialState,
  list: listInitialState,
};

export const baseReducer = reducerWithInitialState(initialState)
  .case(editorActions.saveNew, (state)  => {
    return {
      ...state, 
      list: {
        ...state.list,
        algs: [...state.list.algs, state.editor.alg],
      }
    }
  })
  .case(editorActions.save, (state) => {
    return {
      ...state,
      list: {
        ...state.list,
        algs: state.list.algs.map((alg, i) => i === state.editor.idx ? state.editor.alg : alg)
      }
    }
  })
  .case(editorActions.delete, (state) => {
    return {
      ...state,
      list: {
        ...state.list,
        algs: state.list.algs.filter((_, i) => i !== state.editor.idx)
      }
    }
  })
  .case(listActions.select, (state, idx) => {
    return {
      ...state,
      editor: {...editorInitialState, alg: state.list.algs[idx], validAlg: state.list.algs[idx], idx},
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