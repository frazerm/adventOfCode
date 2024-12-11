import run from "aocrunner";
import { sum } from "lodash";

const isString = (x: any): x is string => {
  return typeof x === "string";
};

const parseInput = (rawInput: string) => rawInput.split(" ");

const blink = (
  stone: string,
  nextMap: Record<string, string | [string, string]>,
  n,
): number => {
  if (n === 0) {
    return 1;
  }

  const cached = nextMap[stone];

  if (cached) {
    if (isString(cached)) {
      return blink(cached, nextMap, n - 1);
    }

    return sum([
      blink(cached[0], nextMap, n - 1),
      blink(cached[1], nextMap, n - 1),
    ]);
  }

  if (stone.length % 2 === 0) {
    const midpoint = stone.length / 2;
    const next1 = stone.slice(0, midpoint);
    const next2 = `${parseInt(stone.slice(midpoint))}`;
    nextMap[stone] = [next1, next2];
    return sum([blink(next1, nextMap, n - 1), blink(next2, nextMap, n - 1)]);
  }

  const next = `${parseInt(stone) * 2024}`;
  nextMap[stone] = next;

  return blink(next, nextMap, n - 1);
};

const part1 = (rawInput: string) => {
  const nextMap = { "0": "1" };
  const stones = parseInput(rawInput);

  return sum(stones.map((stone) => blink(stone, nextMap, 25)));
};

const part2 = (rawInput: string) => {
  const nextMap = { "0": "1" };
  const stones = parseInput(rawInput);

  return sum(stones.map((stone) => blink(stone, nextMap, 75)));
};

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
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
  onlyTests: true,
});
