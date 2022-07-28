let buttonDisplayed = 0;
let clickedButtons = 0;
let interval;
let round = 0;
let disableButtons = false;
let simonSays = [];
let life = 3;

const buttons = document.querySelectorAll('.buttons');
const tries = document.querySelectorAll('.tries')


buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(!disableButtons){
            if (button === simonSays[clickedButtons]) {
                button.classList.add('active');
                setTimeout(() => {
                    button.classList.remove('active');
                    clickedButtons ++;
                    console.log(clickedButtons);
                }, 200);
                setTimeout(() => {
                    if(clickedButtons == simonSays.length){
                        tries[simonSays.length - 1].classList.remove('wrong');
                        tries[clickedButtons - 1].classList.add('good');
                        round++;
                        if (round != 10) {
                            startRound();
                        }
                    }
                }, 400);
                if (round == 10) {
                    setTimeout(() => {
                        resetGame();
                    },600);
                }
            } else {
                button.classList.add('wrong');
                setTimeout(() => {
                    life--;
                    if(life == 0){
                        button.classList.remove('wrong');
                        return resetGame();
                    }
                    button.classList.remove('wrong');
                    resetRound();
                    tries[simonSays.length - 1].classList.add('wrong');
                }, 200);
            }
        }
    });
});

function randomButton() {
    simonSays.push(buttons[Math.floor(Math.random() * 8)]);
}

function display(i){
    if(i > simonSays.length - 1){
        clearInterval(interval);
        return disableButtons = false;
    }
    simonSays[i].classList.add('active');
    setTimeout(() =>{
        simonSays[i].classList.remove('active');
    },400);
}

function resetRound(){
    disableButtons = true;
    clickedButtons = 0;
    buttonDisplayed = 0;
    interval = setInterval(() => {
        display(buttonDisplayed);
        buttonDisplayed++;
    }, 1800);
}

function startRound(){
    randomButton();
    resetRound();
}

function resetGame(){
    round = 0;
    life = 3;
    simonSays = [];
    tries.forEach(element => {
        element.classList.remove('good', 'wrong');
    });
    startRound();
}


resetGame();
