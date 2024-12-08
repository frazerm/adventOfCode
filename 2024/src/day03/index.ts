import run from "aocrunner";
import * as lodash from "lodash";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const regex =
    /mul\(([0-9]|[1-9][0-9]|[1-9][0-9][0-9]),([0-9]|[1-9][0-9]|[1-9][0-9][0-9])\)/g;

  const matches = input.matchAll(regex);

  const products = Array.from(
    matches,
    ([_, num1, num2]) => parseInt(num1) * parseInt(num2),
  );

  return lodash.sum(products);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const regex =
    /(mul\(([0-9]|[1-9][0-9]|[1-9][0-9][0-9]),([0-9]|[1-9][0-9]|[1-9][0-9][0-9])\))|do\(\)|don\'t\(\)/g;

  const matches = input.matchAll(regex);

  let enabled = true;
  let sum = 0;

  for (const [op, _, num1, num2] of matches) {
    switch (op) {
      case "do()":
        enabled = true;
        break;
      case "don't()":
        enabled = false;
        break;
      default:
        sum += enabled ? parseInt(num1) * parseInt(num2) : 0;
    }
  }

  return sum;
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
