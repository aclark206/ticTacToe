// selectors & global variables
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
var turn = "O";  //Holds whose turn it is.  Will either be O or X.  At start is O.
const board = document.querySelector(".boxes");
const startDiv = document.getElementById("start");
const winDiv = document.getElementById("finish");
const boardDiv = document.getElementById("board");
const startButton = document.getElementById("startButton");
const newGameButton = document.getElementById("newGameButton");
const winMsg = document.querySelector(".message");
const boxes = document.querySelectorAll(".box");

var gameBoard = [
[" "," "," "],
[" "," "," "],
[" "," "," "]
];
var numTurns = 0;  	// keeps track of how many turns there have been. Used to test for ties.


/*   On hover over box  */
board.addEventListener("mouseover", (e) => {
	
	if (!e.target.classList.contains('marked')){
		// get X or O background image depending on whose turn it is
		(turn === "O")? e.target.style.backgroundImage = "url(./img/o.svg)":
						e.target.style.backgroundImage = "url(./img/x.svg)";
	}
});

/*   On hover over box  */
board.addEventListener("mouseout", (e) => {
	// remove the hover-over background image
	
	e.target.style.backgroundImage = "";
});



function turnOver() {
	if (turn === "O"){
		turn = "X" 
		player1.classList.remove("active");
		player2.classList.add("active");
	}
	else {	
		turn = "O";
		player2.classList.remove("active");
		player1.classList.add("active");
	}
	
}

function newGame(){
	//show the tic tac toe board
	boardDiv.style.display = "block";
	
	//hide the start game screen
	startDiv.style.display = "none";
	
	//hide the win screen
	winDiv.style.display = "none";	
	
	// at the start of a new game, it is Os turn
	// Os box is highlighted
	player1.classList.add("active");
	player2.classList.remove("active");
	turn = "O";
}
/* shows the start screen with a button to launch a new game */
function startScreen(){
	
	//hide the tic tac toe board
	boardDiv.style.display = "none";
	
	//show the start game screen
	startDiv.style.display = "block";
	
	//hide the win screen
	winDiv.style.display = "none";
}

/* 
	marks the board after an X or O is placed
   location = location on grid of the X or O being placed
			  must be a number 1 - 9 
		    = 1 2 3
			  4 5 6
			  7 8 9 
  */
function markBoard(location){

	switch (location){
			case "1":
				gameBoard[0][0] = turn;
				break;
			case "2":
				gameBoard[0][1] = turn;
				break;
			case "3":
				gameBoard[0][2] = turn;
				break;
			case "4":
				gameBoard[1][0] = turn;
				break;
			case "5":
				gameBoard[1][1] = turn;
				break;
			case "6":
				gameBoard[1][2] = turn;
				break;
			case "7":
				gameBoard[2][0] = turn;
				break;
			case "8":
				gameBoard[2][1] = turn;
				break;
			case "9":
				gameBoard[2][2] = turn;
				break;
			default:
				console.log("Error markBoard function: invalid location");
		} //end switch
}// end markBoard function

/*
	Checks to see if anyone has yet won.
	returns true the game is won, false if not yet.
*/
function checkWin(){
	if (
		// horizontal wins
		(((gameBoard[0][0]!= " ") && (gameBoard[0][0]== gameBoard[0][1])) &&  (gameBoard[0][1]== gameBoard[0][2])) ||
		(((gameBoard[1][0]!= " ") && (gameBoard[1][0]== gameBoard[1][1])) &&  (gameBoard[1][1]== gameBoard[1][2])) ||
		(((gameBoard[2][0]!= " ") && (gameBoard[2][0]== gameBoard[2][1])) &&  (gameBoard[2][1]== gameBoard[2][2])) ||
		//vertical wins
		(((gameBoard[0][0]!= " ") && (gameBoard[0][0]== gameBoard[1][0])) &&  (gameBoard[1][0]== gameBoard[2][0])) ||
		(((gameBoard[0][1]!= " ") && (gameBoard[0][1]== gameBoard[1][1])) &&  (gameBoard[1][1]== gameBoard[2][1])) ||
		(((gameBoard[0][2]!= " ") && (gameBoard[0][2]== gameBoard[1][2])) &&  (gameBoard[1][2]== gameBoard[2][2])) ||
		//diagonal wins
		(((gameBoard[0][0]!= " ") && (gameBoard[0][0]== gameBoard[1][1])) &&  (gameBoard[1][1]== gameBoard[2][2])) ||
		(((gameBoard[2][0]!= " ") && (gameBoard[2][0]== gameBoard[1][1])) &&  (gameBoard[1][1]== gameBoard[0][2]))	
		){
		return true;
		}
	else {
		return false;
	}
	
}// end function checkWin

function checkTie(){

	if (numTurns == 9)
		return true;
	else
		return false;
}

/*
 Displays the Win screen
 the parameter winner should be:
	true if either X or O won the game or 
	false if the game ended in a tie
	
 */
function gameOver(winner){
		
	//hide the tic tac toe board
	boardDiv.style.display = "none";
	
	//hide the start game screen
	startDiv.style.display = "none";
	
	//show the win screen
	winDiv.style.display = "block";
	
	if(winner){
		if (turn == "O"){
			winDiv.classList.add("screen-win-one");
		}
		else  {// turn == X
			winDiv.classList.add("screen-win-two");
		}
		winMsg.textContent = "Winner";
	}
	else{
		winDiv.classList.add("screen-win-tie");
		winMsg.textContent = "It's a draw";
	}
	
}
/*
	clears the gameboard for a new game
*/
function clearBoard(){
	// clear the virtual board
	gameBoard = [
	[" "," "," "],
	[" "," "," "],
	[" "," "," "]
	];
	
	// clear the visual board
	for(let i = 0; i < boxes.length; i++){
		boxes[i].className = "";
		boxes[i].classList.add("box");
	}
	
	// clear number of turns count
	numTurns = 0;
	
	//clear Win Screen
	winDiv.className = "screen screen-win";
	
	//clear 
}
	

/* on Click a box */
board.addEventListener("click", (e) => {

	if (!e.target.classList.contains('marked')){
		if (turn === "O"){
			e.target.classList.add("box-filled-1", "marked");
		}
		else {	
			e.target.classList.add("box-filled-2", "marked");
		}
		markBoard(e.target.id);
		numTurns+=1;
		
		// check to see if anyone won or if it's a tie
		if (checkWin()){
			//display the Game Over Screen
			gameOver(true);
		}
		else if (checkTie()){ 
			gameOver(false);
		}
		else {
			// else continue play
			turnOver();
		}
	}
});

// on click button
startButton.addEventListener("click", (e) => {
	newGame();
});

newGameButton.addEventListener("click", (e) => {
	clearBoard();
	newGame();
});

/* * - * - * - *  Main  * - * - * - */
startScreen();





