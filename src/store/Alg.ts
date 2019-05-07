
import Cube from 'cubejs';

export class Alg {

  constructor(readonly premove: string = '',
              readonly base: string = '',
              readonly auf: string = '') {}
  
  toString(): string {
    return this.premove + ' ' + this.base + ' ' + this.auf;
  }

  isValid(): boolean {
    try {
      const cube: Cube = new Cube();
      cube.move(this.toString());
      return true;
    } catch {
      return false;
    }
  }

  getCube(): Cube {
    const cube = new Cube();
    cube.move(Cube.inverse(this.toString()));
    return cube;
  }

  withPremove(premove: string): Alg {
    return new Alg(premove, this.base, this.auf);
  }

  withBase(base: string): Alg {
    return new Alg(this.premove, base, this.auf);
  }

  withAuf(auf: string): Alg {
    return new Alg(this.premove, this.base, auf);
  }
}