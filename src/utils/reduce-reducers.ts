import { Reducer, AnyAction } from 'redux';

export function reduceReducers<S>(...reducers: Reducer<S, AnyAction>[]): Reducer<S, AnyAction> {
  return (prevState: S | undefined, action: AnyAction) => {
    const state: S = typeof prevState === 'undefined' ? {} as S : prevState;
    return reducers.reduce((newState: S , reducer: Reducer<S, AnyAction>) => {
      return reducer(newState, action);
    }, state);
  }
}
