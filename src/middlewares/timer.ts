
import { timerActions } from '../actions/timer';
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';

export interface TimerableStore {
  timer: {
    isRunning: boolean,
    currentTime: number,
  }
}

var timeout: any;

export const timerMiddleware: Middleware = 
  <S extends TimerableStore>({ getState, dispatch }: MiddlewareAPI<Dispatch, S>) => (next: Dispatch<AnyAction>) => (action: any): any => {
      if(action.type === timerActions.start.type || 
          (action.type === timerActions.tick.type && getState().timer.isRunning) || 
          (action.type === timerActions.toggle.type && !getState().timer.isRunning && getState().timer.currentTime===0)) {
        timeout = setTimeout(()=> {
          dispatch(timerActions.tick());
        }, 10)
      }
      
      if(action.type === timerActions.stop.type ||
        (action.type === timerActions.toggle.type && getState().timer.isRunning)) {
          clearTimeout(timeout);
        }
      return next(action);
    };