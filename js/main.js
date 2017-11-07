console.log("testing ... main.js is conected");

///////////////////////////////////////////////////////////
/// create the game board /////////////////////////////////
const numRows = 3;
const strAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numColumns = 3;
let rows = [];
let columns = [];
gameboard = {};

for (var i = 1; i <= numColumns; i++) {
  columns.push(i)
}
for (var j = 1; j <= numRows; j++) {
  char = strAlphabet.slice(j-1,j)
  rows.push(char)
}

for (var i = 0; i < rows.length; i++) {
  for (var j = 0; j < columns.length; j++) {
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
///////////////////////////////////////////////////////////
// to refer to a square >> (eg) gameboard.A2.row = "A"

let updateGameboard = function (row, column, value) {
    strKey = row + column;
    gameboard[strKey]['_value'] = value;

} // gameboard object is now updated.



let checkForWin = function (row, column, value) {

    let a = checkRight(row, column, value)
    let b = checkLeft (row, column, value)

    let c = checkUp(row, column, value)
    let d = checkDown (row, column, value)

    let e = checkNorthEast(row, column, value)
    let f = checkSouthWest (row, column, value)

    let g = checkNorthWest(row, column, value)
    let h = checkSouthEast (row, column, value)

    if ((a + b + 1) >=3) {console.log(value + " wins")}
    if ((c + d + 1) >=3) {console.log(value + " wins")}
    if ((e + f + 1) >=3) {console.log(value + " wins")}
    if ((g + h + 1) >=3) {console.log(value + " wins")}

    // If (( checkRight(row, column, value) + checkLeft (row, column, value) + 1) >= 3) {
    //   console.log(" 3 in a row horizontal." + value + " wins.");
    // }
    //
    // If (( checkUp(row, column, value) + checkDown (row, column, value) + 1) >= 3) {
    //   console.log(" 3 in a row vertical." + value + " wins.");
    // }
    //
    // If (( checkNorthEast(row, column, value) + checkSouthWest (row, column, value) + 1) >= 3) {
    //   console.log(" 3 in a row diagonal." + value + " wins.");
    // }
    //
    // If (( checkNorthWest(row, column, value) + checkSouthEast (row, column, value) + 1) >= 3) {
    //   console.log(" 3 in a row diagonal." + value + " wins.");
    // }
}




// let checkForWin = function (row, column, value) {
//
//   If (( checkRight(row, column, value) + checkLeft (row, column, value) + 1) >= 3) {
//     console.log(" 3 in a row horizontal." + value + " wins.");
//   }
//
//   If (( checkUp(row, column, value) + checkDown (row, column, value) + 1) >= 3) {
//     console.log(" 3 in a row vertical." + value + " wins.");
//   }
//
//   If (( checkNorthEast(row, column, value) + checkSouthWest (row, column, value) + 1) >= 3) {
//     console.log(" 3 in a row diagonal." + value + " wins.");
//   }
//
//   If (( checkNorthWest(row, column, value) + checkSouthEast (row, column, value) + 1) >= 3) {
//     console.log(" 3 in a row diagonal." + value + " wins.");
//   }
//
//
// }




let checkRight = function (row, column, value) {
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
  adjacentsToRight = 0
  if (numColumn < numColumns) { // ie we dont run this section if click in rightest column
    while ( ((numNextColumn) <= numColumns) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ){
      adjacentsToRight = adjacentsToRight + 1;   ////////////////////////
      numNextColumn = numNextColumn + 1;
      strNextKey = row + numNextColumn
    }
  }
  return adjacentsToRight; // does not include the tile just placed.
}



let checkLeft = function (row, column, value) {
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
  while ( (numPrevColumn > 0) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ) {
    adjacentsToLeft = adjacentsToLeft + 1;   ////////////////////////
    numPrevColumn = numPrevColumn - 1;
    strNextKey = row + numPrevColumn;
  }
  return adjacentsToLeft;
}
    // return adjacents;
        //console.log("Left" + adjacentsToLeft);


let checkDown = function (row, column, value) {
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
  let adjacentsToDown = 0
  if (charRow < charLastRow) { // doesnt run if we currently in last row
    while ( (charNextRow <= charLastRow) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ) {
      adjacentsToDown = adjacentsToDown + 1;
      charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
      strNextKey = charNextRow + column
      //console.log("(in checkColumn )strNextKewy: strNextKey");
    }
  }
  return adjacentsToDown;
}

let checkUp = function (row, column, value) {
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
    while ( (charPrevRow >= "A") && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ) {
      adjacentsToUp = adjacentsToUp + 1;  //////
      charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
      strNextKey = charPrevRow + column
      //console.log("(in checkColumn )strNextKewy: " + strPrevKey);
    }
    return adjacentsToUp
  }



let checkNorthEast = function (row, column, value) { // checking to UP and RIGHT
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
  let adjacentsToNE = 0

  if ( (charPrevRow >= "A") && ( numNextColumn <= numColumns)) { //( (charPrevRow >= "A") && ( numNextColumn < columns))
  //debugger;

    //console.log(strKey, charRow, numColumn, strNextKey, gameboard[strNextKey]['_value']);
    while ( (charPrevRow >= "A") && ( numNextColumn <= numColumns) &&  (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ) {
      adjacentsToNE = adjacentsToNE + 1;
      charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
      numNextColumn = numNextColumn + 1;
      strNextKey = charPrevRow + numNextColumn

    }
  }
  return adjacentsToNE;
}



let checkSouthEast = function (row, column, value) { // checking to DOWN and RIGHT
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
    while ( (charNextRow <= charLastRow) && ( numNextColumn <= numColumns) &&  (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ) {
      adjacentsToSE = adjacentsToSE + 1;
      charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
      numNextColumn = numNextColumn + 1;
      strNextKey = charNextRow + numNextColumn

    }
      return adjacentsToSE;
  }





let checkSouthWest = function (row, column, value) { // checking to DOWN and LEFT
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
    while ( (charNextRow <= charLastRow) && ( numPrevColumn > 0) &&  (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ) {
      adjacentsToSW = adjacentsToSW + 1;
      charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
      numPrevColumn = numPrevColumn - 1;
      strNextKey = charNextRow + numPrevColumn

    }
    return adjacentsToSW;
  }



let checkNorthWest = function (row, column, value) { // checking to UP and LEFT
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
    while ( (charPrevRow >= "A") && ( numPrevColumn > 0) &&  (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ) {
      adjacentsToNW = adjacentsToNW + 1;
      charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
      numPrevColumn = numPrevColumn - 1;
      strNextKey = charPrevRow + numPrevColumn

    }
    return adjacentsToNW;
  }


//
// let checkForWin = function (row, column, value) {
//
//   If (( checkRight(row, column, value) + checkLeft (row, column, value) + 1) >= 3) {
//     console.log(" 3 in a row horizontal." + value + " wins.");
//   }
//
//   If (( checkUp(row, column, value) + checkDown (row, column, value) + 1) >= 3) {
//     console.log(" 3 in a row vertical." + value + " wins.");
//   }
//
//   If (( checkNorthEast(row, column, value) + checkSouthWest (row, column, value) + 1) >= 3) {
//     console.log(" 3 in a row diagonal." + value + " wins.");
//   }
//
//   If (( checkNorthWest(row, column, value) + checkSouthEast (row, column, value) + 1) >= 3) {
//     console.log(" 3 in a row diagonal." + value + " wins.");
//   }
//
//
// }

// checkColumn: function (row, column, value) {
//   let columnLength = 1;
//   strKey = row + column;
//   charRow = String(row);
//   charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
//   charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
//   charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
//   strNextKey = charNextRow + column;
//   strPrevKey = charPrevRow + column;
//
//   //console.log(strPrevKey, strKey, strNextKey);
//   //console.log(charPrevRow, charRow, charNextRow, charLastRow);
//   //console.log("prev: " + charPrevRow, "this: "+ charRow, "next: " + charNextRow, "last: " +charLastRow);
//
//   if (charRow < charLastRow) { // doesnt run if we currently in last row
//     //console.log("difection 1");
//     //console.log('checking while loop');
//     while ( (charNextRow <= charLastRow) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ) {
//       columnLength = columnLength + 1;
//       charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
//       strNextKey = charNextRow + column
//       //console.log("(in checkColumn )strNextKewy: strNextKey");
//     }
//   }
//
//   if (charRow >= "A") { //
//     //console.log("charRow: " + charRow);
//     //console.log("direction 2");
//     while ( (charPrevRow >= "A") && (gameboard[strPrevKey]['_value'] === gameboard[strKey]['_value']) ) {
//       columnLength = columnLength + 1;
//       charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
//       strPrevKey = charPrevRow + column
//       //console.log("(in checkColumn )strNextKewy: " + strPrevKey);
//     }
//   }
//
//   //console.log("column:" + columnLength);
//   return columnLength
// } // ewnd of checkColumn




  // checkRow: function (row, column, value) {
  //   let rowLength = 1; //initial value
  //   strKey = row + column;
  //   numColumn = +column;
  //   numNextColumn = numColumn + 1;
  //   numPrevColumn = numColumn - 1;
  //   strNextKey = row + numNextColumn;
  //   strPrevKey = row + numPrevColumn;
  //
  //   // console.log("starting check row");
  //   // console.log("strPrevKey: " + strPrevKey + " -- strKey: " + strKey + " -- strNextKey:" + strNextKey);
  //   //
  //
  //   // // first move from left to right >>>
  //   if (numColumn < numColumns) { // ie we dont run this section if click in rightest column
  //     while ( ((numNextColumn) <= numColumns) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ){
  //       rowLength = rowLength + 1;
  //       numNextColumn = numNextColumn + 1;
  //       strNextKey = row + numNextColumn
  //     }
  //   }
  //
  //   // then move right to left <<<<
  //   if (numColumn > 0) { // redundant (numColumn should always be > 0) ???
  //     while ( (numPrevColumn > 0) && (gameboard[strPrevKey]['_value'] === gameboard[strKey]['_value']) ) {
  //       rowLength = rowLength + 1;
  //       numPrevColumn = numPrevColumn - 1;
  //       strPrevKey = row + numPrevColumn;
  //     }
  //   }
  //
  //   return rowLength;
  //
  // }, // end of checkRow
