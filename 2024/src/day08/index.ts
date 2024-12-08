import run from "aocrunner";
import { flatMap, groupBy, mapValues } from "lodash";

const parseInput = (rawInput: string) => rawInput.split("\n");

type Antenna = {
  char: string;
  x: number;
  y: number;
};

const dedupeLocations = (locations: [number, number][]) => [
  ...new Map(locations.map((l) => [JSON.stringify(l), l])).values(),
];

const findAntennas = (input: string[]) => {
  const antennas = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const char = input[y][x];
      if (char !== ".") {
        antennas.push({ char, x, y });
      }
    }
  }

  return antennas;
};

const findAntinodes = (antennas: Antenna[]): [number, number][] => {
  const antiNodes = [];

  antennas.forEach((antenna1, i) => {
    antennas.forEach((antenna2, j) => {
      if (i === j) {
        return;
      }

      const dx = antenna2.x - antenna1.x;
      const dy = antenna2.y - antenna1.y;

      antiNodes.push([antenna1.x - dx, antenna1.y - dy]);
      antiNodes.push([antenna2.x + dx, antenna2.y + dy]);
    });
  });

  return antiNodes;
};

const findResonantAntinodes =
  (maxX: number, maxY: number) => (antennas: Antenna[]) => {
    const antiNodes = [];

    antennas.forEach((antenna1, i) => {
      antennas.forEach((antenna2, j) => {
        if (i === j) {
          return;
        }

        const dx = antenna2.x - antenna1.x;
        const dy = antenna2.y - antenna1.y;

        let x = antenna1.x;
        let y = antenna1.y;

        while (x >= 0 && x < maxX && y >= 0 && y < maxY) {
          antiNodes.push([x, y]);
          x -= dx;
          y -= dy;
        }

        x = antenna2.x;
        y = antenna2.y;

        while (x >= 0 && x < maxX && y >= 0 && y < maxY) {
          antiNodes.push([x, y]);
          x += dx;
          y += dy;
        }
      });
    });

    return antiNodes;
  };

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const antennas = findAntennas(input);

  const grouped = groupBy(antennas, "char");

  const antiNodes = dedupeLocations(flatMap(mapValues(grouped, findAntinodes)));

  const maxX = input[0].length;
  const maxY = input.length;

  return antiNodes.filter(([x, y]) => x >= 0 && x < maxX && y >= 0 && y < maxY)
    .length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const maxX = input[0].length;
  const maxY = input.length;

  const antennas = findAntennas(input);

  const grouped = groupBy(antennas, "char");

  const antiNodes = dedupeLocations(
    flatMap(mapValues(grouped, findResonantAntinodes(maxX, maxY))),
  );

  return antiNodes.filter(([x, y]) => x >= 0 && x < maxX && y >= 0 && y < maxY)
    .length;
};

run({
  part1: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
