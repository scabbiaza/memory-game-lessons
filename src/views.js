let h = require("virtual-dom/h")
let R = require("ramda")


let {boardSize, boardCellStatuses} = require("./constants")


// Board -> VNode
let boardView = (board) => {
  return h(`div.board.rows-${boardSize.rows}.cols-${boardSize.columns}`,
    R.map(i => R.map(j => cellView(i, j, board[i][j]),
                     R.range(0, R.length(board[i]))),
          R.range(0, R.length(board)))
  )
}

// Number -> Number -> Card -> VNode
let cellView = R.curry((i, j, card) => {
  return h("span.cell", {dataset: {row: i, col: j}},
    cardView(card)
  )
})

// Card -> VNode
let cardView = (card) => {
  let classes = ["card"]
  switch (card.status) {
    case boardCellStatuses.opened:
      classes = R.append("flipped", classes)
      break
    case boardCellStatuses.done:
      classes = R.append("flipped", classes)
      classes = R.append("hidden", classes)
      break
  }
  return h("span." + R.join(".", classes), {dataset: {state: card.status}}, [
    h("span.front", "?"),
    h("span.back", card.value),
  ])
}


module.exports = (game) => {
  return h("div.container", [
    boardView(game.board),
  ])
}
