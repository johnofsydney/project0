
let render = function () {
  strHTML = ""
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < columns.length; j++) {
          str = rows[i] + columns[j];

          strRow = gameboard[str]._row;
          strColumn = gameboard[str]._column;
          strID = gameboard[str]._id;
          strValue = gameboard[str]._value;

          strHTML = strHTML + `<div class=\"cell ${strRow} ${strColumn} ${strValue}\" id=\"${strID}\"></div>`

        }
      }
  $('#gamearea').html(strHTML).show()
}







///////////////////////////////////////////
$( document ).ready(function() {
    console.log( "screenstuff.js ready! OK use DOM" );

    let player1 = true;


// take the gameboard object and create a DOM version of HTML to display it...


render ();



$('.cell').on('click', function () {
  strClass = $(this).attr('class')
  strID = $(this).attr('id')
  strRow = strID.slice(1,2)
  strColumn = strID.slice(2,3)


    if (strClass.search("null") > -1) {
      $(this).removeClass('_null')
      if (player1) {
        $(this).addClass('_black') // changes screen.
        updateGameboard (strRow, strColumn, "_black")
        //render ();

        checkForWin(strRow, strColumn, "_black")

      } else {
        $(this).addClass('_white')
        updateGameboard (strRow, strColumn, "_white")
        //render ();

        checkForWin(strRow, strColumn, "_white")

        // console.log("white to right :" + checkRight(strRow, strColumn, "_white"));
        // console.log("white to left :" + checkLeft(strRow, strColumn, "_white"));
        // console.log("white to up :" + checkUp(strRow, strColumn, "_white"));
        // console.log("white to down :" + checkDown(strRow, strColumn, "_white"));
        // console.log("white to NE :" + checkNorthEast(strRow, strColumn, "_white"));
        // console.log("white to SE :" + checkSouthEast(strRow, strColumn, "_white"));
        // console.log("white to SW :" + checkSouthWest(strRow, strColumn, "_white"));
        // console.log("white to  NW :" + checkNorthWest(strRow, strColumn, "_white"));

      }
    } else {
      console.log("no");
    }

    player1 = !player1
    console.log(player1);
    //render ();
    //debugger;








})




// // now for player interaction
// $('.cell').on('click', function () {
//   // JOEL recomends using .data to add / remove info from tags. get more info and try
//   strClass = $(this).attr('class')
//   strID = $(this).attr('id')
//   strRow = strID.slice(1,2)
//   strColumn = strID.slice(2,3)
//
//   if (strClass.search("null") > -1) {
//     $(this).removeClass('_null')
//     if (player1) {
//       $(this).addClass('_black') // changes screen.
//       updateGameboard (strRow, strColumn, "_black")
//
//     } else {
//       $(this).addClass('_white')
//       updateGameboard (strRow, strColumn, "_white")
//
//     }
//   } else {
//     console.log("no");
//   }











































}); // end wrapper for document.ready
