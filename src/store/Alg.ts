
import Cube from 'cubejs';

const mirrorMap: any = {
  U : "U'", "U'": "U", u : "u'", "u'": "u",
  D : "D'", "D'": "D", d : "d'", "d'": "d",
  E : "E'", "E'": "E",
  R : "L'", "L'": "R", r : "l'", "l'": "r",
  L : "R'", "R'": "L", l : "r'", "r'" : "l",
  R2 : "L2", r2 : "l2", 
  L2 : "R2", l2 : "r2",
  F : "F'", "F'" : "F", f : "f'", "f'" : "f",
  B : "B'", "B'" : "B", b : "b'", "b'" : "b",
  S : "S'", "S'" : "S"
}


export class Alg {

  static mirror(str: string): string {
    return str.split(' ').map(s => mirrorMap[s] ? mirrorMap[s] : s).join(' ');
  }

  constructor(readonly premove: string = '',
              readonly base: string = '',
              readonly auf: string = '',){}
  
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

  mirror(): Alg {
    return new Alg(Alg.mirror(this.premove), Alg.mirror(this.base), Alg.mirror(this.auf))
  }
  inverse(): Alg {
    return new Alg(Cube.inverse(this.auf), Cube.inverse(this.base), Cube.inverse(this.premove));
  }
}