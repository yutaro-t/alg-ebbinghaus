
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
    console.log(`${action.type} was called and default reducer was used`);
    return {...state};
  })