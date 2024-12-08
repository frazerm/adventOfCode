import run from "aocrunner";
import * as lodash from "lodash";

const parseInput = (rawInput: string) => {
  const [rules, orderings] = rawInput.split("\n\n");

  return [
    rules.split("\n").map((s) => s.split("|")),
    orderings.split("\n").map((s) => s.split(",")),
  ];
};

const buildAheadMap = (rules: string[][]) => {
  const aheadMap = new Map<string, Set<string>>();

  for (const rule of rules) {
    const [behind, ahead] = rule;
    if (!aheadMap.has(behind)) {
      aheadMap.set(behind, new Set());
    }
    aheadMap.get(behind).add(ahead);
  }

  return aheadMap;
};

const isValidOrder =
  (rules: Map<string, Set<string>>) => (ordering: string[]) => {
    const seen = new Set<string>();
    for (const item of ordering) {
      const mustBeAfter = rules.get(item);
      if (!!mustBeAfter && seen.intersection(mustBeAfter).size > 0) {
        return false;
      }
      seen.add(item);
    }

    return true;
  };

const getMiddle = (ordering: string[]) => {
  return ordering[Math.floor(ordering.length / 2)];
};

const part1 = (rawInput: string) => {
  const [rules, orderings] = parseInput(rawInput);

  const aheadMap = buildAheadMap(rules);

  const validOrderings = orderings.filter(isValidOrder(aheadMap));

  return lodash.sum(validOrderings.map((o) => parseInt(getMiddle(o))));
};

const getSort = (rules: Map<string, Set<string>>) => (a: string, b: string) => {
  const aMustComeBefore = rules.get(a);
  const bMustComeBefore = rules.get(b);

  let res = 0;

  if (aMustComeBefore && aMustComeBefore.has(b)) {
    res = -1;
  } else if (bMustComeBefore && bMustComeBefore.has(a)) {
    res = 1;
  } else {
    res = 0;
  }

  return res;
};

const part2 = (rawInput: string) => {
  const [rules, orderings] = parseInput(rawInput);

  const aheadMap = buildAheadMap(rules);

  const sortFn = getSort(aheadMap);

  const invalidOrderings = orderings.filter((o) => !isValidOrder(aheadMap)(o));

  const correctedOrderings = invalidOrderings.map((o) => o.toSorted(sortFn));

  return lodash.sum(correctedOrderings.map((o) => parseInt(getMiddle(o))));
};

const TEST_RULES = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13\n\n`;

run({
  part1: {
    tests: [
      {
        input: TEST_RULES + "75,47,61,53,29",
        expected: 61,
      },
      {
        input: TEST_RULES + "97,61,53,29,13",
        expected: 53,
      },
      {
        input: TEST_RULES + "75,29,13",
        expected: 29,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: TEST_RULES + "75,97,47,61,53",
        expected: 47,
      },
      {
        input: TEST_RULES + "61,13,29",
        expected: 29,
      },
      {
        input: TEST_RULES + "97,13,75,29,47",
        expected: 47,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
