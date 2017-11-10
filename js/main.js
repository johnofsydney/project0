console.log("testing ... main.js is conected");

///////////////////////////////////////////////////////////

let strKey = ""
let numColumn = 0;
let numNextColumn = 0;
let numPrevColumn = 0;
let charRow = ""
let charNextRow = ""
let charLastRow = ""
let charPrevRow = ""
let strNextKey = "";
let blackWins = 0;
let whiteWins = 0;
////////////////////////////////////////////////////////////////

// take the gameboard object and create a DOM version of HTML to display it...
const startGame = function(event) {
  const inputRows = +$('#inputRows').val();
  const inputColumns = +$('#inputColumns').val()


  console.log(inputRows, inputColumns);
  createGameBoard(inputRows, inputColumns);
  render();

}


const updateScore = function(name, number) {
  //console.log(name, number);
  let stringID = '#' + name
  let stringDisplay = name + " : " + number
  //$('#info3').show()
  $(stringID).html(stringDisplay).show();
}






let numRows = 0;
const strAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numColumns = 0;
let rows = [];
let columns = [];
let gameboard = {};

/// create the game board /////////////////////////////////
let createGameBoard = function(inputRows, inputColumns) {
  numRows = inputRows;
  numColumns = inputColumns;
  rows = [];
  columns = [];
  gameboard = {};


  for (let i = 1; i <= numColumns; i++) {
    columns.push(i)
  }
  for (let j = 1; j <= numRows; j++) {
    char = strAlphabet.slice(j - 1, j)
    rows.push(char)
  }

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      let char = rows[i];
      let num = columns[j].toString();

      let str = char + num;
      gameboard[str] = {}
      gameboard[str]['_row'] = "_" + char;
      gameboard[str]['_column'] = "_" + num;
      gameboard[str]['_id'] = "_" + str;
      gameboard[str]['_value'] = "_null";
    }
  }
  if ((numRows === 8) && (numColumns === 8)) {
    gameboard.D4._value = "_white";
    gameboard.E5._value = "_white";
    gameboard.D5._value = "_black";
    gameboard.E4._value = "_black";
  }

}
///////////////////////////////////////////////////////////
// to refer to a square >> (eg) gameboard.A2.row = "A"

let updateGameboard = function(row, column, value) {

  if ((numRows * numColumns) < 17) { // TIC TAC TOE
    // TIC TAC TOE// TIC TAC TOE // TIC TAC TOE // TIC TAC TOE // TIC TAC TOE
    let strKey = row + column;
    gameboard[strKey]['_value'] = value; // just place the pice where the player clicked
    checkForWin(row, column, value)

  } else if ((numRows * numColumns) > 63) { //Othello / reversi
    let strKey = row + column;
    gameboard[strKey]['_value'] = value; // just place the pice where the player clicked
    console.log("about to send to checkForFlips with row = " + row + " column = " + column + " value = " + value);

// if check for fliips === 0 send a message, change back to same player
  if ((checkForFlips(row, column, value)) === 0) {
    console.log(checkForFlips(row, column, value));
    console.log("illegal move");
    $('#announcement2').html("well, this is an illegal move, but variable scope prevents me from reversing the player at this stage").show()
  }
    console.log(checkForFlips(row, column, value));

//


    checkForFlips(row, column, value)
    checkForWin(row, column, value)

  } else { // Connect 4
    // Connect 4 // Connect 4 // Connect 4 // Connect 4 // Connect 4 // Connect 4
    strKey = row + column;
    charRow = String(row);
    charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
    charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
    ///////////////////////////////////////////////////////

    strNextKey = charNextRow + column;
    while ((charNextRow <= charLastRow) && (gameboard[strNextKey]['_value'] === '_null')) {
      strKey = strNextKey
      charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
      strNextKey = charNextRow + column
    }

    gameboard[strKey]['_value'] = value; //
    let strColumn = strKey.slice(1, 2)
    let strRow = strKey.slice(0, 1)
    checkForWin(strRow, strColumn, value)
  }


} // gameboard object is now updated.


let countBlankCells = function () {
let counter = 0;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      let char = rows[i];
      let num = columns[j].toString();

      let strKey = char + num;
      if (gameboard[strKey]['_value'] === "_null") {
        counter = counter + 1
      }
    }
  }

  return counter
}



let checkForFlips = function(row, column, value) {
  let flipArr = []; // build an array of all cells to flip
  let tempArr = []; // temporary Array to save each check from being run more than once;
  tempArr = checkDownArr(row, column, value);
  for (var i = 0; i < tempArr.length; i++) {
    flipArr.push(tempArr[i])
  }
  tempArr = [];
  tempArr = checkUpArr(row, column, value)
  for (var i = 0; i < tempArr.length; i++) {
    flipArr.push(tempArr[i])
  }
  tempArr = []
  tempArr = checkRightArr(row, column, value);
  for (var i = 0; i < tempArr.length; i++) {
    flipArr.push(tempArr[i])
  }
  tempArr = [];
  tempArr = checkLeftArr(row, column, value);
  for (var i = 0; i < tempArr.length; i++) {
    flipArr.push(tempArr[i])
  }
  tempArr = []
  tempArr = checkNorthEastArr(row, column, value)
  for (var i = 0; i < tempArr.length; i++) {
    flipArr.push(tempArr[i])
  }
  tempArr = []
  tempArr = checkSouthEastArr(row, column, value);
  for (var i = 0; i < tempArr.length; i++) {
    flipArr.push(tempArr[i])
  }
  tempArr = []
  tempArr = checkSouthWestArr(row, column, value);
  for (var i = 0; i < tempArr.length; i++) {
    flipArr.push(tempArr[i])
  }
  tempArr = [];
  tempArr = checkNorthWestArr(row, column, value);
  for (var i = 0; i < tempArr.length; i++) {
    flipArr.push(tempArr[i])
  }
  tempArr = [];


  // step througfh the array flipping eachg one.
  for (var i = 0; i < flipArr.length; i++) {
    if (gameboard[flipArr[i]]['_value'] === "_white") {
      gameboard[flipArr[i]]['_value'] = "_black"
    } else {
      gameboard[flipArr[i]]['_value'] = "_white"
    }
  }
  return flipArr.length
} // end of checkForFlips


// need to add win code for othello
let checkForWin = function(row, column, value) {
  // hope its all here - might have lost some stuff.


  let a = checkRight(row, column, value)
  let b = checkLeft(row, column, value)

  let c = checkUp(row, column, value)
  let d = checkDown(row, column, value)

  let e = checkNorthEast(row, column, value)
  let f = checkSouthWest(row, column, value)

  let g = checkNorthWest(row, column, value)
  let h = checkSouthEast(row, column, value)

  if ((numRows * numColumns) < 17) { // TIC TAC TOE
    if (((a + b + 1) >= 3) || ((c + d + 1) >= 3) || ((e + f + 1) >= 3) || ((g + h + 1) >= 3)) { //someone wins
      console.log("someone wins");
      if (value === "_black") {
        blackWins = blackWins + 1;
        updateScore("black", blackWins);
        //window.alert("Black wins. Black wins: " + blackWins + " White wins: " + whiteWins);
        $('#announcement').html("BLACK WINS").show().fadeOut(5000, function() {
          createGameBoard(numRows, numColumns);
          console.log(numRows, numColumns);
          render();
        })
        ////////////////////////////////////////////////

        //
      } else {
        whiteWins = whiteWins + 1;
        updateScore("white", whiteWins);
        $('#announcement').html("WHITE WINS").show().fadeOut(5000, function() {
          createGameBoard(numRows, numColumns);
          console.log(numRows, numColumns);
          render();
        })
      }
      console.log(`white wins: ${whiteWins}, black wins: ${blackWins}`);
    } else {
      console.log("no one has won yet");
      console.log(countBlankCells());

      if (countBlankCells() === 0) {
        console.log("draw");

        $('#announcement').html("DRAW").show().fadeOut(5000, function() {
          createGameBoard(numRows, numColumns);
          console.log(numRows, numColumns);
          render();
        })




      }

    }



  } else if ((numRows * numColumns) > 63) { //Othello / reversi

    console.log("...coming soon...");
    console.log(countBlankCells() + "turns remaining");
    $('#announcement').html(countBlankCells() + " turns remaining").show()





  } else { // Connect 4 // Connect 4 // Connect 4 // Connect 4 // Connect 4 // Connect 4
    if (((a + b + 1) >= 4) || ((c + d + 1) >= 4) || ((e + f + 1) >= 4) || ((g + h + 1) >= 4)) {
      if (value === "_black") {
        blackWins = blackWins + 1;
        $('#announcement').html("BLACK WINS").show().fadeOut(5000, function() {
          createGameBoard(numRows, numColumns);
          console.log(numRows, numColumns);
          render();
        })
      } else {
        whiteWins = whiteWins + 1;
        updateScore("white", whiteWins);
        $('#announcement').html("WHITE WINS").show().fadeOut(5000, function() {
          createGameBoard(numRows, numColumns);
          console.log(numRows, numColumns);
          render();
        })
      }
    }

////

else {
  console.log("no one has won yet");
  console.log(countBlankCells());

  if (countBlankCells() === 0) {
    console.log("draw");

    $('#announcement').html("DRAW").show().fadeOut(5000, function() {
      createGameBoard(numRows, numColumns);
      console.log(numRows, numColumns);
      render();
    })




  }

}

////



  }
}




let checkRight = function(row, column, value) {
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = row + numNextColumn;
  console.log("in check Right" + strKey, charPrevRow, strNextKey);
  adjacentsToRight = 0
  if (numColumn < numColumns) { // ie we dont run this section if click in rightest column
    while (((numNextColumn) <= numColumns) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
      adjacentsToRight = adjacentsToRight + 1; ////////////////////////
      numNextColumn = numNextColumn + 1;
      strNextKey = row + numNextColumn
    }
  }
  return adjacentsToRight; // does not include the tile just placed.
}

let checkLeft = function(row, column, value) {
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////

  strNextKey = row + numPrevColumn;
  let adjacentsToLeft = 0
  //debugger;
  while ((numPrevColumn > 0) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
    adjacentsToLeft = adjacentsToLeft + 1; ////////////////////////
    numPrevColumn = numPrevColumn - 1;
    strNextKey = row + numPrevColumn;
  }
  return adjacentsToLeft;
}

let checkDown = function(row, column, value) {
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////

  strNextKey = charNextRow + column;
  let adjacentsToDown = 0;
  if (charRow < charLastRow) { // doesnt run if we currently in last row
    while ((charNextRow <= charLastRow) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
      adjacentsToDown = adjacentsToDown + 1;
      charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
      strNextKey = charNextRow + column
    }
  }

  return adjacentsToDown;

}

let checkUp = function(row, column, value) {
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charPrevRow + column;
  let adjacentsToUp = 0;
  while ((charPrevRow >= "A") && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
    adjacentsToUp = adjacentsToUp + 1; //////
    charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
    strNextKey = charPrevRow + column
  }
  return adjacentsToUp
}

let checkNorthEast = function(row, column, value) { // checking to UP and RIGHT
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charPrevRow + numNextColumn
  let adjacentsToNE = 0;

  if ((charPrevRow >= "A") && (numNextColumn <= numColumns)) {
    while ((charPrevRow >= "A") && (numNextColumn <= numColumns) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
      adjacentsToNE = adjacentsToNE + 1;
      charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
      numNextColumn = numNextColumn + 1;
      strNextKey = charPrevRow + numNextColumn

    }
  }
  return adjacentsToNE;
}

let checkSouthEast = function(row, column, value) { // checking to DOWN and RIGHT
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charNextRow + numNextColumn
  let adjacentsToSE = 0;
  while ((charNextRow <= charLastRow) && (numNextColumn <= numColumns) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
    adjacentsToSE = adjacentsToSE + 1;
    charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
    numNextColumn = numNextColumn + 1;
    strNextKey = charNextRow + numNextColumn

  }
  return adjacentsToSE;
}

let checkSouthWest = function(row, column, value) { // checking to DOWN and LEFT
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charNextRow + numPrevColumn
  let adjacentsToSW = 0;
  while ((charNextRow <= charLastRow) && (numPrevColumn > 0) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
    adjacentsToSW = adjacentsToSW + 1;
    charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
    numPrevColumn = numPrevColumn - 1;
    strNextKey = charNextRow + numPrevColumn

  }
  return adjacentsToSW;
}

let checkNorthWest = function(row, column, value) { // checking to UP and LEFT
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charPrevRow + numPrevColumn
  let adjacentsToNW = 0
  while ((charPrevRow >= "A") && (numPrevColumn > 0) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
    adjacentsToNW = adjacentsToNW + 1;
    charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
    numPrevColumn = numPrevColumn - 1;
    strNextKey = charPrevRow + numPrevColumn

  }
  return adjacentsToNW;
}









let checkRightArr = function(row, column, value) {
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  console.log("entering checkRightArr");

  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = row + numNextColumn;
  let adjacentsToRightArr = []

  if ((numColumns - numColumn) <= 1) {
    return []
  }

  if (gameboard[strNextKey]['_value'] === '_null') {
    return [];
  }

  if ((numColumns - numColumn) > 1) { // ie we dont run this section if click in rightest or 2nd rightest column
    while (((numNextColumn) < numColumns) && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value']) && (gameboard[strNextKey]['_value'] !== 'null')) {
      adjacentsToRightArr.push(strNextKey)
      numNextColumn = numNextColumn + 1;
      strNextKey = row + numNextColumn
    }

    //console.log("checking right ... strNextKey is: " + strNextKey);
    //console.log(adjacentsToRightArr);
    if ((strNextKey, gameboard[strNextKey]['_value']) === value) {
      //console.log("a reflecting tile has been found. gonna flip the inbetweens");
      return adjacentsToRightArr;
    } else {
      adjacentsToRightArr = []
      //console.log("do we ever see this 123");
      //yes, if all null to right of strKey.
      // and if no reflecting tile is found
      return adjacentsToRightArr;
    }
  }

  adjacentsToRightArr = []
  //console.log("do we ever see this 456");
  // yes, if clik in right two columns.
  return adjacentsToRightArr;

} // end of checkRightArr

let checkLeftArr = function(row, column, value) {
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  console.log("entering checkLeftArr");
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////

  strNextKey = row + numPrevColumn;
  let adjacentsToLeftArr = []

  if (numColumn <= 2) {
    return []
  }

  if (gameboard[strNextKey]['_value'] === '_null') {
    return [];
  }

  if (numColumn > 2) { // ie dont run this code in leftest two cols.
    while ((numPrevColumn > 1) && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value']) && (gameboard[strNextKey]['_value'] !== 'null')) {
      adjacentsToLeftArr.push(strNextKey)
      numPrevColumn = numPrevColumn - 1;
      strNextKey = row + numPrevColumn;
    }
    console.log("checking left " + strNextKey);
    if ((gameboard[strNextKey]['_value']) === value) {
      return adjacentsToLeftArr;
    } else {
      adjacentsToLeftArr = []
      return adjacentsToLeftArr;
    }

  }

  adjacentsToLeftArr = []
  return adjacentsToLeftArr;


} // end of checkLeft

let checkDownArr = function(row, column, value) {
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  console.log("entering checkDownArr");
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  char2ndLastRow = String.fromCharCode("A".charCodeAt() + numRows - 2)
  console.log(char2ndLastRow);
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////

  strNextKey = charNextRow + column;
  let adjacentsToDownArr = [];

  if (charRow >= char2ndLastRow) {
    return [];
  }

  if (gameboard[strNextKey]['_value'] === '_null') {
    return [];
  }

  if (charRow < char2ndLastRow) { // doesnt run if we currently in last 2 rows
    while ((charNextRow < charLastRow) && (gameboard[strNextKey]['_value'] !== '_null') && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value'])) {
      adjacentsToDownArr.push(strNextKey)
      charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
      strNextKey = charNextRow + column
    }

    console.log(strNextKey, gameboard[strNextKey]['_value']);
    if ((strNextKey, gameboard[strNextKey]['_value']) === value) {
      return adjacentsToDownArr;
    } else {

    }

  }

  adjacentsToDownArr = []
  return adjacentsToDownArr;


}


let checkUpArr = function(row, column, value) {
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  console.log("entering checkUp");
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  //console.log(`charRow = ${charRow}`);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charPrevRow + column;
  let adjacentsToUpArr = [];

  if (charRow <= "B") {
    return []
  }

  if (gameboard[strNextKey]['_value'] === '_null') {
    return [];
  }

  if (charRow > "B") {
    while ((charPrevRow > "A") && (gameboard[strNextKey]['_value'] !== '_null') && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value'])) {
      adjacentsToUpArr.push(strNextKey)
      charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
      strNextKey = charPrevRow + column
      //console.log("(in checkColumn )strNextKewy: " + strPrevKey);
    }

    if ((strNextKey, gameboard[strNextKey]['_value']) === value) {
      return adjacentsToUpArr;
    } else {
      adjacentsToUpArr = []
      return adjacentsToUpArr;
    }

  }

  adjacentsToUpArr = []
  return adjacentsToUpArr;


}


let checkNorthEastArr = function(row, column, value) { // checking to UP and RIGHT
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charPrevRow + numNextColumn
  let adjacentsToNEArr = [];

  if (charRow <= "B") {
    return []
  }

  if ((numColumns - numColumn) <= 1) {
    return [];
  }

  if (gameboard[strNextKey]['_value'] === '_null') {
    return [];
  }


  while ((charPrevRow > "A") && (numNextColumn < numColumns) && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value']) && (gameboard[strNextKey]['_value'] !== 'null')) {
    adjacentsToNEArr.push(strNextKey)
    charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
    numNextColumn = numNextColumn + 1;
    strNextKey = charPrevRow + numNextColumn

  }
  //}
  if ((strNextKey, gameboard[strNextKey]['_value']) === value) {
    return adjacentsToNEArr;
  } else {
    adjacentsToNEArr = []
    return adjacentsToNEArr;
  }
}


let checkSouthEastArr = function(row, column, value) { // checking to DOWN and RIGHT
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 2)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charNextRow + numNextColumn
  let adjacentsToSEArr = [];



  if (numColumns - numColumn <= 1) {
    return []
  }

  if (charRow >= char2ndLastRow) {
    return []
  }


  if (gameboard[strNextKey]['_value'] === '_null') {
    return [];
  }


  while ((charNextRow < charLastRow) && (numNextColumn < numColumns) && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value']) && (gameboard[strNextKey]['_value'] !== 'null')) {
    adjacentsToSEArr.push(strNextKey)
    charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
    numNextColumn = numNextColumn + 1;
    strNextKey = charNextRow + numNextColumn

  }
  if ((strNextKey, gameboard[strNextKey]['_value']) === value) {
    return adjacentsToSEArr;
  } else {
    adjacentsToSEArr = []
    return adjacentsToSEArr;
  }
  adjacentsToSEArr = []
  return adjacentsToSEArr;

}


let checkSouthWestArr = function(row, column, value) { // checking to DOWN and LEFT
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charNextRow + numPrevColumn
  let adjacentsToSWArr = [];

  if (numColumn <= 2) {
    return []
  }
  if (charRow >= char2ndLastRow) {
    return []
  }

  if (gameboard[strNextKey]['_value'] === '_null') {
    return [];
  }


  //console.log(strKey, charRow, numColumn, strNextKey, gameboard[strNextKey]['_value']);
  while ((charNextRow < charLastRow) && (numPrevColumn > 1) && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value']) && (gameboard[strNextKey]['_value'] !== 'null')) {
    adjacentsToSWArr.push(strNextKey)
    charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
    numPrevColumn = numPrevColumn - 1;
    strNextKey = charNextRow + numPrevColumn

  }
  if ((strNextKey, gameboard[strNextKey]['_value']) === value) {
    return adjacentsToSWArr;
  } else {
    adjacentsToSWArr = []
    return adjacentsToSWArr;
  }
  adjacentsToSWArr = []
  return adjacentsToSWArr;
}


let checkNorthWestArr = function(row, column, value) { // checking to UP and LEFT
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  strKey = row + column;
  numColumn = +column;
  numNextColumn = numColumn + 1;
  numPrevColumn = numColumn - 1;
  charRow = String(row);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charPrevRow + numPrevColumn
  let adjacentsToNWArr = []

  if (numColumn <= 2) {
    return []
  }
  if (charRow <= "B") {
    return []
  }
  if (gameboard[strNextKey]['_value'] === '_null') {
    return [];
  }





  //console.log(strKey, charRow, numColumn, strNextKey, gameboard[strNextKey]['_value']);
  while ((charPrevRow > "A") && (numPrevColumn > 1) && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value']) && (gameboard[strNextKey]['_value'] !== 'null')) {
    adjacentsToNWArr.push(strNextKey)
    charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
    numPrevColumn = numPrevColumn - 1;
    strNextKey = charPrevRow + numPrevColumn

  }
  if ((strNextKey, gameboard[strNextKey]['_value']) === value) {
    return adjacentsToNWArr;
  } else {
    adjacentsToNWArr = []
    return adjacentsToNWArr;
  }

  adjacentsToNWArr = []
  return adjacentsToNWArr;
};
//
// ///////////////////////////////////////////////////////
