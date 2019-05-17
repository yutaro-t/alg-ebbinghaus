
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { algsActions } from '../../actions/algs';
import { algEditorActions } from '../../actions/algEditor';
import { Alg } from '../Alg';


export interface AlgsState {
  list: Alg[],
}

export const initialState: AlgsState  = {
  list: [],
}

export const algsReducer = reducerWithInitialState(initialState)
  .cases([algsActions.create, algEditorActions.saveNew], (state, alg: Alg) => {
    return {
      ...state,
      list: [...state.list, alg]
    };
  })
  .cases([algsActions.update, algEditorActions.save], (state, {idx, alg}) => {
    return {
      ...state,
      list: state.list.map((v, i) => i === idx ? alg : v),
    };
  })
  .cases([algsActions.remove, algEditorActions.delete], (state, idx: number) => {
    return {
      ...state,
      list: state.list.filter((_, i) => i !== idx)
    };
  })
  .case(algsActions.move, (state, {from, to}) => {
    const removed = state.list.filter((_, i) => i !== from);
    return {
      ...state,
      list: [...removed.slice(0, to), state.list[from], ...removed.slice(to)]
    };
  })
  .default((state, action) => {
    return state;
  })