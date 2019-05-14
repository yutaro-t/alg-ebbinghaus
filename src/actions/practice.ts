
import actionCreatorFactory from 'typescript-fsa';

import { Alg } from '../store/Alg';

const actionCreator = actionCreatorFactory('PRACTICE');

export const practiceActions = {
  next: actionCreator<void>('NEXT'),
  reset: actionCreator<void>('RESET'),
  fail: actionCreator<void>('FAIL'),
  toPressing: actionCreator<void>('TO_PRESSING'),
  start: actionCreator<{alg: Alg, auf: '' | 'U' | 'U2' | "U'"}>('START'),
  stop: actionCreator<void>('STOP'),
  tick: actionCreator<number>('TICK'),
}