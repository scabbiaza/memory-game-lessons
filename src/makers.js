let R = require("ramda")

let {duplicate, getASCIICodeByLetter, getLetterByASCIICode, shuffle} = require("./helpers/common")
let {boardCellStatuses, minLetterASCIICode} = require("./constants")


// Number, Number -> Board
function makeRandomBoard(columns, rows) {
  if (R.type(columns) != "Number" || R.type(rows) != "Number") {
    throw Error("Columns and rows arguments should be defined and should be numbers")
  }

  if (R.modulo(columns*rows, 2) == 1) {
    throw Error("Amount of cells in the board should be even")
  }

  let maxLetterASCIICode = minLetterASCIICode + (columns * rows) / 2 - 1 // divide in 2, because each letter should be present twice
  let letters = R.chain(duplicate, R.map(getLetterByASCIICode, R.range(minLetterASCIICode, maxLetterASCIICode + 1)))
  let randomLetters = shuffle(letters)
  let cells = R.map(letter => {return {value: letter, status: boardCellStatuses.closed}}, randomLetters)
  return R.map(i => R.slice(columns * i, columns * i + columns, cells), R.range(0, rows))
}

// Number, Number -> Board
function makeTestBoard(columns, rows) {
  let randomBoard = makeRandomBoard(columns, rows)
  let orderedCells = R.sort((a, b) => getASCIICodeByLetter(a.value) - getASCIICodeByLetter(b.value), R.unnest(randomBoard))
  return R.map(i => R.slice(columns * i, columns * i + columns, orderedCells), R.range(0, rows))
}


exports.makeRandomBoard = makeRandomBoard
exports.makeTestBoard = makeTestBoard
