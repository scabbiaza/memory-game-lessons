let {makeRandomBoard, makeTestBoard} = require("./makers")
let {boardSize} = require("./constants")


let state = {
  board: makeTestBoard(boardSize.columns, boardSize.rows),
}


// Tests
console.log('state:', state.board)
