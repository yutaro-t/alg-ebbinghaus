
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Alg } from '../Alg';


export interface ListState {
  algs: Alg[],
}

export const initialState  = {
  algs: [] as Alg[],
}

export const listReducer = reducerWithInitialState(initialState)
  .default((state, action) => {
    return {...state};
  })