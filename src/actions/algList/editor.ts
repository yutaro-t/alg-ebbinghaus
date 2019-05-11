
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('ALGLIST_EDITOR');

export const editorActions = {
  updateBase: actionCreator<string>('UPDATE_ALG'),
  updatePremove: actionCreator<string>('UPDATE_PREMOVE'),
  updateAuf: actionCreator<string>('UPDATE_AUF'),
  saveNew: actionCreator<void>('SAVE_NEW'),
  save: actionCreator<void>('SAVE'),
  new: actionCreator<void>('NEW'),
  delete: actionCreator<void>('DELETE'),
  mirror: actionCreator<void>('MIRROR'),
  inverse: actionCreator<void>('INVERSE'),

}