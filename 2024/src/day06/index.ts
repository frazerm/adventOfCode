import run from "aocrunner";
import * as lodash from "lodash-es";

type Direction = "u" | "d" | "l" | "r";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(""));

const findGuard = (grid: string[][]): [number, number] => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "^") {
        return [x, y];
      }
    }
  }
};

const turnRight = (dir: Direction): Direction => {
  switch (dir) {
    case "u":
      return "r";
    case "r":
      return "d";
    case "d":
      return "l";
    case "l":
      return "u";
  }
};

const takeStep = (
  [x, y]: [number, number],
  dir: Direction,
): [number, number] => {
  switch (dir) {
    case "u":
      return [x, y - 1];
    case "r":
      return [x + 1, y];
    case "d":
      return [x, y + 1];
    case "l":
      return [x - 1, y];
  }
};

const getRoute = (grid: string[][], pos: [number, number], dir: Direction) => {
  const visited = new Set<string>();

  while (true) {
    visited.add(`${pos[0]},${pos[1]}`);

    const [_x, _y] = takeStep(pos, dir);

    if (_x < 0 || _y < 0 || _x >= grid[0].length || _y >= grid.length) {
      break;
    }

    if (grid[_y][_x] === "#") {
      dir = turnRight(dir);
    }

    pos = takeStep(pos, dir);
  }

  return visited;
};

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  let pos = findGuard(grid);
  let dir: Direction = "u";

  const visited = getRoute(grid, pos, dir);

  return visited.size;
};

const isLoop = (grid: string[][], pos: [number, number], dir: Direction) => {
  const visited = new Set<string>();

  while (true) {
    const [_x, _y] = takeStep(pos, dir);

    if (_x < 0 || _y < 0 || _x >= grid[0].length || _y >= grid.length) {
      return false;
    }

    if (grid[_y][_x] === "#") {
      dir = turnRight(dir);
    } else {
      const state = `${dir},${pos[0]},${pos[1]}`;
      if (visited.has(state)) {
        return true;
      }
      visited.add(`${dir},${pos[0]},${pos[1]}`);
      pos = takeStep(pos, dir);
    }
  }
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  let pos = findGuard(grid);
  let dir: Direction = "u";

  const visited = getRoute(grid, pos, dir);

  //remove starting pos as obstacle candidate
  visited.delete(pos.join(","));

  let count = 0;

  for (const cell of visited) {
    const modGrid = parseInput(rawInput);
    modGrid[cell.split(",")[1]][cell.split(",")[0]] = "#";

    if (isLoop(modGrid, pos, dir)) {
      count++;
    }
  }

  return count;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
