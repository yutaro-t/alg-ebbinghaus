
import { configureStore } from '../store';
import { practiceActions } from '../actions/practice';

import { Alg } from '../store/Alg';

describe('Practice panel', () => {
  it('should initialize', () => {
    let state = configureStore().getState().ui.practice;
    expect(state.alg.base).toBe('');
    expect(state.alg.auf).toBe('');
    expect(state.alg.premove).toBe('');
    expect(state.randomAuf).toBe('');
    expect(state.expectedCube.isSolved()).toBe(true);
    expect(state.mode).toBe('wait');
    expect(state.currentTime).toBe(0);
    expect(state.startTime).toBe(0);
  });

  it('should be pressed mode', () => {
    let store = configureStore();
    store.dispatch(practiceActions.toPressing());
    let state = store.getState().ui.practice;
    expect(state.mode).toBe('press');
  });

  it('should be solve mode', () => {
    let store = configureStore();
    store.dispatch(practiceActions.toPressing());
    store.dispatch(practiceActions.start({alg: new Alg('U', "R U R' U R U2 R'", "U'"), auf: 'U'}));
    let state = store.getState().ui.practice;
    expect(state.mode).toBe('solve');
    expect(state.randomAuf).toBe('U');
    expect(state.alg.toString()).toBe("U R U R' U R U2 R' U'")
    expect(state.startTime).toBeCloseTo(performance.now(), -2);
  });

  describe('After start', () => {
    let store;
    let start;
    beforeEach(() => {
      store = configureStore();
      store.dispatch(practiceActions.toPressing());
      start = performance.now();
      store.dispatch(practiceActions.start({alg: new Alg('U', "R U R' U R U2 R'", "U'"), auf: 'U'}));
    });

    it('should tick', done => {
      setTimeout(() => {
        let state = store.getState().ui.practice;
        expect(state.currentTime).toBeCloseTo(performance.now() - start, -2);
        done()
      }, 200);
    })

    it('should stop', done => {
      setTimeout(() => {
        let state = store.getState().ui.practice;
        let end = performance.now();
        store.dispatch(practiceActions.stop())
        setTimeout(() => {
          expect(state.currentTime).toBeCloseTo(end - start, -2);
          done()
        }, 200);
      }, 200);
    })
  })



})