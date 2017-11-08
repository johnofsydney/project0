
let render = function () {
  let strHTML = ""
      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < columns.length; j++) {
          let str = rows[i] + columns[j];

          let strRow = gameboard[str]._row;
          let strColumn = gameboard[str]._column;
          let strID = gameboard[str]._id;
          let strValue = gameboard[str]._value;

          strHTML = strHTML + `<div class=\"cell ${strRow} ${strColumn} ${strValue}\" id=\"${strID}\"></div>`

        }
      }
      console.log(`strHTML = ${strHTML}`);

  $('#gamearea').html(strHTML).show()
}







///////////////////////////////////////////
$( document ).ready(function() {
    console.log( "screenstuff.js ready! OK use DOM" );

    let player1 = true;


// take the gameboard object and create a DOM version of HTML to display it...


  render ();


  // jquery event delegation
  $('#gamearea').on('click', '.cell', function () {
    console.log("click");
    let strClass = $(this).attr('class')
    let strID = $(this).attr('id')
    let strRow = strID.slice(1,2)
    let strColumn = strID.slice(2,3)

      if (strClass.search("null") > -1) {

        //$(this).removeClass('_null')
        if (player1) {
          //$(this).addClass('_black') // changes screen.
          updateGameboard (strRow, strColumn, "_black")
          render ();
          checkForWin(strRow, strColumn, "_black")

        } else {
          //$(this).addClass('_white')
          updateGameboard (strRow, strColumn, "_white")
          render ();
          checkForWin(strRow, strColumn, "_white")

        }
      } else {
        console.log("Cant go in occupied square");
      }

      player1 = !player1
      console.log(player1);


  })



}); // end wrapper for document.ready
