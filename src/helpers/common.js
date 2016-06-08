let R = require("ramda")

// A -> [A, A]
function duplicate(a) {
  if (R.type(a) == "Undefined") {
     throw Error("Argument should be defined")
  }
  return [a, a]
}

// Char -> Number
function getASCIICodeByLetter(letter) {
  if (R.type(letter) != "String" || R.length(letter) != 1) {
     throw Error("Letter argument should be defined and should be a string with length equal 1")
  }
  return letter.charCodeAt(0)
}

// Number -> Char
function getLetterByASCIICode(code) {
  if (R.type(code) != "Number") {
     throw Error("Code argument should be defined and should be a number")
  }
  return String.fromCharCode(code)
}

// Number, Number -> Number
function getRandomNumber(min, max) {
  if (R.type(min) != "Number" || R.type(max) != "Number") {
     throw Error("Min and max arguments should be defined and should be numbers")
  }
  return Math.floor(Math.random() * (max - min)) + min
}

// List -> List
function shuffle(list) {
  if (R.type(list) != "Array") {
     throw Error("List arguments should be defined and should be an array")
  }

  let min = 0
  let max = R.length(list)
  R.map(i => {
      let j = getRandomNumber(min, max)
      if (i != j) {
        let elem = list[i]
        list = R.remove(i, 1, list)
        list = R.insert(j, elem, list)
      }
    }, R.range(min, max))
  return list
}


exports.duplicate = duplicate
exports.getASCIICodeByLetter = getASCIICodeByLetter
exports.getLetterByASCIICode = getLetterByASCIICode
exports.getRandomNumber = getRandomNumber
exports.shuffle = shuffle


