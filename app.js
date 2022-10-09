//*****************Game State*****************
let player1 = 'P1';

let player2 = 'P2';

let turn = player1;

let gameover = false;

 //row and column amount do not change
 const row = 6; // x
 const column = 7; // y
 

    //starting number to subtract column number from row
let gravity = [5, 5, 5, 5, 5, 5, 5]

//*************Name Selection ****************/

let submit = document.getElementById('enterNames')

function enterNames(){
    //Player 1 Name
    
    p1Plate = document.getElementById('idPlayer1')
    player1 = document.getElementById('p1Name').value;
    if(player1 == ""){
        p1Plate.innerHTML = 'Player 1';
        player1 = 'Player 1'
    }else{
        p1Plate.innerHTML = player1
    }
    
    //Player 2 Name
    
    p2Plate = document.getElementById('idPlayer2')
    player2 = document.getElementById('p2Name').value;
    if(player2 == ""){
        p2Plate.innerHTML = 'Computer'
        player2 ='Computer'
    }else{
        p2Plate.innerHTML = player2
    } 

    document.getElementById('gameSetup').style.display = 'none';
    turn = player1;
    gameStart();
}


//*******************BOARD********************

   
function gameStart (){
    //empty array to push the rows into
    board = []

    for (let x = 0; x < row; x++){
        let row =[]
        for( let y = 0; y < column; y++){
            row.push (" ");
            let circle = document.createElement('div');
            circle.id = x.toString() + y.toString();
            circle.classList.add('circle');
            circle.addEventListener('click', whoTurn);
            document.getElementById('board').append(circle);
        }
     board.push(row);
    
    }
}


  
//**************Place Player Piece****************

function whoTurn () {               //console.log ('clicked')
    //splits corrdinates up so gravity can be updated 
        let coordinate = this.id.split("");
        let x = parseInt(coordinate[0]);
        let y = parseInt(coordinate[1]);
        place([x,y])
  
}  



function place([xInt, yInt]){       
    let x = xInt
    let y = yInt 

    //when first piece is placed it subtracts 1 causing the piece to fall to bottom
    x = gravity[y];
    if (x < 0){
        return;
    }
    let p2Turn = document.getElementById('p2Turn')
    let p1Turn = document.getElementById('p1Turn')

    board[x][y] = turn;
    let circle = document.getElementById(x.toString() + y.toString());
    if (turn == player1) {
        circle.classList.add("p1color");
        turn = player2;
        p1Turn.innerHTML = '';
        p2Turn.innerHTML = 'Your Turn!!!';
    } else {
        circle.classList.add("p2color");
        turn = player1;
       p2Turn.innerHTML = '';
        p1Turn.innerHTML = 'Your Turn!!!';
    }
    //placed after because it was subtracting then placing the piece. now it placed piece then subtracts
    x -= 1;
    gravity[y] = x;

    console.log (gravity)
    
    checkForWin ();
    checkForDraw ();
    
    if(player2 == 'Computer' && turn == player2){
        circle = document.getElementsByClassName('circle');
        randomcircle = circle[Math.floor(Math.random() * circle.length)];
       console.log (randomcircle)
        let randomid = randomcircle.id.split("")
        let x = parseInt(randomid[0]);
        let y = parseInt(randomid[1]);
        console.log (randomid)
        place([x,y])
    }
}

//**************Reset Game Button*************** */

let reset = document.getElementById("reset");

// reset.addEventListener('click', resetGame())


function resetGame (){
    //reset game state
    gameover = false;
    turn = player1;
    gravity = [5, 5, 5, 5, 5, 5, 5];

    //grabs the board element and removed the child element
    let board = document.getElementById('board');
        while (board.firstChild){
            board.removeChild(board.firstChild)
        }
   
    //removes popup
    document.getElementById('popup').style.display = 'none';

    //resets game board
    gameStart()  
}


//******************Winning Conditions**********************

function checkForWin() {
    //Check Across -- check 00, 01, 02, 03 is Winner -- if class is equal in all 4 then game is over
    for (let x = 0; x < row; x++) {
        for (let y = 0; y < column; y++){
            if (board [x][y] != " "){
                if (board [x][y] == board [x][y + 1] 
                    && board [x][y + 1]== board [x][y + 2] 
                    && board [x][y + 2] == board [x][y + 3]){
                    winner(x,y);
                    return;
                }
            }

        }
    }

    //check Down -- check 00, 10, 20. 30 is Winner --subtract three from rows because of out of bounds error. trying to read circle out side of board.
    for (let y = 0; y < column; y++){ 
        for (let x = 0; x < row - 3; x++) {
            if (board [x][y] != " "){
                if (board[x][y] == board[x + 1][y] 
                    && board [x + 1][y] == board[x + 2][y] 
                    && board[x + 2][y] == board[x + 3][y]){
                    winner(x,y);
                    return;
                }
            }
        }
    }

    //Check Forward Diagonal -- check 00, 11, 22, 33 -- x coordinate checking out of bounds. y coordinate checking out of bounds. still out of bounds on 115:48
    for (let x = 0; x < row - 3; x++) {
        for (let y = 0; y < column - 3; y++){ 
            if (board [x][y] != " "){
                if (board[x][y] == board[x + 1][y + 1] 
                    && board [x + 1][y+ 1] == board[x + 2][y + 2] 
                    && board[x + 2][y + 2] == board[x + 3][y + 3]){
                    winner(x,y);
                    return;
                }
            }
        }
    }

    //Check Backward Diagonal -- check 50 , 41, 32, 23 -- column reading out of bounds on line 123:140. Break the lines for readablity. X coord has to start at 3 because it is making the lines less than 0
    for (let x = 3; x < row; x++) {
        for (let y = 0; y < column -3 ; y++){ 
            if (board [x][y] != " "){
                if (board[x][y] == board[x - 1][y + 1] 
                    && board [x - 1][y+ 1] == board[x - 2][y + 2] 
                    && board [x - 2][y + 2] == board[x - 3][y + 3]){
                    winner(x,y);
                    return;
                }
            }
        }
    }
    
}

function checkForDraw() {
   
    //check if 00, 01, 02, 03, 04, 05, 06 equal -1
    for (let x = 0; x < 1; x++) {
        for (let y = 0; y < column; y++){  
            if (board [x][y] != " "){
                if  (board[x][y - 1] == board[x][y - 2] 
                    && board [x][y - 2] == board[x][y - 3] 
                    && board [x][y - 3] == board[x][y - 4] 
                    && board [x][y - 4] == board[x][y - 5] 
                    && board [x][y - 5] == board[x][y - 6] 
                    && board [x][y - 6] == board[x][y - 7]){
                        let winner = document.getElementById('playerWinner');
                        winner.innerHTML = "It's a Draw!!!";
                        gameover = true;
                        document.getElementById('popup').style.display = 'block';
                }     
            }      
        }
    } 
}


//**************Winner Pop Up*************** */
function winner(x, y){
    
    let winner = document.getElementById('playerWinner')
    if (board[x][y] == player1) {
        winner.innerHTML = player1 + ' Wins!!!'            
    } else {
        winner.innerHTML = player2 + ' Wins!!!'
    }
    gameover = true;

    if (gameover == true){
        document.getElementById('popup').style.display = 'block';

    }

}
