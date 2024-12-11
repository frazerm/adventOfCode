/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

import { curry, values } from "lodash";

export type Coord = [number, number];

export type Grid<T> = T[][];

export const DIRECTIONS = {
  U: [-1, 0] as Coord,
  D: [1, 0] as Coord,
  L: [0, -1] as Coord,
  R: [0, 1] as Coord,
  UL: [-1, -1] as Coord,
  UR: [-1, 1] as Coord,
  DL: [1, -1] as Coord,
  DR: [1, 1] as Coord,
} as const;

export const ADJACENT_4 = [
  DIRECTIONS.U,
  DIRECTIONS.D,
  DIRECTIONS.L,
  DIRECTIONS.R,
];
export const ADJACENT_8 = values(DIRECTIONS);

export const addCoords = curry(
  ([x1, y1]: Coord, [x2, y2]: Coord): Coord => [x1 + x2, y1 + y2],
);
