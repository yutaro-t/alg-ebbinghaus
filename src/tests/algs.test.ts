
import { configureStore } from '../store';

import { algsActions } from '../actions/algs';
import { Alg } from '../store/Alg';

describe('Algs', () => {
  it('should init', () => {
    const state = configureStore().getState().entities.algs;
    expect(state.list).toHaveLength(0);
  });

  it('should create', () => {
    const store = configureStore()
    store.dispatch(algsActions.create(new Alg('U', "R U R' U R U2 R'", "U'")));
    store.dispatch(algsActions.create(new Alg('U', "F' r U R' U' r' F R", "U'")));
    store.dispatch(algsActions.create(new Alg('U', "R U2 R2 U' R2 U' R2 U2 R", "U'")));
    const state = store.getState().entities.algs;
    expect(state.list).toHaveLength(3);
    expect(state.list[0].toString()).toBe("U R U R' U R U2 R' U'");
    expect(state.list[1].toString()).toBe("U F' r U R' U' r' F R U'");
    expect(state.list[2].toString()).toBe("U R U2 R2 U' R2 U' R2 U2 R U'");
  });

  describe('After add some creation', () => {
    let store: any;
    beforeEach(() => {
      store = configureStore();
      store.dispatch(algsActions.create(new Alg('U', "R U R' U R U2 R'", "U'")));
      store.dispatch(algsActions.create(new Alg('U', "F' r U R' U' r' F R", "U'")));
      store.dispatch(algsActions.create(new Alg('U', "R U2 R2 U' R2 U' R2 U2 R", "U'")));
    });

    it('should update', () => {
      store.dispatch(algsActions.update({idx: 1, alg: new Alg('', "R U2 R D R' U2 R D' R2", '')}));
      const state = store.getState().entities.algs;
      expect(state.list).toHaveLength(3);
      expect(state.list[0].toString()).toBe("U R U R' U R U2 R' U'");
      expect(state.list[1].toString()).toBe(" R U2 R D R' U2 R D' R2 ");
    })

    it('should remove', () => {
      store.dispatch(algsActions.remove(1));
      const state = store.getState().entities.algs;
      expect(state.list).toHaveLength(2);
      expect(state.list[0].toString()).toBe("U R U R' U R U2 R' U'");
      expect(state.list[1].toString()).toBe("U R U2 R2 U' R2 U' R2 U2 R U'");
    })

    it('should move', () => {
      store.dispatch(algsActions.move({from: 2, to: 1}));
      const state = store.getState().entities.algs;
      expect(state.list).toHaveLength(3);
      expect(state.list[0].toString()).toBe("U R U R' U R U2 R' U'");
      expect(state.list[2].toString()).toBe("U F' r U R' U' r' F R U'");
      expect(state.list[1].toString()).toBe("U R U2 R2 U' R2 U' R2 U2 R U'");
    })
  })

  


})