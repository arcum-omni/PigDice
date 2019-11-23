/**
 * Displays current year (1999) in the copyright statement
 */
function getYear() {
    var today = new Date();
    var year = today.getFullYear();
    var spanMsg = document.getElementById("span");
    spanMsg.innerHTML = year.toString();
}
/**
 * Assigns values to page button clicks
 */
window.onload = function () {
    getYear(); // Get's current year for copyright statement
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
    var scoreToWin = 7; // Score required to win game
    document.getElementById("scoreToWin").innerHTML = scoreToWin.toString();
};
/**
 * Returns a random number between min & max inclusive
 * @param minValue minimum value for a die roll
 * @param maxValue maximum value for a die roll
 */
function generateRandomValue(minValue, maxValue) {
    return Math.floor(Math.random() * maxValue) + minValue;
}
/**
 * Swap players when a players turn is over,
 * set currentPlayerName to the next player
 */
function changePlayers() {
    var nameCurrentPlayer = document.getElementById("current").innerText;
    var namePlayer1 = document.getElementById("player1").value;
    var namePlayer2 = document.getElementById("player2").value;
    if (nameCurrentPlayer == namePlayer1) {
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
function createNewGame() {
    //set player 1 and player 2 scores to 0
    document.getElementById("score1").value = "0";
    document.getElementById("score2").value = "0";
    var namePlayer1 = document.getElementById("player1").value;
    var namePlayer2 = document.getElementById("player2").value;
    if (namePlayer1 == namePlayer2 || namePlayer1 == "" || namePlayer2 == "") {
        alert("Each player must have a unique name.");
    }
    else {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
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
function rollDie() {
    var minRoll = 1;
    var maxRoll = 6;
    var currTotal = parseInt(document.getElementById("total").value);
    var die = generateRandomValue(minRoll, maxRoll);
    if (die == 1) {
        alert("Oh no, you rolled a 1!!!\nYour turn is over.");
        currTotal = 0;
        document.getElementById("total").value = currTotal.toString();
        document.getElementById("die").value = "";
        changePlayers();
    }
    else {
        currTotal += die;
        document.getElementById("die").value = die.toString();
    }
    document.getElementById("total").value = currTotal.toString();
}
/**
 * Add current turn total to player's total score
 * reset turn total to zero
 * change players
 */
function holdDie() {
    document.getElementById("die").value = "";
    var currTotal = parseInt(document.getElementById("total").value);
    var nameCurrentPlayer = document.getElementById("current").innerText;
    var namePlayer1 = document.getElementById("player1").value;
    if (nameCurrentPlayer == namePlayer1) {
        currTotal += parseInt(document.getElementById("score1").value);
        document.getElementById("score1").value = currTotal.toString();
    }
    else {
        currTotal += parseInt(document.getElementById("score2").value);
        document.getElementById("score2").value = currTotal.toString();
    }
    var turnTotal = 0;
    document.getElementById("total").value = turnTotal.toString();
    whoWon();
    changePlayers();
}
/**
 * Determines The Winner
 */
function whoWon() {
    var scoreToWin = parseInt(document.getElementById("scoreToWin").innerText);
    var scorePlayer1 = parseInt(document.getElementById("score1").value);
    var scorePlayer2 = parseInt(document.getElementById("score2").value);
    var nameCurrentPlayer = document.getElementById("current").innerText;
    if (scorePlayer1 >= scoreToWin || scorePlayer2 >= scoreToWin) {
        document.getElementById("turn").classList.remove("open");
        alert(nameCurrentPlayer + " is the winner!!!");
        document.getElementById("player1").removeAttribute("disabled");
        document.getElementById("player2").removeAttribute("disabled");
    }
}
