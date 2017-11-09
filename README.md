# Project 0 - Tic tac Toe

Week long project to implement Tic Tac Toe, using HTML, CSS and Javascript. As time permits, additional features can be added.

## To Play the game(s)

Enter the required number of rows and columns and press he start button.
### if total number of squares <= 16, the game will be Tic Tac Toe. The winner is the first get three squares in a straight line.
### if 17 < squares < 63 the game will be Connect 4. The winner is the first to get four squares in a straight line.
### if squares >= 64 the game will be Othello (aka Reversi). The winner is the player with the most squares at the end of the game.

## HTML
The main HTML page contains the input boxes and the start button.
It also contains empty divs which are later populated by JavaScript.

## CSS
The main function of the CSS is to layout the dimensions and colors of the gameboard. The HTML of the gameboard is created in JavScript, and includes classes specifying Row, Column and Value (Black / White/ Blank).
The CSS specifies the TOP and HEIGHT of each ROW, the LEFT and WIDTH of each COLUMN and the BACKGROUND-COLOR for each value.

## JAVASCRIPT (summary)

### Common to all
Create a 2D object containing all rows, columns and values.
Use loops to create an HTML string of the object, which is rendered in the DOM using JQuery.
Use JQuery click event to select clicked in cell.

### Tic Tac Toe
Count to three in a straight line.

### Connect 4
Drop the clicked in cell if there's empty cells beneath.
Then count to four in a straight line

### Othello
Flip any of your opponents tiles between the tile you just placed and your next tile in a stright line.

## Things remaining
AI for any / all games
Rules for tile placement in othello
Tile counter / win checker for othello
