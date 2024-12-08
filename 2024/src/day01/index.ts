import run from "aocrunner";
import * as lodash from "lodash";

const parseInput = (rawInput: string) =>
  lodash.unzip(
    rawInput.split("\n").map((s) => s.split("   ").map((s) => parseInt(s))),
  );

const part1 = (rawInput: string) => {
  const columns = parseInput(rawInput);

  const columnsSorted = columns.map((c) => c.toSorted((a, b) => a - b));

  const sums = lodash.zipWith(...columnsSorted, (a: number, b: number) =>
    Math.abs(a - b),
  );

  const total = lodash.sum(sums);

  return total;
};

const part2 = (rawInput: string) => {
  const [main, dupes] = parseInput(rawInput);

  const counts = lodash.countBy(dupes);

  const scores = main.map((n) => n * (counts[n] ?? 0));

  return lodash.sum(scores);
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
