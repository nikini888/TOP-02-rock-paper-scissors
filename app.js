let endGame = false;
let playerScore = 0;
let computerScore = 0;
let playerSelection = '';
let computerSelection = '';
let interval;
let i = 0;

const btnChoices = document.querySelectorAll('.btn__choice');
const btnStart = document.querySelector('.btn.start');
const numCount = document.querySelector('.count--num');
console.log(numCount)
const listChoices = ['rock', 'paper', 'scissors']

//transform text
function transform(str) {
    const newStr = str.toLowerCase().replace(str[0], str[0].toUpperCase())
    return newStr;
}

//Random computer choice
const computerChoice = function () {
    const randNum = Math.floor(Math.random() * (listChoices.length - 1));
    return listChoices[randNum]
}
//Playler choice
const playerChoice = function () {
    let playerBtnSelec = '';
    btnChoices.forEach(btnChoice => {
        btnChoice.addEventListener('click', () => {
            playerBtnSelec = btnChoice.dataset.choice
        })
    })
    return playerBtnSelec;
}

//compare computer and player choice
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


btnStart.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;

    while (playerScore < 5 && computerScore < 5) {
        playerSelection = playerChoice()
        while (!playerSelection) {
            interval = setInterval(count, 1000)
        }
        playRound(playerSelection, computerSelection);
    }
})

function count() {
    if (i >= 10 || playerSelection) {
        computerSelection = computerChoice()
        i = 0;
        clearInterval(interval);
    } else {
        i++;
        numCount.textContent = i;
        console.log(i)
    }
}

