import run from "aocrunner";
import * as lodash from "lodash";

const parseInput = (rawInput: string) => rawInput.split("\n");

const matchInDirection = (
  [posX, posY]: [number, number],
  [dirX, dirY]: [number, number],
  grid: string[],
  match: string,
) => {
  if (match === "") {
    return true;
  }

  if (
    posX + dirX < 0 ||
    posX + dirX >= grid[0].length ||
    posY + dirY < 0 ||
    posY + dirY >= grid.length
  ) {
    return false;
  }

  if (grid[posY + dirY][posX + dirX] !== match[0]) {
    return false;
  }

  return matchInDirection(
    [posX + dirX, posY + dirY],
    [dirX, dirY],
    grid,
    match.slice(1),
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let found = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "X") {
        const count =
          (matchInDirection([x, y], [1, 0], input, "MAS") ? 1 : 0) +
          (matchInDirection([x, y], [-1, 0], input, "MAS") ? 1 : 0) +
          (matchInDirection([x, y], [1, 1], input, "MAS") ? 1 : 0) +
          (matchInDirection([x, y], [-1, 1], input, "MAS") ? 1 : 0) +
          (matchInDirection([x, y], [1, -1], input, "MAS") ? 1 : 0) +
          (matchInDirection([x, y], [-1, -1], input, "MAS") ? 1 : 0) +
          (matchInDirection([x, y], [0, 1], input, "MAS") ? 1 : 0) +
          (matchInDirection([x, y], [0, -1], input, "MAS") ? 1 : 0);

        found += count;
      }
    }
  }

  return found;
};

const checkCell = ([x, y], [dx, dy], grid, match) => {
  return grid[y + dy][x + dx] === match;
};

const checkDiags = ([x, y]: [number, number], grid: string[]) => {
  const diag1 =
    (checkCell([x, y], [-1, -1], grid, "M") &&
      checkCell([x, y], [1, 1], grid, "S")) ||
    (checkCell([x, y], [-1, -1], grid, "S") &&
      checkCell([x, y], [1, 1], grid, "M"));

  const diag2 =
    (checkCell([x, y], [1, -1], grid, "M") &&
      checkCell([x, y], [-1, 1], grid, "S")) ||
    (checkCell([x, y], [1, -1], grid, "S") &&
      checkCell([x, y], [-1, 1], grid, "M"));

  return diag1 && diag2;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let found = 0;

  for (let y = 1; y < input.length - 1; y++) {
    for (let x = 1; x < input[y].length - 1; x++) {
      if (input[y][x] === "A") {
        if (checkDiags([x, y], input)) {
          found++;
        }
      }
    }
  }

  return found;
};

run({
  part1: {
    tests: [
      {
        input: `XMAS`,
        expected: 1,
      },
      {
        input: `SAMX`,
        expected: 1,
      },
      {
        input: `S\nA\nM\nX`,
        expected: 1,
      },
      {
        input: `X---\n-M--\n--A-\n---S`,
        expected: 1,
      },
      {
        input: `XMAS\n-M--\n--A-\n---S`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
