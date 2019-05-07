
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Alg } from '../Alg';
import { editorActions } from '../../actions/algList/editor';


export interface EditorState {
  alg: Alg,
  validAlg: Alg,
}

export const initialState  = {
  alg: new Alg(),
  validAlg: new Alg(),
}

export const editorReducer = reducerWithInitialState(initialState)
  .case(editorActions.updateBase, (state, base) => {
    const alg: Alg = state.alg.withBase(base);
    const validAlg = alg.isValid()
      ? alg
      : state.validAlg;
    return {...state, alg, validAlg}
  })
  .case(editorActions.updatePremove, (state, premove) => {
    const alg: Alg = state.alg.withPremove(premove);
    const validAlg = alg.isValid()
      ? alg
      : state.validAlg;
    return {...state, alg, validAlg}
  })
  .case(editorActions.updateAuf, (state, auf) => {
    const alg: Alg = state.alg.withAuf(auf);
    const validAlg = alg.isValid()
      ? alg
      : state.validAlg;
    return {...state, alg, validAlg}
  })
  .default((state, action) => {
    console.log(`${action.type} was called and default reducer was used`);
    return {...state};
  })