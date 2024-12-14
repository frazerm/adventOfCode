import run from "aocrunner";
import { Vec } from "../utils/index.js";
import { sum } from "lodash";

const regex = /X.(\d+), Y.(\d+)/;

const parseCoord = (rawCoord: string): Vec => {
  const [, x, y] = rawCoord.match(regex);

  return [Number(x), Number(y)];
};

const parseInput = (rawInput: string) => {
  const sections = rawInput.split("\n\n");

  return sections.map((section) => {
    const [a, b, prize] = section.split("\n");

    return {
      a: parseCoord(a),
      b: parseCoord(b),
      target: parseCoord(prize),
    };
  });
};

const solve = (a: Vec, b: Vec, prize) => {
  const [a1, a2] = a;
  const [b1, b2] = b;
  const [c1, c2] = prize;

  const multX = c1 * b2 - b1 * c2;
  const multY = a1 * c2 - c1 * a2;
  const div = a1 * b2 - b1 * a2;

  return [multX / div, multY / div];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map(({ a, b, target }) => solve(a, b, target))
    .filter(([x, y]) => x % 1 === 0 && y % 1 === 0)
    .reduce((acc, [x, y]) => acc + 3 * x + y, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map(({ a, b, target }) =>
      solve(a, b, [target[0] + 10000000000000, target[1] + 10000000000000]),
    )
    .filter(([x, y]) => x % 1 === 0 && y % 1 === 0)
    .reduce((acc, [x, y]) => acc + 3 * x + y, 0);
};

run({
  part1: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400`,
        expected: 280,
      },
      {
        input: `Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176`,
        expected: 0,
      },
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 480,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=10000000008400, Y=10000000005400`,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
