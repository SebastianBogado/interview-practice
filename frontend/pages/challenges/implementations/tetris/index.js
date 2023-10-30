import { useState, useCallback } from 'react';
import useInterval from '../hooks/useInterval';

const status = {
  MAIN_MENU: 'MAIN_MENU',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  WIN_SCREEN: 'WIN_SCREEN',
  GAME_OVER: 'GAME_OVER',
  HISCORES: 'HISCORES',
};

const level = {
  id: 1,
  tick: 200,
  objective: 20000,
};


const pieceShapes = {
  SQUARE: [
    { x: 0, y: 0}, { x: 1, y: 0},
    { x: 0, y: 1}, { x: 1, y: 1},
  ],
  DOT: [
    { x: 0, y: 0},
  ],
  LINE: [
    { x: 0, y: 0},
    { x: 0, y: 1},
    { x: 0, y: 2},
    { x: 0, y: 3},
  ],
}
const pieceShapesNames = Object.keys(pieceShapes);
const colors = ['red', 'green', 'yellow', 'blue'];

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createRandomPiece() {
  return {
    shape: pieceShapes[getRandom(pieceShapesNames)],
    color: getRandom(colors),
  }
}

function attemptToMovePiece(piece) {
  return {
    ...piece,
    position: {
      x: piece.position.x,
      y: piece.position.y - 1,
    },
  };
}

const directions = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
};

function getNewPositionForPiece(piece, direction) {
  if (direction === directions.LEFT) {
    return {
      x: piece.position.x - 1,
      y: piece.position.y,
    };
  }
  if (direction === directions.RIGHT) {
    return {
      x: piece.position.x + 1,
      y: piece.position.y,
    };
  }
  if (direction === directions.DOWN) {
    return {
      x: piece.position.x,
      y: piece.position.y - 1,
    };
  }
}

function pieceHasReachedTheBottom(cellsById, piece, newPosition) {
  return piece.shape.some((cell) => {
    const cellPositionX = cell.x + newPosition.x;
    const cellPositionY = newPosition.y - cell.y;
    return cellPositionY < 0 || cellsById[positionToId(cellPositionX, cellPositionY)].color;
  });
}


function tick(engine) {
  const { livePiece, map } = engine;
  const { cellsById } = map;
  let newLivePiece;
  if (!livePiece) {
    newLivePiece = createRandomPiece();
    newLivePiece.position = {
      x: Math.floor(map.width/2),
      y: map.height,
    };
  } else {
    newLivePiece = {
      ...livePiece,
    };
  }

  let newCellsById;
  let livePieceHasReachedTheBottom = false;
  if (newLivePiece) {
    const newPosition = getNewPositionForPiece(newLivePiece, directions.DOWN);
    if (pieceHasReachedTheBottom(cellsById, newLivePiece, newPosition)) {
      newCellsById = renderPieceIntoMap(newLivePiece, map.cellsById);
      livePieceHasReachedTheBottom = true;
    } else {
      newLivePiece.position = newPosition;
    }
  }

  return {
    ...engine,
    map: {
      ...map,
      cellsById: newCellsById ? newCellsById : cellsById,
    },
    livePiece: livePieceHasReachedTheBottom ? null : {
      ...newLivePiece,
    },
  }
}

function positionToId(x, y) {
  return `${x}_${y}`;
}
function createCell(x, y) {
  return {
    x,
    y,
    color: null,
    id: positionToId(x, y),
  };
}

function initializeMap(width, height) {
  const cellsById = {};
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let cell = createCell(i, j);
      cellsById[cell.id] = cell;
    }
  }

  return {
    width,
    height,
    cellsById,
  };
}


function cloneMatrix(grid) {
  return [...grid.map((row) => [...row])]
}
function renderPieceIntoMap(piece, cellsById) {
  if (!piece) return cellsById;

  const newCellsById = { ...cellsById };
  piece.shape.forEach((cell) => {
    const cellId = positionToId(cell.x + piece.position.x, piece.position.y - cell.y);
    newCellsById[cellId] = {
      ...newCellsById[cellId],
      color: piece.color,
    };
  });

  return newCellsById;
}

function toGrid({ width, height, cellsById }) {
  const grid = Array(height).fill().map(() => Array(width).fill(null));

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      grid[j][i] = cellsById[positionToId(i, height - j - 1)];
    }
  }
  return grid;
}

function Map({ map, livePiece }) {
  const grid = toGrid({
    ...map,
    cellsById: renderPieceIntoMap(livePiece, map.cellsById)
  });
  return (
    <div className="map">
      {grid.map((row) => (
        <Row key={`row-${row[0].y}`}>
          {row.map((cell) => (
            <Column key={`column-${cell.x}`}>
              <Cell cell={cell} />
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
function Cell({ cell }) {
  return (
    <span className="cell" style={{ backgroundColor: cell.color }}>
      <span className="coords">{cell.x},{cell.y}</span>
    </span>
  );
}

export default function Tetris() {
  const [engine, setEngine] = useState({ map: initializeMap(15, 25), tick: 100 });


  useInterval(() => {
    setEngine(tick);
  }, engine.tick);

  return (
    <div id="tetris">
      <Map map={engine.map} livePiece={engine.livePiece} />
      <button onClick={() => setEngine(tick)}>tick</button>
    </div>
  );
}