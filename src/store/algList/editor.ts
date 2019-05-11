
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Alg } from '../Alg';
import { editorActions } from '../../actions/algList/editor';


export interface EditorState {
  alg: Alg,
  validAlg: Alg,
  idx: number,
}

export const initialState  = {
  alg: new Alg(),
  validAlg: new Alg(),
  idx: -1,
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
  .case(editorActions.inverse, (state) => {
    return {
      ...state,
      alg: state.validAlg.inverse(),
      validAlg: state.validAlg.inverse(),
    }
  })
  .case(editorActions.mirror, (state) => {
    return {
      ...state,
      alg: state.validAlg.mirror(),
      validAlg: state.validAlg.mirror(),
    }
  })
  .cases([editorActions.saveNew, editorActions.save, editorActions.new, editorActions.delete], () => {
    return initialState;
  })
  .default((state, action) => {
    return {...state};
  })