console.log("testing ... main.js is conected");

/// set board size. later we can make this more flexible, but for now, 3 x 3
const numRows = 5;
const strAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numColumns = 5;
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

// to refer to a square >> (eg) gameboard.A2.row = "A"

let gameplay = {
  updateGameboard: function (row, column, value) {
    strKey = row + column;
    gameboard[strKey]['_value'] = value;
    // console.log(gameboard);
  },
  checkRow: function (row, column, value) {
    let rowLength = 1; //initial value
    strKey = row + column;
    numColumn = +column;
    numNextColumn = numColumn + 1;
    numPrevColumn = numColumn - 1;
    strNextKey = row + numNextColumn;
    strPrevKey = row + numPrevColumn;

    // console.log("starting check row");
    // console.log("strPrevKey: " + strPrevKey + " -- strKey: " + strKey + " -- strNextKey:" + strNextKey);
    //

    // // first move from left to right >>>
    if (numColumn < numColumns) { // ie we dont run this section if click in rightest column
      while ( ((numNextColumn) <= numColumns) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ){
        rowLength = rowLength + 1;
        numNextColumn = numNextColumn + 1;
        strNextKey = row + numNextColumn
      }
    }

    // then move right to left <<<<
    if (numColumn > 0) { // redundant (numColumn should always be > 0) ???
      while ( (numPrevColumn > 0) && (gameboard[strPrevKey]['_value'] === gameboard[strKey]['_value']) ) {
        rowLength = rowLength + 1;
        numPrevColumn = numPrevColumn - 1;
        strPrevKey = row + numPrevColumn;
      }
    }

    return rowLength;

  }, // end of checkRow

  checkColumn: function (row, column, value) {
    let columnLength = 1;
    strKey = row + column;
    charRow = String(row);
    charNextRow = String.fromCharCode(charRow.charCodeAt() + 1)
    charPrevRow = String.fromCharCode(charRow.charCodeAt() - 1)
    charLastRow = String.fromCharCode("A".charCodeAt() + numRows - 1)
    strNextKey = charNextRow + column;
    strPrevKey = charPrevRow + column;

    //console.log(strPrevKey, strKey, strNextKey);
    //console.log(charPrevRow, charRow, charNextRow, charLastRow);
    //console.log("prev: " + charPrevRow, "this: "+ charRow, "next: " + charNextRow, "last: " +charLastRow);

    if (charRow < charLastRow) { // doesnt run if we currently in last row
      //console.log("difection 1");
      //console.log('checking while loop');
      while ( (charNextRow <= charLastRow) && (gameboard[strNextKey]['_value'] === gameboard[strKey]['_value']) ) {
        columnLength = columnLength + 1;
        charNextRow = String.fromCharCode(charNextRow.charCodeAt() + 1)
        strNextKey = charNextRow + column
        //console.log("(in checkColumn )strNextKewy: strNextKey");
      }
    }

    if (charRow >= "A") { //
      //console.log("charRow: " + charRow);
      //console.log("direction 2");
      while ( (charPrevRow >= "A") && (gameboard[strPrevKey]['_value'] === gameboard[strKey]['_value']) ) {
        columnLength = columnLength + 1;
        charPrevRow = String.fromCharCode(charPrevRow.charCodeAt() - 1)
        strPrevKey = charPrevRow + column
        //console.log("(in checkColumn )strNextKewy: " + strPrevKey);
      }
    }

    //console.log("column:" + columnLength);
    return columnLength
  } // ewnd of checkColumn

}
