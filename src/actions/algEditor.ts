
import actionCreatorFactory from 'typescript-fsa';

import { Alg } from '../store/Alg';

const actionCreator = actionCreatorFactory('ALG_EDITOR');

export const algEditorActions = {
  updateBase: actionCreator<string>('UPDATE_ALG'),
  updatePremove: actionCreator<string>('UPDATE_PREMOVE'),
  updateAuf: actionCreator<string>('UPDATE_AUF'),
  saveNew: actionCreator<Alg>('SAVE_NEW'),
  save: actionCreator<{idx: number, alg: Alg}>('SAVE'),
  new: actionCreator<void>('NEW'),
  delete: actionCreator<number>('DELETE'),
  mirror: actionCreator<void>('MIRROR'),
  inverse: actionCreator<void>('INVERSE'),
  select: actionCreator<{idx: number, alg: Alg}>('SELECT')
}