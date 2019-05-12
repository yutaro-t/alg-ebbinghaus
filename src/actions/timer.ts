
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('TIMER');

export const timerActions = {
  start: actionCreator<void>('START'),
  stop: actionCreator<void>('STOP'),
  reset: actionCreator<void>('RESET'),
  tick: actionCreator<void>('TICK'),
  toggle: actionCreator<void>('TOGGLE')
}