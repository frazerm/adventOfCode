import run from "aocrunner";
import { countBy, sum, values } from "lodash";

type Stone = string;
type Stones = Record<Stone, number>;
type Cache = Record<Stone, string[]>;

const parseInput = (rawInput: string): Stones => countBy(rawInput.split(" "));

const getNext = (stone: string, cache: Cache) => {
  const cached = cache[stone];
  if (cached) {
    return cached;
  }

  if (stone.length % 2 === 0) {
    const midpoint = stone.length / 2;
    const next = [
      stone.slice(0, midpoint),
      `${parseInt(stone.slice(midpoint))}`,
    ];
    cache[stone] = next;
    return next;
  }

  const next = [`${parseInt(stone) * 2024}`];
  cache[stone] = next;

  return next;
};

const blink = (stones: Stones, cache: Cache) => {
  const next = {};

  for (const [stone, count] of Object.entries(stones)) {
    const results = getNext(stone, cache);

    results.forEach((result: Stone) => {
      if (!next[result]) {
        next[result] = count;
      } else {
        next[result] += count;
      }
    });
  }

  return next;
};

const doBlinks = (stones: Stones, n: number) => {
  const cache = { "0": ["1"] };

  let next = stones;

  for (let i = 0; i < n; i++) {
    next = blink(next, cache);
  }

  return next;
};

const part1 = (rawInput: string) => {
  const stones = parseInput(rawInput);

  return sum(values(doBlinks(stones, 25)));
};

const part2 = (rawInput: string) => {
  const stones = parseInput(rawInput);

  return sum(values(doBlinks(stones, 75)));
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
  onlyTests: false,
});
