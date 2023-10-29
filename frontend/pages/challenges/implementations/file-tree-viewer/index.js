import { useState, useCallback, useMemo } from 'react';

const fileTypes = {
  JS: 'js',
  JSX: 'jsx',
  CSS: 'css',
  JSON: 'css',
};

const nodeType = {
  FOLDER: 'FOLDER',
  FILE: 'FILE',
};

let incrementalId = 0;

function createFolder({ name, content }) {
  return {
    id: incrementalId++,
    type: nodeType.FOLDER,
    name,
    content,
  };
}

function createFile({ name, fileType, size }) {
  return {
    id: incrementalId++,
    type: nodeType.FILE,
    name,
    fileType,
    size,
  };
}

const ROOT = 'ROOT';
const fileTree = {
  ...createFolder({ name: '/', content: [
    createFolder({ name: 'pages', content: [
      createFolder({ name: 'challenges', content: [
        createFolder({ name: 'implementations', content: [
          createFolder({ name: 'file-tree-viewer', content: [
            createFile({ name: 'index.js', fileType: fileTypes.JS, size: 1023 }),
          ]}),
          createFolder({ name: 'form', content: [
            createFile({ name: 'form.jsx', fileType: fileTypes.JSX, size: 3245 }),
            createFile({ name: 'index.js', fileType: fileTypes.JS, size: 317 }),
            createFile({ name: 'useForm.js', fileType: fileTypes.JS, size: 913 }),
            createFile({ name: 'utils.js', fileType: fileTypes.JS, size: 72 }),
          ]}),
          createFolder({ name: 'hooks', content: [
            createFile({ name: 'examples.js', fileType: fileTypes.JS, size: 1740 }),
            createFile({ name: 'index.js', fileType: fileTypes.JS, size: 68 }),
            createFile({ name: 'useDebounce.js', fileType: fileTypes.JS, size: 772 }),
            createFile({ name: 'useInterval.js', fileType: fileTypes.JS, size: 379 }),
          ]}),
          createFolder({ name: 'market', content: [
            createFile({ name: 'createOrderForm.js', fileType: fileTypes.JS, size: 1540 }),
            createFile({ name: 'index.js', fileType: fileTypes.JS, size: 3240 }),
            createFile({ name: 'order.js', fileType: fileTypes.JS, size: 864 }),
          ]}),
          createFolder({ name: 'questionnaire', content: [
            createFile({ name: 'index.js', fileType: fileTypes.JS, size: 2103 }),
          ]}),
          createFolder({ name: 'signup', content: [
            createFile({ name: 'index.js', fileType: fileTypes.JS, size: 1334 }),
          ]}),
          createFolder({ name: 'sudoku', content: [
            createFile({ name: 'constants.js', fileType: fileTypes.JS, size: 2340 }),
            createFile({ name: 'grid-utils.js', fileType: fileTypes.JS, size: 1452 }),
            createFile({ name: 'grid.js', fileType: fileTypes.JS, size: 3143 }),
            createFile({ name: 'index.js', fileType: fileTypes.JS, size: 1024 }),
            createFile({ name: 'messages.js', fileType: fileTypes.JS, size: 287 }),
            createFile({ name: 'validations.js', fileType: fileTypes.JS, size: 1333 }),
          ]}),
        ]}),
        createFile({ name: 'file-tree-viewer.js', fileType: fileTypes.JS, size: 867 }),
        createFile({ name: 'hooks.js', fileType: fileTypes.JS, size: 546 }),
        createFile({ name: 'market.js', fileType: fileTypes.JS, size: 1300 }),
        createFile({ name: 'questionnaire.js', fileType: fileTypes.JS, size: 856 }),
        createFile({ name: 'signup.js', fileType: fileTypes.JS, size: 885 }),
        createFile({ name: 'sudoku.js', fileType: fileTypes.JS, size: 581 }),
        createFile({ name: 'tetris.js', fileType: fileTypes.JS, size: 447 }),
      ]}),
      createFile({ name: '_app.js', fileType: fileTypes.JS, size: 127 }),
      createFile({ name: '_document.js', fileType: fileTypes.JS, size: 231 }),
      createFile({ name: 'index.js', fileType: fileTypes.JS, size: 482 }),
    ]})
  ]}),
  id: ROOT,
};


function useToggleValue(defaultValue = true) {
  const [booleanValue, setBooleanValue] = useState(true);
  const toggle = useCallback(() => {
    return setBooleanValue((booleanValue_) => !booleanValue_);
  }, []);

  return [
    booleanValue,
    toggle,
  ];
}

function getDepthStyle(depth) {
  return {
    paddingLeft: `${depth*10}px`,
  }
}

function Folder({ folder, depth }) {
  const [isExpanded, toggleIsExpanded] = useToggleValue(true);
  const style = getDepthStyle(depth);
  return (
    <>
      <div className="folder" onClick={toggleIsExpanded} style={style}>
        <span className="icon">
          {isExpanded? '📂' : '📁'}
        </span>
        { folder.name }
      </div>
      { isExpanded && folder.content.map((child) => <Node key={child.id} node={child} depth={depth}/>) }
    </>
  );
}

function File({ file, depth }) {
  const style = getDepthStyle(depth);
  return (
    <div className="file" style={style}>
      <span className="icon">
        📄
      </span>
      {file.name}
      <Size size={file.size} />
    </div>
  );
}


const sizeUnits = ['b', 'kb', 'mb', 'gb', 'tb'];
const KILO = 1024;
function getFileSize(size) {
  let i = Math.floor(Math.log2(size) / 10);
  // limiting to max sizeUnits.length just because I didn't define more units
  i = Math.min(i, sizeUnits.length - 1);
  const sizedDown = size / Math.pow(KILO, i);

  return ` ${parseFloat(sizedDown.toFixed(3))}${sizeUnits[i]}`;
}
function Size({ size }) {
  const computedSize = getFileSize(size);
  return (
    <span className="size">
      {computedSize}
    </span>
  );
}

function Node({ node, depth = 0 }) {
  return (
    <>
      {node.type === nodeType.FILE && <File file={node} depth={depth+1} />}
      {node.type === nodeType.FOLDER && <Folder folder={node} depth={depth+1} />}
    </>
  );
}

export default function FileTreeViewer() {
  return (
    <div id="file-tree-viewer">
      <h3>File tree</h3>
      <Node node={fileTree} />
    </div>
  );
}