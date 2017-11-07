
$( document ).ready(function() {
    console.log( "screenstuff.js ready! OK use DOM" );

    let player1 = true;


// take the gameboard object and create a DOM version of HTML to display it...
strHTML = ""
    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < columns.length; j++) {
        str = rows[i] + columns[j];

        strRow = gameboard[str]._row;
        strColumn = gameboard[str]._column;
        strID = gameboard[str]._id;
        strValue = gameboard[str]._value;

        strHTML = strHTML + `<div class=\"cell ${strRow} ${strColumn} ${strValue}\" id=\"${strID}\"></div>`

        //$('#gamearea').append(strHTML);  // might need to come back to this to replace rather than aopoend?? - this might need to be a redraw every rtime kind of thing // apend is good to run at the end of each iteration. but to send the whole thing,
        // best to append to the string before sending to DOM.
        // this from planets ... $(stringID).html(stringDisplay).show();

      }
    }
$('#gamearea').html(strHTML).show()

// now for player interaction
$('.cell').on('click', function () {
  //x = this.innerHTML()
  // x = this.innerHTML ---- gives me the CONTENTS shown inthe box (testcxell ...)
  // x = $(this).html()  ---- gives me the CONTENTS shown inthe box (testcxell ...)
  // x = $(this).html
  // JOEL recomends using .data to add / remove info from tags. get more info and try
  strClass = $(this).attr('class')
  strID = $(this).attr('id')
  strRow = strID.slice(1,2)
  strColumn = strID.slice(2,3)

  if (strClass.search("null") > -1) {
    $(this).removeClass('_null')
    if (player1) {
      $(this).addClass('_black') // changes screen.
      gameplay.updateGameboard (strRow, strColumn, "_black")
      console.log("rows: " + gameplay.checkRow(strRow, strColumn, "_black"));
      console.log("columns: "+ gameplay.checkColumn (strRow, strColumn, "_black"));

    } else {
      $(this).addClass('_white')
      gameplay.updateGameboard (strRow, strColumn, "_white")
      console.log("row: " + gameplay.checkRow(strRow, strColumn, "_white"));
      console.log("columns: "+ gameplay.checkColumn (strRow, strColumn, "_white"));
    }
  } else {
    console.log("no");
  }





  player1 = !player1


}) // nd of on click
































}); // end wrapper for document.ready
