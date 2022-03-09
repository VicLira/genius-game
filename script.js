const main = document.querySelector('.main');
const nightModeButton = document.querySelector('.night-mode-button');

let order = [];
let clickedOrder = [];
let score = 0;
const scoreElemente = document.getElementById('score');

//0 - green
//1 - red
//2 - yellow
//3 - blue

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

const btnStart = document.querySelector('.start');

//Cria uma ordem aleatória de cores
const shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1)
    };
};



//Acende a proxima cor
const lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');

        setTimeout(() => {
            element.classList.remove('selected');
        }, 300)

    }, number - 250);
};



//Checa se os botoes clicados são os mesmos da ordem gerada
const checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        };
    };
    if(clickedOrder.length == order.length) {
        //alert(`Score: ${score}\n Great! Starting Next Level!`);
        alert(`You got it! Next Level`);
        scoreElemente.innerHTML = score;
        nextLevel();
    };
};

//função para clique do usuario
const click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 200);
};

//função que retorna a cor
const createColorElement = (color) => {
    if(color === 0) {
        return green;
    } else if(color === 1) {
        return red;
    } else if(color === 2) {
        return yellow;
    } else if (color === 3) {
        return blue;
    }
    
};

//Função para proximo level do jogo
const nextLevel = () => {
    score++;
    shuffleOrder();
};

//Função para game over
const gameOver = () => {
    alert(`Pontuação: ${score}!\n YOU LOSE!!!\n Clique em OK para iniciar novo jogo.`);
    order = [];
    clickedOrder = [];
    playGame();
};

const playGame = () => {
    alert('Bem-vindo ao Genius! Iniciando novo jogo!');
    score = 0;

    nextLevel();
};

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

btnStart.addEventListener('click', playGame)

/* THEMES */

nightModeButton.onclick = () => {
    main.classList.toggle('night-mode');
    main.classList.toggle('day-mode');
};

