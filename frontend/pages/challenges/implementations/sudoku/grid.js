import { useState, useCallback, useEffect } from 'react';
import validate from './validations';
import { cellBelongsToSameSubgrid } from './grid-utils';

function useSudokuGrid(initialGrid) {
  const [grid, setGrid] = useState(initialGrid);

  useEffect(() => setGrid(initialGrid), [initialGrid]);

  const setValue = useCallback(({ rowIndex, columnIndex }, value) => {
    if (value !== '') validate(grid, { rowIndex, columnIndex }, value);

    setGrid((grid) => {
      return [
        ...grid.slice(0, rowIndex),
        [
            ...grid[rowIndex].slice(0, columnIndex),
            value,
            ...grid[rowIndex].slice(columnIndex + 1),
        ],
        ...grid.slice(rowIndex + 1),
      ];
    });
  }, [grid]);

  let areAllCellsCompleted = grid.every((col) => col.every((cell) => cell.trim()));

  return [
    grid,
    areAllCellsCompleted,
    setValue
  ];
}

function useFocusRelatedCells() {
  const [focusedCell, setFocusedCell] = useState({ rowIndex: null, columnIndex: null });

  const isRelatedToFocusedCell = useCallback((cell) => {
    return focusedCell.rowIndex !== null && focusedCell.columnIndex !== null && (
      focusedCell.rowIndex === cell.rowIndex ||
      focusedCell.columnIndex === cell.columnIndex ||
      cellBelongsToSameSubgrid(cell, focusedCell)
    )
  }, [focusedCell]);

  return [
    setFocusedCell, 
    () => setFocusedCell({ rowIndex: null, columnIndex: null }),
    isRelatedToFocusedCell,
  ];
}

export default function Grid({ initialGrid, setError, setSudokuFinished }) {
  const [grid, areAllCellsCompleted, setValue] = useSudokuGrid(initialGrid);

  useEffect(() => setSudokuFinished(areAllCellsCompleted), [areAllCellsCompleted]);
  
  const setValueOrError = useCallback((cell, value) => {
    try {
      setValue(cell, value);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }, [grid]);

  const [setFocusedCell, clearFocusedCell, isRelatedToFocusedCell] = useFocusRelatedCells();

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`}>
          {row.map((cellValue, columnIndex) => (
            <Column key={`column-${columnIndex}`}>
              <Cell 
                value={cellValue}
                setValue={(value) => setValueOrError({ rowIndex, columnIndex }, value)}
                setFocusedCell={() => setFocusedCell({ rowIndex, columnIndex })}
                clearFocusedCell={clearFocusedCell}
                isRelatedToFocusedCell={isRelatedToFocusedCell({ rowIndex, columnIndex })}
              />
            </Column>
          ))}
        </Row>
      ))}
    </div>
  );
}

function Row({ children }) {
  return (
    <div className="row">
      {children}
    </div>
  );
}

function Column({ children }) {
  return (
    <div className="column">
      {children}
    </div>
  );
}

function Cell({ value, setValue, setFocusedCell, clearFocusedCell, isRelatedToFocusedCell }) {
  return (
    <input 
      className={`cell${isRelatedToFocusedCell ? " related" : ""}`} 
      value={value} 
      onChange={(e) => setValue(e.target.value.trim())}
      onFocus={setFocusedCell}
      onBlur={clearFocusedCell}
    />
  );
}