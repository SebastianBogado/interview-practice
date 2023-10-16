import { useState } from 'react';
import Grid from './grid';
import { Message, ErrorMessage, WinMessage } from './messages';
import { emptyGrid, sudoku1, sudoku2, sudoku3 } from './constants';

export default function SudokuChallengeImplementation() {
  const [error, setError] = useState('');
  const [sudokuFinished, setSudokuFinished] = useState(false);
  const [initialGrid, setInitialGrid] = useState(emptyGrid);

  return (
    <div id="sudoku">
      <Grid initialGrid={initialGrid} setError={setError} setSudokuFinished={setSudokuFinished} />
      <Message>
        <ErrorMessage error={error} />
        {!error && sudokuFinished && <WinMessage />}
      </Message>
      <button onClick={() => setInitialGrid([...emptyGrid])}>Clear</button>
      <button onClick={() => setInitialGrid([...sudoku1])}>Sudoku #1 (easy)</button>
      <button onClick={() => setInitialGrid([...sudoku2])}>Sudoku #2 (medium)</button>
      <button onClick={() => setInitialGrid([...sudoku3])}>Sudoku #3 (hard)</button>
    </div>
  );
}
