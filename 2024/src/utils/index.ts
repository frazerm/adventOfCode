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

export type Vec = [number, number];

export type Grid<T> = T[][];

export const DIRECTIONS = {
  U: [-1, 0] as Vec,
  R: [0, 1] as Vec,
  D: [1, 0] as Vec,
  L: [0, -1] as Vec,
  UL: [-1, -1] as Vec,
  UR: [-1, 1] as Vec,
  DL: [1, -1] as Vec,
  DR: [1, 1] as Vec,
} as const;

export const ADJACENT_4 = [
  DIRECTIONS.U,
  DIRECTIONS.R,
  DIRECTIONS.D,
  DIRECTIONS.L,
];
export const ADJACENT_8 = values(DIRECTIONS);

export const addCoords = curry(
  ([x1, y1]: Vec, [x2, y2]: Vec): Vec => [x1 + x2, y1 + y2],
);

export const rotate90 = ([x, y]: Vec): Vec => [y || 0, -x || 0];

export const rotate270 = ([x, y]: Vec): Vec => [-y || 0, x || 0];
