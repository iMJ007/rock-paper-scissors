let score = 0;
let selectableOptions = document.querySelectorAll('#polygon .choiceContainer');
let results = document.querySelector('#results');
let polygon = document.querySelector('#polygon')
let userChoice = null;
let compChoice = null;
let playAgainButton = document.querySelector('.playAgainButton');
const scissors = ['paper', 'lizard'];
const paper = ['rock', 'spock'];
const rock = ['lizard', 'scissors'];
const lizard = ['paper', 'spock'];
const spock = ['scissors', 'rock'];
const whoBeatsWhoObject = {
    scissors,
    paper,
    rock,
    lizard,
    spock
};

function setUpChoiceSelectListener() {
    for (let choice of selectableOptions) {
        choice.onclick = () => {
            userChoice = choice.classList[1];
            let compSelection = selectableOptions[Math.floor(Math.random() * selectableOptions.length)];
            compChoice = compSelection.classList[1];
            triggerChoiceSelect(choice, 'userChoiceHolder', true);
            triggerChoiceSelect(compSelection, 'compChoiceHolder', false);
            let winLabel = document.querySelector('#playAgainContainer>h2');
            if (userChoice === compChoice) {
                winLabel.innerText = "It's a draw!";
            } else {
                if (checkWinner()) {
                    score++;
                    document.getElementById('score').innerText = score;
                    winLabel.innerText = 'You Win';
                } else {
                    winLabel.innerText = 'You Lose';
                }
                document.querySelector(`#${checkWinner() ? 'userChoiceHolder' : 'compChoiceHolder'}`).classList.add('winner');
            }
        }
    }
}

function triggerChoiceSelect(choice, choiceHolderId, toggleVisibilityNow) {
    if (toggleVisibilityNow) {
        toggleVisibility();
    }
    let chosenOption = choice.cloneNode(true);
    chosenOption.onclick = "";
    let choiceContainer = document.querySelector(`#${choiceHolderId}`);
    choiceContainer.replaceChildren(chosenOption);
    choiceContainer.classList.remove('winner');

    // clearChoiceListeners();
}


function toggleVisibility() {
    polygon.classList.toggle('hidden');
    results.classList.toggle('hidden');
}

function checkWinner() {
    // console.log(userChoice, compChoice);
    return whoBeatsWhoObject[userChoice].includes(compChoice);
}

playAgainButton.onclick = toggleVisibility;
setUpChoiceSelectListener();