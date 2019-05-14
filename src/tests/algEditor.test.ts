
import { configureStore } from '../store';
import { algEditorActions } from '../actions/algEditor';
import { algsActions } from '../actions/algs';

import { Alg } from '../store/Alg';

describe('Algorithm editor', () => {
  let store;
  it('should initialize', () => {
    let state = configureStore().getState().ui.algEditor;
    expect(state.alg.base).toBe('');
    expect(state.alg.auf).toBe('');
    expect(state.alg.premove).toBe('');
    expect(state.validAlg.base).toBe('');
    expect(state.validAlg.auf).toBe('');
    expect(state.validAlg.premove).toBe('');
    expect(state.idx).toBe(-1);
  });

  it('should edit base', () => {
    let store = configureStore();
    store.dispatch(algEditorActions.updateBase('U R'));
    expect(store.getState().ui.algEditor.alg.base).toBe('U R');
    expect(store.getState().ui.algEditor.validAlg.base).toBe('U R');
    store.dispatch(algEditorActions.updateBase('U R F2 R'));
    expect(store.getState().ui.algEditor.alg.base).toBe('U R F2 R');
    expect(store.getState().ui.algEditor.validAlg.base).toBe('U R F2 R');
    store.dispatch(algEditorActions.updateBase(''));
    expect(store.getState().ui.algEditor.alg.base).toBe('');
    expect(store.getState().ui.algEditor.validAlg.base).toBe('');
  });

  it('should edit premove', () => {
    let store = configureStore();
    store.dispatch(algEditorActions.updatePremove('U'));
    expect(store.getState().ui.algEditor.alg.premove).toBe('U');
    expect(store.getState().ui.algEditor.validAlg.premove).toBe('U');
    store.dispatch(algEditorActions.updatePremove('U2'));
    expect(store.getState().ui.algEditor.alg.premove).toBe('U2');
    expect(store.getState().ui.algEditor.validAlg.premove).toBe('U2');
    store.dispatch(algEditorActions.updatePremove(''));
    expect(store.getState().ui.algEditor.alg.premove).toBe('');
    expect(store.getState().ui.algEditor.validAlg.premove).toBe('');
  });

  it('should edit auf', () => {
    let store = configureStore();
    store.dispatch(algEditorActions.updateAuf('U'));
    expect(store.getState().ui.algEditor.alg.auf).toBe('U');
    expect(store.getState().ui.algEditor.validAlg.auf).toBe('U');
    store.dispatch(algEditorActions.updateAuf('U2'));
    expect(store.getState().ui.algEditor.alg.auf).toBe('U2');
    expect(store.getState().ui.algEditor.validAlg.auf).toBe('U2');
    store.dispatch(algEditorActions.updateAuf(''));
    expect(store.getState().ui.algEditor.alg.auf).toBe('');
    expect(store.getState().ui.algEditor.validAlg.auf).toBe('');
  });

  describe('after input alg', () => {
    beforeEach(() => {
      store = configureStore();
      store.dispatch(algEditorActions.updatePremove("U"));
      store.dispatch(algEditorActions.updateBase("R U R' U R U2 R'"));
      store.dispatch(algEditorActions.updateAuf("U'"));
    });

    it('should not update invalid alg', () => {
      store.dispatch(algEditorActions.updatePremove("invalid"));
      expect(store.getState().ui.algEditor.alg.premove).toBe('invalid');
      expect(store.getState().ui.algEditor.validAlg.premove).toBe('U');
      store.dispatch(algEditorActions.updatePremove("U2"));
      expect(store.getState().ui.algEditor.alg.premove).toBe('U2');
      expect(store.getState().ui.algEditor.validAlg.premove).toBe('U2');

      store.dispatch(algEditorActions.updateBase("invalid"));
      expect(store.getState().ui.algEditor.alg.base).toBe('invalid');
      expect(store.getState().ui.algEditor.validAlg.base).toBe("R U R' U R U2 R'");
      store.dispatch(algEditorActions.updateBase("R U R' U"));
      expect(store.getState().ui.algEditor.alg.base).toBe("R U R' U");
      expect(store.getState().ui.algEditor.validAlg.base).toBe("R U R' U");

      store.dispatch(algEditorActions.updateAuf("invalid"));
      expect(store.getState().ui.algEditor.alg.auf).toBe('invalid');
      expect(store.getState().ui.algEditor.validAlg.auf).toBe("U'");
      store.dispatch(algEditorActions.updateAuf("U2"));
      expect(store.getState().ui.algEditor.alg.auf).toBe('U2');
      expect(store.getState().ui.algEditor.validAlg.auf).toBe('U2');
    });

    it('should mirror', () => {
      store.dispatch(algEditorActions.mirror());
      expect(store.getState().ui.algEditor.alg.premove).toBe("U'");
      expect(store.getState().ui.algEditor.validAlg.premove).toBe("U'");
      expect(store.getState().ui.algEditor.alg.base).toBe("L' U' L U' L' U2 L");
      expect(store.getState().ui.algEditor.validAlg.base).toBe("L' U' L U' L' U2 L");
      expect(store.getState().ui.algEditor.alg.auf).toBe("U");
      expect(store.getState().ui.algEditor.validAlg.auf).toBe("U");
    })

    it('should mirror valid alg', () => {
      store.dispatch(algEditorActions.updatePremove("invalid"));
      store.dispatch(algEditorActions.updateBase("invalid"));
      store.dispatch(algEditorActions.updateAuf("invalid"));
      store.dispatch(algEditorActions.mirror());
      expect(store.getState().ui.algEditor.alg.premove).toBe("U'");
      expect(store.getState().ui.algEditor.validAlg.premove).toBe("U'");
      expect(store.getState().ui.algEditor.alg.base).toBe("L' U' L U' L' U2 L");
      expect(store.getState().ui.algEditor.validAlg.base).toBe("L' U' L U' L' U2 L");
      expect(store.getState().ui.algEditor.alg.auf).toBe("U");
      expect(store.getState().ui.algEditor.validAlg.auf).toBe("U");
    })

    it('should inverse', () => {
      store.dispatch(algEditorActions.inverse());
      expect(store.getState().ui.algEditor.alg.premove).toBe("U");
      expect(store.getState().ui.algEditor.validAlg.premove).toBe("U");
      expect(store.getState().ui.algEditor.alg.base).toBe("R U2 R' U' R U' R'");
      expect(store.getState().ui.algEditor.validAlg.base).toBe("R U2 R' U' R U' R'");
      expect(store.getState().ui.algEditor.alg.auf).toBe("U'");
      expect(store.getState().ui.algEditor.validAlg.auf).toBe("U'");
    })

    it('should inverse valid alg', () => {
      store.dispatch(algEditorActions.updatePremove("invalid"));
      store.dispatch(algEditorActions.updateBase("invalid"));
      store.dispatch(algEditorActions.updateAuf("invalid"));
      store.dispatch(algEditorActions.inverse());
      expect(store.getState().ui.algEditor.alg.premove).toBe("U");
      expect(store.getState().ui.algEditor.validAlg.premove).toBe("U");
      expect(store.getState().ui.algEditor.alg.base).toBe("R U2 R' U' R U' R'");
      expect(store.getState().ui.algEditor.validAlg.base).toBe("R U2 R' U' R U' R'");
      expect(store.getState().ui.algEditor.alg.auf).toBe("U'");
      expect(store.getState().ui.algEditor.validAlg.auf).toBe("U'");
    })

    it('should reset on new', () => {
      store.dispatch(algEditorActions.new());
      let state = store.getState().ui.algEditor;
      expect(state.alg.base).toBe('');
      expect(state.alg.auf).toBe('');
      expect(state.alg.premove).toBe('');
      expect(state.validAlg.base).toBe('');
      expect(state.validAlg.auf).toBe('');
      expect(state.validAlg.premove).toBe('');
      expect(state.idx).toBe(-1);
    })

    it('should reset on saveNew', () => {
      store.dispatch(algEditorActions.saveNew(new Alg()));
      let state = store.getState().ui.algEditor;
      expect(state.alg.base).toBe('');
      expect(state.alg.auf).toBe('');
      expect(state.alg.premove).toBe('');
      expect(state.validAlg.base).toBe('');
      expect(state.validAlg.auf).toBe('');
      expect(state.validAlg.premove).toBe('');
      expect(state.idx).toBe(-1);
    })
    it('should reset on save', () => {
      store.dispatch(algEditorActions.save({idx: 0, alg: new Alg()}));
      let state = store.getState().ui.algEditor;
      expect(state.alg.base).toBe('');
      expect(state.alg.auf).toBe('');
      expect(state.alg.premove).toBe('');
      expect(state.validAlg.base).toBe('');
      expect(state.validAlg.auf).toBe('');
      expect(state.validAlg.premove).toBe('');
      expect(state.idx).toBe(-1);
    })
    it('should reset on delete', () => {
      store.dispatch(algEditorActions.delete(0));
      let state = store.getState().ui.algEditor;
      expect(state.alg.base).toBe('');
      expect(state.alg.auf).toBe('');
      expect(state.alg.premove).toBe('');
      expect(state.validAlg.base).toBe('');
      expect(state.validAlg.auf).toBe('');
      expect(state.validAlg.premove).toBe('');
      expect(state.idx).toBe(-1);
    })
  })

  describe('algs integration', () => {
    beforeEach(() => {
      store = configureStore();
      store.dispatch(algsActions.create(new Alg('U', "R U R' U R U2 R'", "U'")));
      store.dispatch(algsActions.create(new Alg('U', "F' r U R' U' r' F R", "U'")));
      store.dispatch(algsActions.create(new Alg('U', "R U2 R2 U' R2 U' R2 U2 R", "U'")));
    });

    it('should select', () => {
      store.dispatch(algEditorActions.select({idx: 1, alg: store.getState().entities.algs.list[1]}));
      expect(store.getState().ui.algEditor.alg.premove).toBe("U");
      expect(store.getState().ui.algEditor.validAlg.premove).toBe("U");
      expect(store.getState().ui.algEditor.alg.base).toBe("F' r U R' U' r' F R");
      expect(store.getState().ui.algEditor.validAlg.base).toBe("F' r U R' U' r' F R");
      expect(store.getState().ui.algEditor.alg.auf).toBe("U'");
      expect(store.getState().ui.algEditor.validAlg.auf).toBe("U'");
    });

    it('should save new', () => {
      store.dispatch(algEditorActions.updatePremove("U"));
      store.dispatch(algEditorActions.updateBase("F D"));
      store.dispatch(algEditorActions.updateAuf("U'"));
      store.dispatch(algEditorActions.saveNew(store.getState().ui.algEditor.validAlg));
      expect(store.getState().entities.algs.list).toHaveLength(4);
      expect(store.getState().entities.algs.list[3].toString()).toBe("U F D U'");
    })

    it('should save new when selected', () => {
      store.dispatch(algEditorActions.select({idx: 1, alg: store.getState().entities.algs.list[1]}));
      store.dispatch(algEditorActions.saveNew(store.getState().ui.algEditor.validAlg));
      expect(store.getState().entities.algs.list).toHaveLength(4);
      expect(store.getState().entities.algs.list[3].toString()).toBe("U F' r U R' U' r' F R U'");
    })

    it('should update selected', () => {
      store.dispatch(algEditorActions.select({idx: 1, alg: store.getState().entities.algs.list[1]}));
      store.dispatch(algEditorActions.updateBase("F D"));
      store.dispatch(algEditorActions.save({idx: 1, alg: store.getState().ui.algEditor.validAlg}));
      expect(store.getState().entities.algs.list).toHaveLength(3);
      expect(store.getState().entities.algs.list[1].toString()).toBe("U F D U'");
    })

    it('should delete selected', () => {
      store.dispatch(algEditorActions.select(1));
      store.dispatch(algEditorActions.delete(1));
      expect(store.getState().entities.algs.list).toHaveLength(2);
    })
  })
})