import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const expand = (input: string) => {
  return input.split("").reduce((acc, c, i) => {
    const fillChar = i % 2 == 0 ? i / 2 : null;

    return [...acc, ...Array(parseInt(c)).fill(fillChar)];
  }, []);
};

const compact = (sequence: number[]) => {
  let gap = 0;
  while (gap < sequence.length) {
    const last = sequence[sequence.length - 1];

    if (last === null) {
      sequence.pop();
      continue;
    }

    for (; gap < sequence.length; gap++) {
      if (sequence[gap] === null) {
        sequence[gap] = last;
        sequence.pop();
        break;
      }
    }
  }

  return sequence;
};

const checksum = (sequence: number[]) => {
  const sum = sequence.reduce((acc, n, i) => acc + n * i, 0);

  return sum;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const expanded = expand(input);

  const compacted = compact(expanded);

  return checksum(compacted);
};

const expand2 = (input: string) => {
  return input.split("").reduce((acc, c, i) => {
    const index = i % 2 == 0 ? i / 2 : null;

    acc.push({ index, size: parseInt(c) });

    return acc;
  }, []);
};

const compact2 = (sequence: { index: number | null; size: number }[]) => {
  for (let i = sequence.length - 1; i >= 0; i--) {
    const item = sequence[i];

    if (item.index === null) {
      continue;
    }

    for (let j = 0; j < i; j++) {
      const slot = sequence[j];
      if (slot.index === null && slot.size >= item.size) {
        const remainder = slot.size - item.size;

        slot.index = item.index;
        slot.size = item.size;

        if (remainder > 0) {
          sequence.splice(j + 1, 0, { index: null, size: remainder });
          i++;
        }

        sequence[i].index = null;

        break;
      }
    }
  }

  return sequence;
};

const checksum2 = (sequence: { index: number | null; size: number }[]) => {
  let seqIndex = 0;
  const sum = sequence.reduce((acc, { index, size }, i) => {
    if (index === null) {
      seqIndex += size;
      return acc;
    }

    let sum = 0;

    for (let j = seqIndex; j < seqIndex + size; j++) {
      sum += index * j;
    }

    seqIndex += size;

    return acc + sum;
  }, 0);

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const expanded = expand2(input);

  const compacted = compact2(expanded);

  return checksum2(compacted);
};

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
