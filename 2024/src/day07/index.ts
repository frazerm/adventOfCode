import run from "aocrunner";
import { keyBy, map, mapValues, some, sum } from "lodash-es";

type BinaryFn = (a: number, b: number) => number;

const OPS = {
  sum: (a: number, b: number) => a + b,
  mult: (a: number, b: number) => a * b,
  concat: (a: number, b: number) => parseInt(`${a}${b}`),
};

const parseInput = (rawInput: string): Record<string, number[]> => {
  const rows = rawInput.split("\n");

  const valuesMap = keyBy(rows, (row) => row.split(":")[0]);
  return mapValues(valuesMap, (value) =>
    value
      .trim()
      .split(" ")
      .slice(1)
      .map((s) => parseInt(s)),
  );
};

const hasSolutionRec = (
  goal: number,
  partial: number,
  components: number[],
  ops: BinaryFn[],
) => {
  if (components.length === 0) {
    return partial === goal;
  }

  const [next, ...rest] = components;

  return some(ops, (op) => hasSolutionRec(goal, op(partial, next), rest, ops));
};

const hasSolution =
  (ops: BinaryFn[]) => (components: number[], goal: string) => {
    return hasSolutionRec(
      parseInt(goal),
      components[0],
      components.slice(1),
      ops,
    );
  };

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const numSolutions = mapValues(input, hasSolution([OPS.sum, OPS.mult]));

  const total = map(numSolutions, (hasSolution: boolean, key) =>
    hasSolution ? parseInt(key) : 0,
  );

  return sum(total);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const numSolutions = mapValues(
    input,
    hasSolution([OPS.sum, OPS.mult, OPS.concat]),
  );

  const total = map(numSolutions, (hasSolution: boolean, key) =>
    hasSolution ? parseInt(key) : 0,
  );

  return sum(total);
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19`,
        expected: 190,
      },
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
