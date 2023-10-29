import { useState, useCallback } from 'react';

const fileTypes = {
  JS: 'js',
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

/*
[ 34K]  pages
├── [ 127]  _app.js
├── [ 231]  _document.js
├── [ 33K]  challenges
│   ├── [ 867]  file-tree-viewer.js
│   ├── [ 546]  hooks.js
│   ├── [ 27K]  implementations
│   │   ├── [ 766]  file-tree-viewer
│   │   │   └── [ 670]  index.js
│   │   ├── [4.6K]  form
│   │   │   ├── [3.2K]  form.jsx
│   │   │   ├── [ 317]  index.js
│   │   │   ├── [ 913]  useForm.js
│   │   │   └── [  72]  utils.js
│   │   ├── [3.0K]  hooks
│   │   │   ├── [1.7K]  examples.js
│   │   │   ├── [  68]  index.js
│   │   │   ├── [ 722]  useDebounce.js
│   │   │   └── [ 379]  useInterval.js
│   │   ├── [5.8K]  market
│   │   │   ├── [  64]  create-order
│   │   │   ├── [1.5K]  createOrderForm.js
│   │   │   ├── [3.2K]  index.js
│   │   │   └── [ 864]  order.js
│   │   ├── [2.1K]  questionnaire
│   │   │   └── [2.0K]  index.js
│   │   ├── [1.4K]  signup
│   │   │   └── [1.3K]  index.js
│   │   └── [9.4K]  sudoku
│   │       ├── [2.2K]  constants.js
│   │       ├── [1.4K]  grid-utils.js
│   │       ├── [3.1K]  grid.js
│   │       ├── [1.0K]  index.js
│   │       ├── [ 287]  messages.js
│   │       └── [1.1K]  validations.js
│   ├── [1.3K]  market.js
│   ├── [ 856]  questionnaire.js
│   ├── [ 885]  signup.js
│   ├── [ 581]  sudoku.js
│   └── [ 447]  tetris.js
└── [ 482]  index.js
*/
const ROOT = 'ROOT';
const fileTree = {
  ...createFolder({ name: '/', content: [
    createFolder({ name: 'pages', content: [
      createFolder({ name: 'challenges', content: [
        createFolder({ name: 'implementations', content: [
        
        ]}),
        createFile({ name: 'file-tree-viewer.js', fileType: fileTypes.JS, size: 867 }),
        createFile({ name: 'hooks.js', fileType: fileTypes.JS, size: 546 }),
        createFile({ name: 'market.js', fileType: fileTypes.JS, size: 1300 }),
        createFile({ name: 'questionnaier.js', fileType: fileTypes.JS, size: 856 }),
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

function Folder({ folder, depth }) {
  const [isExpanded, toggleIsExpanded] = useToggleValue(true);
  return (
    <>
    <span onClick={toggleIsExpanded}>
      { folder.name }
    </span>
      { isExpanded && folder.content.map((child) => <Node key={child.id} node={child} depth={depth}/>) }
    </>
  );
}

function File({ file, depth }) {
  return (
    <span>
      { file.name }
    </span>
  );
}

function Node({ node, depth = 0 }) {
  return (
    <div className="node" style={{ paddingLeft: `${depth*10}px` }}>
      {node.type === nodeType.FILE && <File file={node} depth={depth+1}/>}
      {node.type === nodeType.FOLDER && <Folder folder={node} depth={depth+1} />}
    </div>
  );
}

export default function FileTreeViewer() {
  return (
    <div id="file-tree-viewer">
      <Node node={fileTree} />
    </div>
  );
}