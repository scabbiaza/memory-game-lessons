require("./styles/index.less")

var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');

let {makeRandomBoard, makeTestBoard} = require("./makers")
let {boardSize, boardCellStatuses} = require("./constants")
let renderGame= require("./views")


// STATE
let state = {
  board: makeTestBoard(boardSize.columns, boardSize.rows)
}

// RUN
let vtree = renderGame(state)
let rootNode = createElement(vtree)

document
  .getElementById("app")
  .appendChild(rootNode)

setTimeout(() => {
  // emulate state change
  state.board[0][0].status = boardCellStatuses.opened

  // emulate rerendering
  let newVTree = renderGame(state)
  let patches = diff(vtree, newVTree);
  rootNode = patch(rootNode, patches);
}, 1000)

setTimeout(() => {
  // emulate state change
  state.board[0][0].status = boardCellStatuses.done

  // emulate rerendering
  let newVTree = renderGame(state)
  let patches = diff(vtree, newVTree);
  rootNode = patch(rootNode, patches);
}, 2000)
