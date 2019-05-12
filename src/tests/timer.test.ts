
import { configureStore } from '../store';
import { timerActions } from '../actions/timer';

describe('Timer', () => {
  it('should return the initial state', () => {
    let state = configureStore().getState().timer;
    expect(state.isRunning).toBe(false);
    expect(state.currentTime).toBe(0);
    expect(state.startTime).toBe(-1);
  });

  describe('after initialized', () => {


    it('should start', () => {
      let store: ReturnType<typeof configureStore>= configureStore();
      store.dispatch(timerActions.start());
      let state = store.getState().timer;
      expect(state.isRunning).toBe(true);
      expect(state.startTime).not.toBe(-1);
    });

    it('should record time', done => {
      let store: ReturnType<typeof configureStore>= configureStore();
      store.dispatch(timerActions.start());
      let startTime = performance.now();
      setTimeout(() => {
        let state = store.getState().timer;
        let totalTime = performance.now() - startTime;
        expect(state.isRunning).toBe(true);
        expect(state.currentTime).toBeGreaterThan(totalTime-20)
        expect(state.currentTime).toBeLessThan(totalTime+20)
        done()
      }, 100)
    });

    it('should stop', done => {
      let store: ReturnType<typeof configureStore>= configureStore();
      store.dispatch(timerActions.start());
      let startTime = performance.now();
      setTimeout(() => {
        let totalTime = performance.now() - startTime;
        store.dispatch(timerActions.stop());
        setTimeout(() => {
          let state = store.getState().timer;
          expect(state.isRunning).toBe(false);
          expect(state.currentTime).toBeGreaterThan(totalTime-20)
          expect(state.currentTime).toBeLessThan(totalTime+20)
          done()
        }, 100)
      }, 100)
    });

    it('should reset when running', done => {
      let store: ReturnType<typeof configureStore>= configureStore();
      store.dispatch(timerActions.start());
      setTimeout(() => {
        store.dispatch(timerActions.reset());
        let state = store.getState().timer;
        expect(state.isRunning).toBe(false);
        expect(state.currentTime).toBe(0);
        done()
      }, 100)
    });

    it('should reset when not running', done => {
      let store: ReturnType<typeof configureStore>= configureStore();
      store.dispatch(timerActions.start());
      setTimeout(() => {
        store.dispatch(timerActions.stop());
        store.dispatch(timerActions.reset());
        let state = store.getState().timer;
        expect(state.isRunning).toBe(false);
        expect(state.currentTime).toBe(0);
        done()
      }, 100)
    });

    it('should start when toggled', done => {
      let store: ReturnType<typeof configureStore>= configureStore();
      store.dispatch(timerActions.toggle());
      let startTime = performance.now();
      setTimeout(() => {
        let state = store.getState().timer;
        let totalTime = performance.now() - startTime;
        expect(state.isRunning).toBe(true);
        expect(state.currentTime).toBeGreaterThan(totalTime-20)
        expect(state.currentTime).toBeLessThan(totalTime+20)
        done()
      }, 100)
    });

    it('should stop when toggled', done => {
      let store: ReturnType<typeof configureStore>= configureStore();
      store.dispatch(timerActions.toggle());
      let startTime = performance.now();
      setTimeout(() => {
        let totalTime = performance.now() - startTime;
        store.dispatch(timerActions.toggle());
        setTimeout(() => {
          let state = store.getState().timer;
          expect(state.isRunning).toBe(false);
          expect(state.currentTime).toBeGreaterThan(totalTime-20)
          expect(state.currentTime).toBeLessThan(totalTime+20)
          done()
        }, 100)
      }, 100)
    });

    it('should ignore 3rd toggle', done => {
      let store: ReturnType<typeof configureStore>= configureStore();
      store.dispatch(timerActions.toggle());
      let startTime = performance.now();
      setTimeout(() => {
        let totalTime = performance.now() - startTime;
        store.dispatch(timerActions.toggle());
        store.dispatch(timerActions.toggle());
        setTimeout(() => {
          let state = store.getState().timer;
          expect(state.isRunning).toBe(false);
          expect(state.currentTime).toBeGreaterThan(totalTime-20)
          expect(state.currentTime).toBeLessThan(totalTime+20)
          done()
        }, 100)
      }, 100)
    });
  });
});