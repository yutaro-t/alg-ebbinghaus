
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('ALGLIST_EDITOR');

export const editorActions = {
  updateBase: actionCreator<string>('UPDATE_ALG'),
  updatePremove: actionCreator<string>('UPDATE_PREMOVE'),
  updateAuf: actionCreator<string>('UPDATE_AUF'),
  saveAlg: actionCreator<void>('SAVE_ALG'),
}