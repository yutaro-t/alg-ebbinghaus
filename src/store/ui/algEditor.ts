
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Alg } from '../Alg';
import { algEditorActions } from '../../actions/algEditor';


export interface AlgEditorState {
  alg: Alg,
  validAlg: Alg,
  idx: number,
}

export const initialState  = {
  alg: new Alg(),
  validAlg: new Alg(),
  idx: -1,
}

export const algEditorReducer = reducerWithInitialState(initialState)
  .case(algEditorActions.updateBase, (state, base) => {
    const alg: Alg = state.alg.withBase(base);
    const validAlg = alg.isValid()
      ? alg
      : state.validAlg;
    return {...state, alg, validAlg}
  })
  .case(algEditorActions.updatePremove, (state, premove) => {
    const alg: Alg = state.alg.withPremove(premove);
    const validAlg = alg.isValid()
      ? alg
      : state.validAlg;
    return {...state, alg, validAlg}
  })
  .case(algEditorActions.updateAuf, (state, auf) => {
    const alg: Alg = state.alg.withAuf(auf);
    const validAlg = alg.isValid()
      ? alg
      : state.validAlg;
    return {...state, alg, validAlg}
  })
  .case(algEditorActions.inverse, (state) => {
    return {
      ...state,
      alg: state.validAlg.inverse(),
      validAlg: state.validAlg.inverse(),
    }
  })
  .case(algEditorActions.mirror, (state) => {
    return {
      ...state,
      alg: state.validAlg.mirror(),
      validAlg: state.validAlg.mirror(),
    }
  })
  .cases([algEditorActions.saveNew, algEditorActions.save, algEditorActions.new, algEditorActions.delete], () => {
    return initialState;
  })
  .case(algEditorActions.select, (state, {idx, alg}) => {
    return {
      ...state,
      alg,
      validAlg: alg,
      idx,
    }
  })
  .default((state, action) => {
    return {...state};
  })