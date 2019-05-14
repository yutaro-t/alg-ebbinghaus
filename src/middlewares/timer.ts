
import { practiceActions } from '../actions/practice';
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';

export interface TimerableStore {
  ui: {
    practice: {
      mode: 'wait' | 'press' | 'solve',
    }
  }
}

export const timerMiddleware: Middleware = 
  <S extends TimerableStore>({ getState, dispatch }: MiddlewareAPI<Dispatch, S>) => (next: Dispatch<AnyAction>) => (action: any): any => {
      if(action.type === practiceActions.start.type || 
          (action.type === practiceActions.tick.type && getState().ui.practice.mode === 'solve')){
            setTimeout(() => {
              dispatch(practiceActions.tick(performance.now()));
            }, 10 );
          }
      return next(action);
    };