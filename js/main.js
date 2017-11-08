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
    checkForFlips(row, column, value)

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

let checkForFlips = function(row, column, value) {
  let flipArr = []; // build an array of all cells to flip
  for (var i = 0; i < checkDownArr(row, column, value).length; i++) {
    flipArr.push(checkDownArr(row, column, value)[i])
  }
  for (var i = 0; i < checkUpArr(row, column, value).length; i++) {
    flipArr.push(checkUpArr(row, column, value)[i])
  }
  for (var i = 0; i < checkRightArr(row, column, value).length; i++) {
    flipArr.push(checkRightArr(row, column, value)[i])
  }
  for (var i = 0; i < checkLeftArr(row, column, value).length; i++) {
    flipArr.push(checkLeftArr(row, column, value)[i])
  }
  for (var i = 0; i < checkNorthEastArr(row, column, value).length; i++) {
    flipArr.push(checkNorthEastArr(row, column, value)[i])
  }
  for (var i = 0; i < checkSouthEastArr(row, column, value).length; i++) {
    flipArr.push(checkSouthEastArr(row, column, value)[i])
  }
  for (var i = 0; i < checkSouthWestArr(row, column, value).length; i++) {
    flipArr.push(checkSouthWestArr(row, column, value)[i])
  }
  for (var i = 0; i < checkNorthWestArr(row, column, value).length; i++) {
    flipArr.push(checkNorthWestArr(row, column, value)[i])
  }



// step througfh the array flipping eachg one.
  for (var i = 0; i < flipArr.length; i++) {
    //console.log("in the flipArr" + flipArr[i]);
    //console.log(gameboard[flipArr[i]]['_value']);
    if (gameboard[flipArr[i]]['_value'] === "_white") {
      gameboard[flipArr[i]]['_value'] = "_black"
    } else {
      gameboard[flipArr[i]]['_value'] = "_white"
    }
  }
} // end of checkForFlips



let checkForWin = function (row, column, value) {
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
        window.alert("Black wins. Black wins: " + blackWins + " White wins: " + whiteWins);
        createGameBoard(numRows, numColumns);
        console.log(numRows, numColumns);
      } else {
        whiteWins = whiteWins + 1;
        updateScore("white", whiteWins);
        window.alert("White wins. Black wins: " + blackWins + " White wins: " + whiteWins);
        createGameBoard(numRows, numColumns);
        console.log(numRows, numColumns);
      }
      console.log(`white wins: ${whiteWins}, black wins: ${blackWins}`);
    }

  } else if ((numRows * numColumns) > 63) { //Othello / reversi

    console.log("...coming soon...");

  } else { // Connect 4 // Connect 4 // Connect 4 // Connect 4 // Connect 4 // Connect 4
    if (((a + b + 1) >= 4) || ((c + d + 1) >= 4) || ((e + f + 1) >= 4) || ((g + h + 1) >= 4)) {
      console.log("someone wins");
      if (value === "_black") {
        blackWins = blackWins + 1;
        updateScore("black", blackWins);
        window.alert("Black wins. Black wins: " + blackWins + " White wins: " + whiteWins);
        createGameBoard(numRows, numColumns);
      } else {
        whiteWins = whiteWins + 1;
        updateScore("white", whiteWins);
        window.alert("White wins. Black wins: " + blackWins + " White wins: " + whiteWins);
        createGameBoard(numRows, numColumns);
      }
      console.log(`white wins: ${whiteWins}, black wins: ${blackWins}`);
    }
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



let checkRightArr = function(row, column, value) {
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
  //console.log("in check Right" + strKey, charPrevRow, strNextKey);
  adjacentsToRightArr = []
  //if (numColumn < numColumns) { // ie we dont run this section if click in rightest column
    while (((numNextColumn) < numColumns) && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value']) && (gameboard[strNextKey]['_value'] !== 'null')) {
      adjacentsToRightArr.push(strNextKey)
      numNextColumn = numNextColumn + 1;
      strNextKey = row + numNextColumn
    }
  //}
console.log("checking right " + strNextKey);
  if ((strNextKey, gameboard[strNextKey]['_value']) === value) {
    return adjacentsToRightArr;
  } else {
    adjacentsToRightArr = []
    return adjacentsToRightArr;
  }


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

let checkLeftArr = function(row, column, value) {
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
  let adjacentsToLeftArr = []

  while ((numPrevColumn > 2) && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value']) && (gameboard[strNextKey]['_value'] !== 'null')) {
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
  console.log(strKey, charPrevRow, strNextKey);
  let adjacentsToDown = 0;
  if (charRow < charLastRow) { // doesnt run if we currently in last row
    while ((charNextRow <= charLastRow) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
      adjacentsToDown = adjacentsToDown + 1;
      // adjacentsToDown.cellID = strNextKey;
      // adjacentsToDown._value = value;
      charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
      strNextKey = charNextRow + column
      //console.log("(in checkColumn )strNextKewy: strNextKey");
    }
  }

  return adjacentsToDown;

}



let checkDownArr = function(row, column, value) {
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
  //console.log(strKey, charPrevRow, strNextKey);
  let adjacentsToDownArr = [];
  if (charRow < charLastRow) { // doesnt run if we currently in last row
    while ((charNextRow <= charLastRow) && (gameboard[strNextKey]['_value'] !== '_null') && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value'])) {
      adjacentsToDownArr.push(strNextKey)
      // adjacentsToDown.cellID = strNextKey;
      // adjacentsToDown._value = value;
      charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
      strNextKey = charNextRow + column
      //console.log("(in checkColumn )strNextKewy: strNextKey");
    }
  }
  console.log(strNextKey, gameboard[strNextKey]['_value']);
  if ((strNextKey, gameboard[strNextKey]['_value']) === value) {
    return adjacentsToDownArr;
  } else {
    adjacentsToDownArr = []
    return adjacentsToDownArr;
  }


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
  console.log(`charRow = ${charRow}`);
  charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
  charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charPrevRow + column;
  console.log(strKey, charPrevRow, strNextKey);
  // debugger;
  let adjacentsToUp = 0;
  while ((charPrevRow >= "A") && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
    adjacentsToUp = adjacentsToUp + 1; //////
    charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
    strNextKey = charPrevRow + column
    //console.log("(in checkColumn )strNextKewy: " + strPrevKey);
  }
  return adjacentsToUp
}



let checkUpArr = function(row, column, value) {
  ////////////////////////////////////////////////////
  // These variables are repeated. But as they are ///
  // manipulated within the functions below I want to reset them before use
  ////////////////////////////////////////////////////
  console.log("checkUpArr has received row = " + row + " column = " + column + " value = " + value);
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
  console.log(strKey, charPrevRow, strNextKey);
  // debugger;
  let adjacentsToUpArr = [];
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

  //if ((charPrevRow >= "A") && (numNextColumn <= numColumns)) { //( (charPrevRow >= "A") && ( numNextColumn < columns))
    //debugger;

    while ((charPrevRow > "A") && (numNextColumn < numColumns) && (gameboard[strNextKey]['_value'] !== gameboard[strKey]['_value'])&& (gameboard[strNextKey]['_value'] !== 'null')) {
      adjacentsToNEArr.push(strNextKey)
      charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
      numNextColumn = numNextColumn + 1;
      strNextKey = charPrevRow + numNextColumn

    }
  //}
  if ((strNextKey, gameboard[strNextKey]['_value']) === value) {
    return adjacentsToNEArr;
  } else {
    adjacentsToUpArr = []
    return adjacentsToNEArr;
  }


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
  let adjacentsToNEArr = []

  if ((charPrevRow >= "A") && (numNextColumn <= numColumns)) { //( (charPrevRow >= "A") && ( numNextColumn < columns))
    //debugger;

    //console.log(strKey, charRow, numColumn, strNextKey, gameboard[strNextKey]['_value']);
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
  //if ( (charPrevRow >= "A") && ( numNextColumn <= numColumns)) { //( (charPrevRow >= "A") && ( numNextColumn < columns))
  //debugger;

  //console.log(strKey, charRow, numColumn, strNextKey, gameboard[strNextKey]['_value']);
  while ((charNextRow <= charLastRow) && (numNextColumn <= numColumns) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
    adjacentsToSE = adjacentsToSE + 1;
    charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
    numNextColumn = numNextColumn + 1;
    strNextKey = charNextRow + numNextColumn

  }
  return adjacentsToSE;
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
  charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
  ///////////////////////////////////////////////////////
  strNextKey = charNextRow + numNextColumn
  let adjacentsToSEArr = [];
  //if ( (charPrevRow >= "A") && ( numNextColumn <= numColumns)) { //( (charPrevRow >= "A") && ( numNextColumn < columns))
  //debugger;

  //console.log(strKey, charRow, numColumn, strNextKey, gameboard[strNextKey]['_value']);
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
  //if ( (charPrevRow >= "A") && ( numNextColumn <= numColumns)) { //( (charPrevRow >= "A") && ( numNextColumn < columns))
  //debugger;

  //console.log(strKey, charRow, numColumn, strNextKey, gameboard[strNextKey]['_value']);
  while ((charNextRow <= charLastRow) && (numPrevColumn > 0) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
    adjacentsToSW = adjacentsToSW + 1;
    charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
    numPrevColumn = numPrevColumn - 1;
    strNextKey = charNextRow + numPrevColumn

  }
  return adjacentsToSW;
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
  //if ( (charPrevRow >= "A") && ( numNextColumn <= numColumns)) { //( (charPrevRow >= "A") && ( numNextColumn < columns))
  //debugger;

  //console.log(strKey, charRow, numColumn, strNextKey, gameboard[strNextKey]['_value']);
  while ((charPrevRow >= "A") && (numPrevColumn > 0) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value'])) {
    adjacentsToNW = adjacentsToNW + 1;
    charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
    numPrevColumn = numPrevColumn - 1;
    strNextKey = charPrevRow + numPrevColumn

  }
  return adjacentsToNW;
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
}
