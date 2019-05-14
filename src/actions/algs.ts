

import actionCreatorFactory from 'typescript-fsa';
import { Alg } from '../store/Alg';

const actionCreator = actionCreatorFactory('ALGS');

export const algsActions = {
  create: actionCreator<Alg>('CREATE'),
  update: actionCreator<{idx: number, alg: Alg}>('UPDATE'),
  remove: actionCreator<number>('REMOVE'),
  move: actionCreator<{from: number, to: number}>('MOVE')
}