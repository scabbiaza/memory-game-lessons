let chai = require("chai")
let R = require("ramda")

let {duplicate, getASCIICodeByLetter, getLetterByASCIICode, getRandomNumber, shuffle} = require("../src/helpers/common")
let {makeRandomBoard} = require("../src/makers")


let expectCalling = func => ({ withArgs: (...args) => chai.expect(() => func(...args)) });

describe("helpers", function() {
  describe("/common.js", function() {
    describe("duplicate()", function() {
      let errorInput = "Argument should be defined"
      it("should return error if both arguments are not defined", function() {
        chai.expect(duplicate.bind()).to.throw(errorInput)
      })
      it("should return an array with two elements as input", function() {
        chai.expect(duplicate("")).to.deep.equal(["", ""])
        chai.expect(duplicate("a")).to.deep.equal(["a", "a"])
        chai.expect(duplicate(1)).to.deep.equal([1, 1])
        chai.expect(duplicate([])).to.deep.equal([[], []])
        chai.expect(duplicate(["b"])).to.deep.equal([["b"], ["b"]])
        chai.expect(duplicate({})).to.deep.equal([{}, {}])
        chai.expect(duplicate(true)).to.deep.equal([true, true])
      })
    })
    describe("getASCIICodeByLetter()", function() {
      let errorInput = "Letter argument should be defined and should be a string with length equal 1"
      it("should return error if argument is not defined set", function() {
        chai.expect(getASCIICodeByLetter.bind()).to.throw(errorInput)
      })
      it("should return error if argument is not a String", function() {
        expectCalling(getASCIICodeByLetter).withArgs(1).to.throw(errorInput)
        expectCalling(getASCIICodeByLetter).withArgs([]).to.throw(errorInput)
        expectCalling(getASCIICodeByLetter).withArgs({}).to.throw(errorInput)
        expectCalling(getASCIICodeByLetter).withArgs(true).to.throw(errorInput)
      })
      it("should return error if argument is an empty String", function() {
        expectCalling(getASCIICodeByLetter).withArgs("").to.throw(errorInput)
      })
      it("should return error if argument is a String with length more than one", function() {
        expectCalling(getASCIICodeByLetter).withArgs("").to.throw(errorInput)
      })
      it("should result code by letter", function() {
        chai.expect(getASCIICodeByLetter("A")).to.be.equal(65)
        chai.expect(getASCIICodeByLetter("B")).to.be.equal(66)
        chai.expect(getASCIICodeByLetter("C")).to.be.equal(67)
        chai.expect(getASCIICodeByLetter("D")).to.be.equal(68)
      })
    })
    describe("getLetterByASCIICode()", function() {
      let errorInput = "Code argument should be defined and should be a number"
      it("should return error if argument is not defined set", function() {
        chai.expect(getLetterByASCIICode.bind()).to.throw(errorInput)
      })
      it("should return error if argument is not a Number", function() {
        expectCalling(getLetterByASCIICode).withArgs("").to.throw(errorInput)
        expectCalling(getLetterByASCIICode).withArgs("a").to.throw(errorInput)
        expectCalling(getLetterByASCIICode).withArgs([]).to.throw(errorInput)
        expectCalling(getLetterByASCIICode).withArgs({}).to.throw(errorInput)
        expectCalling(getLetterByASCIICode).withArgs(true).to.throw(errorInput)
      })
      it("should result letter by code", function() {
        chai.expect(getLetterByASCIICode(65)).to.be.equal("A")
        chai.expect(getLetterByASCIICode(66)).to.be.equal("B")
        chai.expect(getLetterByASCIICode(67)).to.be.equal("C")
        chai.expect(getLetterByASCIICode(68)).to.be.equal("D")
      })
    })
    describe("getRandomNumber()", function() {
      let errorInput = "Min and max arguments should be defined and should be numbers"
      it("should return error if both arguments are not defined", function() {
        chai.expect(getRandomNumber.bind()).to.throw(errorInput)
        expectCalling(getRandomNumber).withArgs(1).to.throw(errorInput)
      })
      it("should return error if both arguments are not Numbers", function() {
        expectCalling(getRandomNumber).withArgs("", "").to.throw(errorInput)
        expectCalling(getRandomNumber).withArgs("a", 2).to.throw(errorInput)
        expectCalling(getRandomNumber).withArgs(1, "b").to.throw(errorInput)
        expectCalling(getRandomNumber).withArgs([], 2).to.throw(errorInput)
        expectCalling(getRandomNumber).withArgs({}, 2).to.throw(errorInput)
        expectCalling(getRandomNumber).withArgs(true, 2).to.throw(errorInput)
      })
      it("should result result in range between min and max including them", function() {
        let min = 1
        let max = 100
        let result = getRandomNumber(min, max)
        chai.expect(result).to.be.within(min, max)
      })
    })
    describe("shuffle()", function() {
      let errorInput = "List arguments should be defined and should be an array"
      it("should return error if argument is not defined set", function() {
        chai.expect(shuffle.bind()).to.throw(errorInput)
      })
      it("should return error if argument is not an Array", function() {
        expectCalling(shuffle).withArgs("").to.throw(errorInput)
        expectCalling(shuffle).withArgs("a").to.throw(errorInput)
        expectCalling(shuffle).withArgs({}).to.throw(errorInput)
        expectCalling(shuffle).withArgs(true).to.throw(errorInput)
      })
      it("should result a different result as input, but with the same elements", function() {
        let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let result = shuffle(list)

        let diff = (a, b) => a - b

        chai.expect(list.length).to.be.equal(result.length)
        chai.expect(list).to.be.not.equal(result)
        chai.expect(R.sort(diff, list)).to.deep.equal(R.sort(diff, result))
      })
    })
  })

  describe("/makers.js", function() {
    describe("makeRandomBoard()", function() {
      let errorInput = "Columns and rows arguments should be defined and should be numbers"
      it("should return error if both arguments are not defined", function() {
        chai.expect(makeRandomBoard.bind()).to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs(1).to.throw(errorInput)
      })
      it("should return error if both arguments are not Numbers", function() {
        expectCalling(makeRandomBoard).withArgs("", "").to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs("a", 2).to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs(1, "b").to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs([], 2).to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs({}, 2).to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs(true, 2).to.throw(errorInput)
      })
      it("should return error if amount of cells in the board is not even", function() {
        expectCalling(makeRandomBoard).withArgs(3, 5).to.throw("Amount of cells in the board should be even")
      })
      it("should return the board with the proper size", function() {
        let columns = 2
        let rows = 3
        let result = makeRandomBoard(columns, rows)
        let resultRows = result.length
        let resultColumns = R.map(item => item.length, result)

        // expect list of lists
        chai.expect(R.unnest(result).length).to.be.equal(columns * rows)
        // recheck that columns and rows are not confused
        chai.expect(resultRows).to.be.equal(rows)
        chai.expect(R.all(c => c == columns, resultColumns)).to.be.true
      })
      it("should return the board with the proper structure", function() {
        let columns = 4
        let rows = 3
        let result = makeRandomBoard(columns, rows)
        let cells = R.flatten(result)

        // expect list of lists
        chai.expect(R.all(c => R.type(R.prop("value", c)) == "String" && R.type(R.prop("status", c)), cells)).to.be.true
      })
    })
    describe("makeTestBoard()", function() {
      let errorInput = "Columns and rows arguments should be defined and should be numbers"
      it("should return error if both arguments are not defined", function() {
        chai.expect(makeRandomBoard.bind()).to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs(1).to.throw(errorInput)
      })
      it("should return error if both arguments are not Numbers", function() {
        expectCalling(makeRandomBoard).withArgs("", "").to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs("a", 2).to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs(1, "b").to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs([], 2).to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs({}, 2).to.throw(errorInput)
        expectCalling(makeRandomBoard).withArgs(true, 2).to.throw(errorInput)
      })
      it("should return error if amount of cells in the board is not even", function() {
        expectCalling(makeRandomBoard).withArgs(3, 5).to.throw("Amount of cells in the board should be even")
      })
      it("should return the board with the proper size", function() {
        let columns = 2
        let rows = 3
        let result = makeRandomBoard(columns, rows)
        let resultRows = result.length
        let resultColumns = R.map(item => item.length, result)

        // expect list of lists
        chai.expect(R.unnest(result).length).to.be.equal(columns * rows)
        // recheck that columns and rows are not confused
        chai.expect(resultRows).to.be.equal(rows)
        chai.expect(R.all(c => c == columns, resultColumns)).to.be.true
      })
      it("should return the board with the proper structure", function() {
        let columns = 4
        let rows = 3
        let result = makeRandomBoard(columns, rows)
        let cells = R.flatten(result)

        // expect list of lists
        chai.expect(R.all(c => R.type(R.prop("value", c)) == "String" && R.type(R.prop("status", c)), cells)).to.be.true
      })
      it("should return the board with the proper structure", function() {
        let columns = 4
        let rows = 3
        let result = makeRandomBoard(columns, rows)
        let cells = R.flatten(result)

        // expect list of lists
        chai.expect(R.all(c => R.type(R.prop("value", c)) == "String" && R.type(R.prop("status", c)), cells)).to.be.true
      })
    })
  })
})
