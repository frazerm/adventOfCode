import run from "aocrunner";
import { flatMap, sum } from "lodash";
import { Coord, Grid } from "../utils";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split("").map(Number));

const isInBounds = (grid: Grid<number>, [posX, posY]: Coord) => {
  return posX >= 0 && posY >= 0 && posY < grid.length && posX < grid[0].length;
};

const getAdjacent = ([x, y]: Coord): Coord[] => {
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
};

const countTrails = (grid: Grid<number>, pos: Coord, height: number) => {
  if (!isInBounds(grid, pos)) {
    return [];
  }

  if (grid[pos[1]][pos[0]] !== height) {
    return [];
  }

  if (height === 9) {
    return [pos];
  }

  return flatMap(getAdjacent(pos), (pos) => countTrails(grid, pos, height + 1));
};

const scoreTrailhead = (grid: Grid<number>, pos: Coord) => {
  const trails = countTrails(grid, pos, 0);
  return new Set(trails.map((trail) => trail.join(","))).size;
};

const rateTrailhead = (grid: Grid<number>, pos: Coord) => {
  const trails = countTrails(grid, pos, 0);
  return trails.length;
};

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  const counts = sum(
    grid.map((row, y) => sum(row.map((_, x) => scoreTrailhead(grid, [x, y])))),
  );

  return counts;
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  const counts = sum(
    grid.map((row, y) => sum(row.map((_, x) => rateTrailhead(grid, [x, y])))),
  );

  return counts;
};

run({
  part1: {
    tests: [
      {
        input: `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`,
        expected: 4,
      },
      {
        input: `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`,
        expected: 3,
      },
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`,
        expected: 13,
      },
      {
        input: `012345
123456
234567
345678
4.6789
56789.`,
        expected: 227,
      },
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
