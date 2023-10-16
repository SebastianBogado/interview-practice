import { getRow, getColumn, getSubgrid } from './grid-utils';

function validateValue(value) {
  if (!Number.isInteger(parseInt(value)) || value < 1 || value > 9) throw new Error("Only numbers from 1 to 9 are accepted");
}

function isValuePresentIn(value, list) {
  return list.includes(value);
}

function validateValueInRow(grid, rowIndex, value) {
  const row = getRow(grid, rowIndex);
  if (isValuePresentIn(value, row))  throw new Error(`Number ${value} is already present in row`);

}

function validateValueInColumn(grid, columnIndex, value) {
  const column = getColumn(grid, columnIndex);
  if (isValuePresentIn(value, column))  throw new Error(`Number ${value} is already present in column`);
}

function validateValueInSubgrid(grid, cell, value) {
  const subgrid = getSubgrid(grid, cell);
  if (isValuePresentIn(value, subgrid))  throw new Error(`Number ${value} is already present in subgrid`);
}

export default function validate(grid, cell, value) {
  validateValue(value);
  validateValueInRow(grid, cell.rowIndex, value);
  validateValueInColumn(grid, cell.columnIndex, value);
  validateValueInSubgrid(grid, cell, value);
}