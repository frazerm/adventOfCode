import run from "aocrunner";
import lodash from 'lodash';

const parseInput = (rawInput: string) => rawInput.split('\n').map(s => s.split(' ').map(s => parseInt(s)));

const makeDeltas = (seq: number[]) => {
  const [deltas] = seq.reduce(([acc, prev], next) => {
    if (prev === undefined) {
      return [acc, next]
    }

    return [[...acc, prev - next], next]

  }, [[], undefined]);

  return deltas;
}

const safeConditions = (deltas) => {
  return lodash.every(deltas, n => Math.abs(n) > 0 && Math.abs(n) <= 3) && (
    lodash.every(deltas, n => n > 0) || lodash.every(deltas, n => n < 0)
  )
}

const isSafe = (seq: number[]) => {
  const deltas = makeDeltas(seq);

  return safeConditions(deltas);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return lodash.sumBy(input.map(isSafe), b => +b);
};

const isPrettySafe = (seq: number[]) => {
  const candidates = lodash.range(seq.length).map((n) => {
    const s = [...seq];
    s.splice(n, 1);
    return s
  });

  return lodash.some(lodash.map(candidates, isSafe));
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const c = lodash.sumBy(input.map(isPrettySafe), b => +b);

  return c;
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
      {input: `7 6 4 2 1`, expected: 1},
      {input: `1 2 7 8 9`, expected: 0},
      {input: `9 7 6 2 1`, expected: 0},
      {input: `1 3 2 4 5`, expected: 1},
      {input: `8 6 4 4 1`, expected: 1},
      {input: `1 3 6 7 9`, expected: 1},
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
