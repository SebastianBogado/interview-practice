import { defaultSubgridSize } from './constants';

export function getRow(grid, rowIndex) {
  return grid[rowIndex];
}

export function getColumn(grid, columnIndex) {
  return grid.map(row => row[columnIndex]);
}

export function getTopLeftCellOfCurrentSubgrid(cell) {
  return {
    rowIndex: Math.floor(cell.rowIndex/defaultSubgridSize) * defaultSubgridSize,
    columnIndex: Math.floor(cell.columnIndex/defaultSubgridSize) * defaultSubgridSize,
  };
}

export function getSubgrid(grid, cell) {
  const {
    rowIndex: subgridGoesfromRowIndex,
    columnIndex: subgridGoesfromColumnIndex,
   } = getTopLeftCellOfCurrentSubgrid(cell);

  const subgridGoestoColumnIndex = subgridGoesfromColumnIndex + defaultSubgridSize;

  return [
    ...grid[subgridGoesfromRowIndex].slice(subgridGoesfromColumnIndex, subgridGoestoColumnIndex),
    ...grid[subgridGoesfromRowIndex+1].slice(subgridGoesfromColumnIndex, subgridGoestoColumnIndex),
    ...grid[subgridGoesfromRowIndex+2].slice(subgridGoesfromColumnIndex, subgridGoestoColumnIndex),
  ];
}

export function cellBelongsToSameSubgrid(cellA, cellB) {
  const {
    rowIndex: rowIndexOfSubgridA,
    columnIndex: columnIndexOfSubgridA,
   } = getTopLeftCellOfCurrentSubgrid(cellA);


  const {
    rowIndex: rowIndexOfSubgridB,
    columnIndex: columnIndexOfSubgridB,
   } = getTopLeftCellOfCurrentSubgrid(cellB);

   return rowIndexOfSubgridA === rowIndexOfSubgridB && columnIndexOfSubgridA === columnIndexOfSubgridB;
}