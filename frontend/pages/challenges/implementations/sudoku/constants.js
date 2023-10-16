export const defaultSubgridSize = 3;
export const defaultGridSize = defaultSubgridSize * defaultSubgridSize;
const initializeGrid = (gridSize = defaultGridSize) => Array(gridSize).fill(Array(gridSize).fill(""));
export const emptyGrid = initializeGrid();
export const sudoku1 = [
  [" ", " ", " ",/**/ "7", "2", "3",/**/ "4", "6", " "],
  [" ", "8", " ",/**/ "5", "4", "9",/**/ "1", "7", "3"],
  [" ", " ", "7",/**/ "6", " ", "8",/**/ "9", "2", "5"],
  /* ----------------------------------------------- */
  ["6", "7", "2",/**/ "9", " ", " ",/**/ "5", "8", "1"],
  ["8", "5", "4",/**/ " ", "6", "1",/**/ " ", " ", " "],
  [" ", "9",  "",/**/ " ", " ", "7",/**/ "2", "4", " "],
  /* ----------------------------------------------- */
  [" ", " ", " ",/**/ " ", "9", " ",/**/ "8", "3", " "],
  ["5", " ", "8",/**/ "3", " ", " ",/**/ " ", " ", " "],
  ["3", " ", " ",/**/ " ", " ", "6",/**/ " ", " ", " "],
];

export const sudoku2 = [
  [" ", " ", " ",/**/ " ", " ", " ",/**/ " ", " ", " "],
  [" ", " ", "8",/**/ " ", " ", " ",/**/ " ", " ", "4"],
  ["4", "2", "9",/**/ "1", " ", " ",/**/ " ", "6", " "],
  /* ----------------------------------------------- */
  [" ", " ", " ",/**/ "3", "7", "6",/**/ "9", "5", " "],
  [" ", "7", "5",/**/ " ", " ", " ",/**/ "1", "3", "6"],
  ["9", " ", " ",/**/ "5", "2", " ",/**/ " ", "7", "8"],
  /* ----------------------------------------------- */
  [" ", " ", " ",/**/ " ", " ", "9",/**/ "8", " ", "7"],
  [" ", "9", " ",/**/ "6", "1", "8",/**/ "3", "4", "5"],
  ["3", " ", " ",/**/ "7", "5", " ",/**/ "6", "9", "1"],
];

export const sudoku3 = [
  [" ", " ", " ",/**/ " ", "7", "9",/**/ " ", " ", " "],
  [" ", "6", " ",/**/ " ", " ", " ",/**/ "2", " ", " "],
  ["3", " ", " ",/**/ " ", " ", " ",/**/ " ", " ", " "],
  /* ----------------------------------------------- */
  ["5", " ", "9",/**/ " ", " ", " ",/**/ " ", " ", "4"],
  [" ", " ", " ",/**/ "2", " ", " ",/**/ "8", " ", " "],
  [" ", "7", " ",/**/ " ", "6", " ",/**/ " ", " ", " "],
  /* ----------------------------------------------- */
  [" ", " ", " ",/**/ " ", " ", " ",/**/ " ", "5", "9"],
  ["8", " ", " ",/**/ "6", " ", " ",/**/ " ", " ", " "],
  [" ", " ", " ",/**/ " ", " ", " ",/**/ " ", "7", " "],
];