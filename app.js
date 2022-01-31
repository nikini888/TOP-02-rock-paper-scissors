let start = false;
let playerScore = 0;
let computerScore = 0;
let playerSelection = null;
let randNum = 0;

const btnStart = document.querySelector('.start');

const sectionGetname = document.querySelector('.getname');
const sectionControl = document.querySelector('.control');

const inputName = document.querySelector('.input__name');
const btnInputName = document.querySelector('.btn--getname');

const playerScoreShow = document.querySelector('.player__scord');
const computerScoreShow = document.querySelector('.computer__scord');

const descriptionText = document.querySelector('.fight__description--text');
const roundResult = document.querySelector('.result');
const fightPlayerIcon = document.querySelector('.fight--player')
const fightComputerIcon = document.querySelector('.fight--computer')

const popupShow = document.querySelector('.popup');

const listChoices = [
    { select: 'rock', img: './img/rock.png' },
    { select: 'paper', img: './img/papper.png' },
    { select: 'scissors', img: './img/scissors.png' },
]

const anouce = {
    win:
        { result: 'You win!', img: './img/win.png' },
    lose:
        { result: 'You lose!', img: './img/lose.png' },
}

function unhideElement(element) {
    element.classList.remove('hidden')
}
function hideElement(element) {
    element.classList.add('hidden')
}

//transform text
function transform(str) {
    const newStr = str.toLowerCase().replace(str[0], str[0].toUpperCase())
    return newStr;
}

//Random computer choice
function computerChoice() {
    randNum = Math.floor(Math.random() * (listChoices.length - 1));
    return listChoices[randNum].select
}

//Playler choice
document.querySelectorAll('.select').forEach(btnSelect => {
    btnSelect.addEventListener('click', () => {
        if (!start) {
            return
        }
        fightPlayerIcon.parentNode.style.backgroundColor = ''
        fightComputerIcon.parentNode.style.backgroundColor = ''
        playerSelection = btnSelect.dataset.choice;
        game()
    })
    btnSelect.addEventListener('mouseover', () => {
        addPointer(start, btnSelect)
        btnSelect.classList.add('selected')
    })
})

//start game
btnStart.addEventListener('click', () => {
    setUpStart()
    hideElement(btnStart)
    unhideElement(sectionGetname)
})
//start again
document.querySelector('.startagain').addEventListener('click', () => {
    setUpRestart()
    unhideElement(sectionGetname)
    hideElement(sectionControl)
})
//player name
btnInputName.addEventListener('click', () => {
    if (!inputName.value) {
        return
    }
    document.querySelector('.board__name--player').textContent = inputName.value
    hideElement(sectionGetname)
    unhideElement(sectionControl)
})
document.querySelector('.playagain', () => {
    hideElement(popupShow)
})
//add pointer efect
function addPointer(value, btn) {
    if (value) {
        btn.classList.add('pointer')
        return
    }
    btn.classList.remove('pointer')
}

btnInputName.addEventListener('mouseover', () => {
    addPointer(inputName.value, btnInputName)
})

//compare computer and player choice
function playRound(player, computer) {
    if (player === computer) {
        roundResult.textContent = "Draw!"
        descriptionText.textContent = `${transform(player)} vs ${transform(computer)}`
    } else if ((player === "rock" && computer === "scissors") || (player === "paper" && computer === "rock") || (player === "scissors" && computer === "paper")) {
        playerScore += 1;
        playerScoreShow.textContent = playerScore
        fightPlayerIcon.parentNode.style.backgroundColor = "yellow"
        console.log(fightPlayerIcon.parentNode)
        roundResult.innerText = "You won!"
        descriptionText.textContent = `${transform(player)} beats ${transform(computer)}`
    } else {
        computerScore += 1;
        computerScoreShow.textContent = computerScore
        fightComputerIcon.parentNode.style.backgroundColor = "yellow"
        console.log(fightComputerIcon.parentNode.backgroundColor)
        roundResult.textContent = "You losed! "
        descriptionText.textContent = `${transform(computer)} beats ${transform(player)}`
    }
}

//game
function game() {
    playRound(playerSelection, computerChoice())
    changeIcon()
    if (playerScore >= 5 || computerScore >= 5) {
        start = false;
        popupShow.classList.remove('hidden')
        if (playerScore >= 5) {
            popupShowAnouce(anouce.win)
        } if (computerScore >= 5) {
            popupShowAnouce(anouce.lose)
        }
    }
}

function popupShowAnouce(result) {
    document.querySelector('.anouce').firstElementChild.textContent = result.result
    document.querySelectorAll('.popup__img').forEach(img => {
        img.firstElementChild.src = result.img
    })
}
function changeIcon() {
    fightComputerIcon.src = listChoices[randNum].img
    listChoices.forEach(choice => {
        if (playerSelection === choice.select) {
            fightPlayerIcon.src = choice.img
            return;
        }
    })
}
function setUpStart() {
    playerScore = 0
    computerScore = 0
    playerScoreShow.textContent = '0'
    computerScoreShow.textContent = '0'
    start = true;
}
function setUpRestart() {
    fightPlayerIcon.parentNode.style.backgroundColor = ''
    fightComputerIcon.parentNode.style.backgroundColor = ''
    fightComputerIcon.src = './img/bluequestion.png'
    fightPlayerIcon.src = './img/redquestion.png'
    roundResult.textContent = 'Go!'
    descriptionText.textContent = `Choice your weapon!`
}
//playagain
document.querySelector('.playagain').addEventListener('click', () => {
    hideElement(popupShow)
    setUpStart()
    setUpRestart()
})