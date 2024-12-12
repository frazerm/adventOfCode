import run from "aocrunner";
import {
  addCoords,
  ADJACENT_4,
  Vec,
  Grid,
  rotate90,
  rotate270,
} from "../utils/index.js";
import { keys } from "lodash";

const parseInput = (rawInput: string): Grid<string> =>
  rawInput.split("\n").map((line) => line.split(""));

const costArea = (
  grid: Grid<string>,
  seen: Grid<boolean>,
  pos: Vec,
  symbol: string,
) => {
  let area = 0;
  let edges = new Set<string>();
  const queue = [pos];

  while (queue.length) {
    const [x, y] = queue.shift();

    if (seen[y][x]) {
      continue;
    }

    seen[y][x] = true;
    area++;

    for (const dPos of ADJACENT_4) {
      const [nX, nY] = addCoords([x, y], dPos);

      if (nX < 0 || nX >= grid[0].length || nY < 0 || nY >= grid.length) {
        edges.add(`${nX},${nY},${dPos[0]},${dPos[1]}`);
        continue;
      }

      if (grid[nY][nX] === symbol) {
        queue.push([nX, nY]);
      } else {
        edges.add(`${nX},${nY},${dPos[0]},${dPos[1]}`);
      }
    }
  }

  return { area, edges };
};

const consumeInDirection = (
  startPos: Vec,
  [normX, normY]: Vec,
  dir: Vec,
  edges: Set<string>,
) => {
  let pos = addCoords(startPos, dir);

  while (true) {
    const newEdge = `${pos[0]},${pos[1]},${normX},${normY}`;

    if (!edges.has(newEdge)) {
      break;
    }

    edges.delete(newEdge);

    pos = addCoords(pos, dir);
  }
};

const costEdges = (edges: Set<string>) => {
  let edgeCount = 0;
  while (edges.size > 0) {
    edgeCount++;
    const [edge] = edges;
    edges.delete(edge);
    const [posX, posY, normX, normY] = edge.split(",").map(Number);

    consumeInDirection(
      [posX, posY],
      [normX, normY],
      rotate90([normX, normY]),
      edges,
    );
    consumeInDirection(
      [posX, posY],
      [normX, normY],
      rotate270([normX, normY]),
      edges,
    );
  }

  return edgeCount;
};

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  const seen: Grid<boolean> = grid.map((row) => row.map(() => false));

  let totalCost = 0;

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (seen[y][x]) {
        return;
      }

      const { area, edges } = costArea(grid, seen, [x, y], cell);
      totalCost += area * edges.size;
    });
  });

  return totalCost;
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  const seen: Grid<boolean> = grid.map((row) => row.map(() => false));

  let totalCost = 0;

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (seen[y][x]) {
        return;
      }

      const { area, edges } = costArea(grid, seen, [x, y], cell);
      totalCost += area * costEdges(edges);
    });
  });

  return totalCost;
};

run({
  part1: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 140,
      },
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 80,
      },
      {
        input: `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`,
        expected: 368,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
