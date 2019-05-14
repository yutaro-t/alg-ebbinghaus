
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import Cube from 'cubejs';

import { practiceActions } from '../../actions/practice';
import { Alg } from '../Alg';


export interface PracticeState {
  alg: Alg,
  randomAuf: "U'" | 'U2' | 'U' | '',
  expectedCube: Cube,
  mode: 'wait' | 'press' | 'solve',
  currentTime: number,
  startTime: number,
}

export const initialState: PracticeState  = {
  alg: new Alg(),
  randomAuf: '',
  expectedCube: new Cube(),
  mode: 'wait',
  currentTime: 0,
  startTime: 0,
}

export const practiceReducer = reducerWithInitialState(initialState)
  .case(practiceActions.toPressing, (state): PracticeState => {
    return {
      ...state,
      mode: 'press',
    }
  })
  .case(practiceActions.start, (state, { alg, auf }): PracticeState => {
    return {
      ...state,
      mode: 'solve',
      startTime: performance.now(),
      alg,
      randomAuf: auf,
    }
  })
  .case(practiceActions.tick, (state, tickTime): PracticeState => {
    return {
      ...state,
      currentTime: tickTime - state.startTime,
    }
  })
  .case(practiceActions.stop, (state): PracticeState => {
    const cube = state.expectedCube.clone();
    cube.move(state.randomAuf + ' ' + state.alg.toString());
    return {
      ...state,
      mode: 'wait',
      expectedCube: cube,
    }
  })
  .cases([practiceActions.reset, practiceActions.fail], (state): PracticeState => {
    return {
      ...state,
      mode: 'wait',
      expectedCube: new Cube(),
    }
  })
  .default((state, action) => {
    return {...state};
  })