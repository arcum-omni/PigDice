/**
 * Assigns values to page button clicks
 */
window.onload = function(){
    getYear(); // Get's current year for copyright statement

    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;

    let scoreToWin = 7; // Score required to win game
    document.getElementById("scoreToWin").innerHTML = scoreToWin.toString();
}

/**
 * Returns a random number between min & max inclusive
 * @param minValue minimum value for a die roll
 * @param maxValue maximum value for a die roll
 */
function generateRandomValue(minValue:number, maxValue:number):number{
    return Math.floor(Math.random() * maxValue) + minValue;
}

/**
 * Swap players when a players turn is over,
 * set currentPlayerName to the next player
 */
function changePlayers():void{
    let nameCurrentPlayer = document.getElementById("current").innerText;
    let namePlayer1 = (<HTMLInputElement>document.getElementById("player1")).value;
    let namePlayer2 = (<HTMLInputElement>document.getElementById("player2")).value;
    
    if(nameCurrentPlayer == namePlayer1){
        document.getElementById("current").innerText = namePlayer2;
        nameCurrentPlayer = namePlayer2;
    }
    else {
        document.getElementById("current").innerText = namePlayer1;
        nameCurrentPlayer = namePlayer1;
    }
}

/**
 * Initializes New Game:
 * set player scores to zero,
 * verify Players have unique names, &
 * starts the game
 */
function createNewGame(){
    //set player 1 and player 2 scores to 0
    (<HTMLInputElement>document.getElementById("score1")).value = "0";
    (<HTMLInputElement>document.getElementById("score2")).value = "0";

    let namePlayer1 = (<HTMLInputElement>document.getElementById("player1")).value;
    let namePlayer2 = (<HTMLInputElement>document.getElementById("player2")).value;
    if(namePlayer1 == namePlayer2 || namePlayer1 == "" || namePlayer2 == ""){
        alert("Each player must have a unique name.");
    }
    else{
        document.getElementById("turn").classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        document.getElementById("current").innerText = namePlayer1;
    }
}

/**
 * call generateRandomValue(minRoll, maxRoll)
 * If roll = 1,set current roll total to 0 & change players.
 * If roll > 1:
 * set die roll to value player rolled,
 * add die roll to current roll total, & 
 * display current roll total.
 */
function rollDie():void{
    let minRoll = 1;
    let maxRoll = 6;
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    let die = generateRandomValue(minRoll, maxRoll);

    if(die == 1){
        alert("Oh no, you rolled a 1!!!\nYour turn is over.");
        currTotal = 0;
        (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
        (<HTMLInputElement>document.getElementById("die")).value = "";
        changePlayers();
    }

    else{
        currTotal += die;
        (<HTMLInputElement>document.getElementById("die")).value = die.toString(); 
    }

    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
}

/**
 * Add current turn total to player's total score
 * reset turn total to zero
 * change players
 */
function holdDie():void{
    (<HTMLInputElement>document.getElementById("die")).value = "";

    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    let nameCurrentPlayer = document.getElementById("current").innerText;
    let namePlayer1 = (<HTMLInputElement>document.getElementById("player1")).value;

    if(nameCurrentPlayer == namePlayer1){
        currTotal += parseInt((<HTMLInputElement>document.getElementById("score1")).value); 
        (<HTMLInputElement>document.getElementById("score1")).value = currTotal.toString(); 
    }
    else{   
        currTotal += parseInt((<HTMLInputElement>document.getElementById("score2")).value); 
        (<HTMLInputElement>document.getElementById("score2")).value = currTotal.toString(); 
    }

    let turnTotal = 0;
    (<HTMLInputElement>document.getElementById("total")).value = turnTotal.toString();

    whoWon();
    changePlayers();
}

/**
 * Determines The Winner
 */
function whoWon():void{
    let scoreToWin = parseInt(document.getElementById("scoreToWin").innerText);
    let scorePlayer1 = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let scorePlayer2 = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
    let nameCurrentPlayer = document.getElementById("current").innerText;
    
    if(scorePlayer1 >= scoreToWin || scorePlayer2 >= scoreToWin){
        document.getElementById("turn").classList.remove("open");
        alert(nameCurrentPlayer + " is the winner!!!")
        document.getElementById("player1").removeAttribute("disabled");
        document.getElementById("player2").removeAttribute("disabled");
    }
}