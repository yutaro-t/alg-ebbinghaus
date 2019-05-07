
// Type definitions for cubejs 1.3.2
// Project: https://github.com/ldez/cubejs
// Definitions by: Yutaro Totsuka <https://github.com/yutaro-t>

declare module 'cubejs'{
  export class Cube {
    constructor();
    constructor(cube: Cube);

    static fromString(str: String): Cube;
    static random(): Cube;

    init(state: Cube): void;
    identity(): void;
    clone(): Cube;
    randomize(): void;
    isSolved(): boolean;
    move(algs: String | String[]): void;
    solve(maxDepth?: number): String;
    asString(): String;

    static initSolver(): void;
    static inverse(algorithm: string): string;

    
  }

  export default Cube;
}