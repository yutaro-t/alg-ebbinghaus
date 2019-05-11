
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('ALGLIST_LIST');

export const listActions = {
  select: actionCreator<number>('SELECT'),
}