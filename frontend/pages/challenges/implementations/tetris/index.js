import { useState, useCallback, useEffect } from 'react';
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

const orientations = {
  NORTH: {
    id: 'NORTH',
  },
  WEST: {
    id: 'WEST',
  },
  SOUTH: {
    id: 'SOUTH',
  },
  EAST: {
    id: 'EAST',
  },
};
orientations.NORTH.next = orientations.EAST;
orientations.NORTH.prev = orientations.WEST;

orientations.EAST.next = orientations.SOUTH;
orientations.EAST.prev = orientations.NORTH;

orientations.SOUTH.next = orientations.WEST;
orientations.SOUTH.prev = orientations.EAST;

orientations.WEST.next = orientations.NORTH;
orientations.WEST.prev = orientations.SOUTH;

const pieceShapesAndOrientation = {
  SQUARE: {
    [orientations.NORTH.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ],
    [orientations.EAST.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ],
    [orientations.SOUTH.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ],
    [orientations.WEST.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ],
  },
  LINE: {
    [orientations.NORTH.id]: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
    [orientations.EAST.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
    ],
    [orientations.SOUTH.id]: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
    [orientations.WEST.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
    ],
  },
  T: {
    [orientations.NORTH.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, 
                      { x: 1, y: 1 },
    ],
    [orientations.EAST.id]: [
                      { x: 0, y: 0 },
      { x:-1, y: 1 }, { x: 0, y: 1 },
                      { x: 0, y: 2 },
    ],
    [orientations.SOUTH.id]: [
                      { x: 0, y: 0 },
      { x:-1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }, 
    ],
    [orientations.WEST.id]: [
      { x: 0, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
      { x: 0, y: 2 },
    ],
  },
  L: {
    [orientations.NORTH.id]: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }, { x: 1, y: 2 },
    ],
    [orientations.EAST.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, 
      { x: 0, y: 1 },
    ],
    [orientations.SOUTH.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, 
                      { x: 1, y: 1 },
                      { x: 1, y: 2 },
    ],
    [orientations.WEST.id]: [
                                      { x: 0, y: 0 },
      { x:-2, y: 1 }, { x:-1, y: 1 }, { x: 0, y: 1 }, 
    ],
  },
  MIRROR_L: {
    [orientations.NORTH.id]: [
                      { x: 1, y: 0 },
                      { x: 1, y: 1 },
      { x: 0, y: 2 }, { x: 1, y: 2 },
    ],
    [orientations.EAST.id]: [
      { x: 0, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, 
    ],
    [orientations.SOUTH.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, 
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ],
    [orientations.WEST.id]: [
      { x:-2, y: 0 }, { x:-1, y: 0 }, { x: 0, y: 0 }, 
                                      { x: 0, y: 1 },
    ],
  },
  SKEW: {
    [orientations.NORTH.id]: [
                      { x: 1, y: 0 }, { x: 2, y: 0 }, 
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ],
    [orientations.EAST.id]: [
      { x: 0, y: 0 }, 
      { x: 0, y: 1 }, { x: 1, y: 1 },
                      { x: 1, y: 2 },
    ],
    [orientations.SOUTH.id]: [
                      { x: 1, y: 0 }, { x: 2, y: 0 }, 
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ],
    [orientations.WEST.id]: [
      { x: 0, y: 0 }, 
      { x: 0, y: 1 }, { x: 1, y: 1 },
                      { x: 1, y: 2 },
    ],
  },
  MIRROR_SKEW: {
    [orientations.NORTH.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, 
                      { x: 1, y: 1 }, { x: 2, y: 1 },
    ],
    [orientations.EAST.id]: [
                      { x: 1, y: 0 }, 
      { x: 0, y: 1 }, { x: 1, y: 1 },
      { x: 0, y: 2 },
    ],
    [orientations.SOUTH.id]: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, 
                      { x: 1, y: 1 }, { x: 2, y: 1 },
    ],
    [orientations.WEST.id]: [
                      { x: 1, y: 0 }, 
      { x: 0, y: 1 }, { x: 1, y: 1 },
      { x: 0, y: 2 },
    ],
  },
}
const pieceShapesNames = Object.keys(pieceShapesAndOrientation);
const colors = ['red', 'green', 'yellow', 'blue', 'teal'];

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createRandomPiece() {
  return {
    shape: getRandom(pieceShapesNames),
    orientation: orientations.NORTH,
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
function getOrientedShape(piece) {
  return pieceShapesAndOrientation[piece.shape][piece.orientation.id];
}

function pieceHasReachedSomeLimit(cellsById, piece, newPosition) {
  return getOrientedShape(piece).map(positionShapeCellInGrid(newPosition)).some((cell) => {
    return cell.y < 0 || cell.x < 0 || cell.x >= 15 || cellsById[positionToId(cell.x, cell.y)].color;
  });
}

function getLivePiece(engine) {
  if (engine.livePiece) return { ...engine.livePiece };

  const { map } = engine;
  const piece = createRandomPiece();
  piece.position = {
    x: Math.floor(map.width/2),
    y: map.height - 1,
  };

  return piece;
}

function tick(engine) {
  let livePiece = getLivePiece(engine);
  const { map } = engine;
  const { cellsById } = map;

  let newCellsById;

  // check if a live piece exists
  // if yes
    // try to move it down
    // if piece has reached the bottom
      // render live piece into map
      // remove completed lines
    // else 
      // assign new position to live piece
  // else 
    // create live piece
      // if piece has reached the bottom
        // render live piece into map
        // game over

  if (pieceHasReachedSomeLimit(cellsById, livePiece, livePiece.position)) {
    newCellsById = renderPieceIntoMap(livePiece, map.cellsById);
    livePiece = null;
    return {
      ...engine,
      status: status.GAME_OVER,
      map: {
        ...map,
        cellsById: newCellsById ? newCellsById : cellsById,
      },
      livePiece,
    }
  }

  // piece has room to move
  const newLivePiecePosition = getNewPositionForPiece(livePiece, directions.DOWN);
  if (pieceHasReachedSomeLimit(cellsById, livePiece, newLivePiecePosition)) {
    newCellsById = renderPieceIntoMap(livePiece, map.cellsById);
    livePiece = null;
  } else {
    livePiece.position = newLivePiecePosition;
  }

  return {
    ...engine,
    map: {
      ...map,
      cellsById: newCellsById ? newCellsById : cellsById,
    },
    livePiece,
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

function positionShapeCellInGrid(position) {
  return function (cell) {
    return {
      x: cell.x + position.x,
      y: position.y - cell.y,
    };
  };
}

function cloneMatrix(grid) {
  return [...grid.map((row) => [...row])]
}
function renderPieceIntoMap(piece, cellsById) {
  if (!piece) return cellsById;

  const newCellsById = { ...cellsById };
  getOrientedShape(piece).map(positionShapeCellInGrid(piece.position)).forEach((cell) => {
    const cellId = positionToId(cell.x, cell.y);
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

function handleKeys(e) {
  return function (engine) {
    console.log(e.key)

    let newLivePiecePosition;
    switch (e.key) {
      case 'p': 
        return {
          ...engine,
          status: engine.status === status.RUNNING ? status.PAUSED : status.RUNNING,
        }
        break;
      case 'ArrowLeft': 
        if (!engine.livePiece) return engine;
        newLivePiecePosition = getNewPositionForPiece(engine.livePiece, directions.LEFT);
        if (pieceHasReachedSomeLimit(engine.map.cellsById, engine.livePiece, newLivePiecePosition)) return engine;
        return {
          ...engine,
          livePiece: {
            ...engine.livePiece,
            position: newLivePiecePosition,
          }
        }
        break;
      case 'ArrowRight':
        if (!engine.livePiece) return engine;
        newLivePiecePosition = getNewPositionForPiece(engine.livePiece, directions.RIGHT);
        if (pieceHasReachedSomeLimit(engine.map.cellsById, engine.livePiece, newLivePiecePosition)) return engine;
        return {
          ...engine,
          livePiece: {
            ...engine.livePiece,
            position: newLivePiecePosition,
          }
        }
        break;
      case 'ArrowUp':
        if (!engine.livePiece) return engine;
        return {
          ...engine,
          livePiece: {
            ...engine.livePiece,
            orientation: engine.livePiece.orientation.next,
          },
        }
        break;
      case 'ArrowDown': 
        if (!engine.livePiece) return engine;
        newLivePiecePosition = getNewPositionForPiece(engine.livePiece, directions.DOWN);
        if (pieceHasReachedSomeLimit(engine.map.cellsById, engine.livePiece, newLivePiecePosition)) return engine;
        return {
          ...engine,
          livePiece: {
            ...engine.livePiece,
            position: newLivePiecePosition,
          }
        }
        break;
      default: 
        break;
    }
    return engine;
  }
}

export default function Tetris() {
  const [engine, setEngine] = useState({ 
    map: initializeMap(15, 25), 
    tick: 300,
    status: status.RUNNING,
  });


  useInterval(() => {
    setEngine(tick);
  }, engine.status === status.RUNNING ? engine.tick : null);

  const handleKeysCallback = useCallback((e) => setEngine(handleKeys(e)), [setEngine]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeysCallback);
    () => window.removeEventListener('keyup', handleKeysCallback);
  }, [handleKeysCallback])

  return (
    <div id="tetris">
      <Map map={engine.map} livePiece={engine.livePiece} />
      {engine.status}
      <button onClick={() => setEngine(tick)}>tick</button>
    </div>
  );
}