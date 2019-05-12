
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { timerActions } from '../actions/timer';


export interface TimerState {
  startTime: number,
  isRunning: boolean,
  currentTime: number,
}

export const initialState: TimerState  = {
  startTime: -1,
  isRunning: false,
  currentTime: 0,
}

export const timerReducer = reducerWithInitialState(initialState)
  .case(timerActions.start, (state) => {
    return {
      ...state,
      isRunning: true,
      startTime: performance.now(),
    };
  })
  .case(timerActions.tick, (state) => {
    return {
      ...state,
      currentTime: performance.now() - state.startTime,
    };
  })
  .case(timerActions.stop, (state) => {
    return {
      ...state,
      isRunning: false,
    };
  })
  .case(timerActions.reset, () => {
    return initialState;
  })
  .case(timerActions.toggle, (state) => {
    if(state.isRunning) {
      return {
        ...state,
        isRunning: false
      }
    } else if (state.currentTime === 0) {
      return {
        ...state,
        isRunning: true,
        startTime: performance.now(),

      }
    }
    return {...state};
  })
  .default((state, action) => {
    return {...state};
  })