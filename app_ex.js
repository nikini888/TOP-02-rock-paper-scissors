const listChoice = ['rock', 'paper', 'scissors']
let playerScore = 0;
let computerScore = 0;
//transform text
function transform(str) {
    const newStr = str.toLowerCase().replace(str[0], str[0].toUpperCase())
    return newStr;
}
//Random computer play
const computerPlay = function () {
    const randNum = Math.floor(Math.random() * (listChoice.length - 1));
    return listChoice[randNum]
}
//Playler choice
const playerChoice = function () {
    let keepGoing = true;
    let playerType;
    while (keepGoing) {
        playerType = prompt('Rock, Paper or Scissors?')
        if (listChoice.includes(playerType.toLowerCase())) {
            keepGoing = false;
            return playerType;
        }
    }
}
function game() {
    playerScore = 0;
    computerScore = 0;
    for (let i = 0; i < 5; i++) {
        const playerSelection = playerChoice()
        const computerSelection = computerPlay()
        playRound(playerSelection.toLowerCase(), computerSelection);
    }
    console.log(`Your score: ${playerScore} : Compurter score: ${computerScore}`)
    if (playerScore > computerScore) {
        console.log('YOU WIN!!!')
    } else if (playerScore < computerScore) {
        console.log('YOU LOSE!!!')
    } else {
        console.log('YOU DRAW!!!')
    }
}
game()

function playRound(player, computer) {
    if (player === computer) {
        playerScore += 1;
        computerScore += 1;
        console.log(`You draw! ${transform(player)}`);
        console.log(`Your score: ${playerScore} : Compurter score: ${computerScore}`)
    } else if ((player === "rock" && computer === "scissors") || (player === "paper" && computer === "rock") || (player === "scissors" && computer === "paper")) {
        playerScore += 1;
        console.log(`You win! ${transform(player)} beats ${transform(computer)}`);
        console.log(`Your score: ${playerScore} : Compurter score: ${computerScore}`)
    } else {
        computerScore += 1;
        console.log(`You Lose! ${transform(computer)} beats ${transform(player)}`);
        console.log(`Your score: ${playerScore} : Compurter score: ${computerScore}`)
    }
}