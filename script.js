let pressedKeys = [];
let previousPressedKeys = [];

window.onkeyup = function(e) {pressedKeys[e.code] = false;}
window.onkeydown = function(e) {pressedKeys[e.code] = true;}

const canvas = document.getElementById("game")

const startButton = document.getElementById("start")

const ui = document.getElementById("ui")
const timer = document.getElementById("timer")

let coinCounter = 0
const coinCounterEl = document.getElementById("coins")

let enemyCounter = 0
const enemyCounterEl = document.getElementById("enemies")

const resultsScreen = document.getElementById("results-vis")

const Player = {
    obj: document.getElementById("player"),
    vis: document.getElementById("player-graphics"),
    x: 50,
    y: 50,
    Xvelocity: 0.2,
    Yvelocity: 0.2 * (window.innerWidth / window.innerHeight),
    facing: 2,
    frozen: false // parar durante o ataque
}

let playerDefeated = false;

let playerRect; // colisão do jogador, definida depois

let swingTimeout;

let timerCountdown = 0;

let enemyRNG; // controla spawn de inimigos
let coinRNG; // controla spawn de moedas
let countdownID; // controla timer/spawns

// lidar com mais de um objeto ao mesmo tempo
let enemyID = 0;
let coinID = 0;

let enemyIDs = [] // elementos
let enemyRects = [] // colisões

let coinIDs = []
let coinRects = []

function draw(){ // coordenadas do jogador
    Player.obj.style.left = Player.x + "%"
    Player.obj.style.top = Player.y + "%"
}

function results(){ // game over ou vitória
    Player.obj.style.display = `none`;
    ui.style.display = `none`;

    resultsScreen.style.display = `block`;
    document.getElementById("coins-end").innerHTML = `Moedas coletadas: ${coinCounter}`
    document.getElementById("enemies-end").innerHTML = `Inimigos derrotados: ${enemyCounter}`

    coinCounter = 0
    enemyCounter = 0

    if (!playerDefeated) {
        document.getElementById("msg").innerHTML = `Você venceu!`
        document.getElementById("msg").style.color = `#00a1d7`
    } else {
        document.getElementById("msg").innerHTML = `Você morreu!`
        document.getElementById("msg").style.color = `#b82e00`
        playerDefeated = false;
    }

    document.querySelectorAll('.enemy').forEach(e => e.remove());
    enemyIDs = []
    enemyRects = []
    
    document.querySelectorAll('.coin').forEach(e => e.remove());
    coinIDs = []
    coinRects = []

    if (document.getElementById("swing") != null){
        document.getElementById("swing").remove()
    }
}

function reset(){
    resultsScreen.style.display = `none`;
    startButton.style.display = `block`;
}

function gameStart() { // sistemas que não podem ser repetidos instantaneamente
    timerCountdown = 60
    coinCounterEl.innerHTML = `Moedas: ${enemyCounter}`
    enemyCounterEl.innerHTML = `Inimigos: ${enemyCounter}`

    startButton.style.display = `none`;
    ui.style.display = `block`;

    // setup do jogador
    Player.obj.style.display = `block`;
    Player.vis.src = `assets/player-placeholder-down.jpg`
    Player.obj.style.top = `50%`; Player.obj.style.left = `50%`; Player.obj.style.transform = `translate(-50%, -50%)`
    Player.x = 50; Player.y = 50;

    timer.innerHTML = timerCountdown

    function countdownTimer() { // setup do timer
        countdownID = setInterval(countdown, 1000);
    }
    countdownTimer()

    function countdown() {
        timerCountdown -= 1
        timer.innerHTML = timerCountdown

        // spawn dos inimigos e moedas
        enemyRNG = Math.floor(Math.random() * 2); // 0-1
        coinRNG = Math.floor(Math.random() * 6); // 0-5

        if (timerCountdown > 0 && enemyRNG == 0) { // cria inimigos
            const Enemy = {
                obj: document.createElement("div"),
                vis: document.createElement("img")
            }

            Enemy.vis.src = `assets/enemy-placeholder.jpg`;
            Enemy.obj.setAttribute('class', 'enemy');
            Enemy.obj.setAttribute('id', `enemy-${enemyID}`);

            Enemy.obj.style.left = `calc(${Math.random() * 92}%`;
            Enemy.obj.style.top = `${Math.random() * 92}%`;

            canvas.appendChild(Enemy.obj)
            Enemy.obj.appendChild(Enemy.vis)
            
            enemyIDs.push(document.getElementById(Enemy.obj.id)) // elemento vai para um array

            let lastEnemyID = enemyIDs.slice(-1)[0]; // seleciona a última ID dentro do array
            let lastEnemyRect = lastEnemyID.getBoundingClientRect(); // captura as coordenadas do elemento q corresponde a essa ID

            enemyRects.push(lastEnemyRect)
            
            enemyID++;
        }

        if (timerCountdown > 0 && coinRNG == 0) { // cria moedas
            const Coin = {
                obj: document.createElement("div"),
                vis: document.createElement("img")
            }

            Coin.vis.src = `assets/coin-placeholder.jpg`;
            Coin.obj.setAttribute('class', 'coin');
            Coin.obj.setAttribute('id', `coin-${coinID}`);

            Coin.obj.style.left = `calc(${Math.random() * 92}%`;
            Coin.obj.style.top = `${Math.random() * 92}%`;

            canvas.appendChild(Coin.obj)
            Coin.obj.appendChild(Coin.vis)
            
            coinIDs.push(document.getElementById(Coin.obj.id)) // elemento vai para um array

            let lastCoinID = coinIDs.slice(-1)[0]; // seleciona a última id dentro do array
            let lastCoinRect = lastCoinID.getBoundingClientRect(); // captura as coordenadas do elemento q corresponde a essa ID

            coinRects.push(lastCoinRect)

            coinID++;
        }
    }
    gameLoop();
}

function gameLoop() {
    let playerRect = Player.obj.getBoundingClientRect(); // posição do jogador em pixels

    // movimento do personagem com setinhas
    if (!Player.frozen) { // !durante o ataque
        if (pressedKeys["ArrowUp"]) {
            previousPressedKeys = pressedKeys
            Player.y -= Player.Yvelocity
            Player.vis.src = `assets/player-placeholder-up.jpg`
            Player.facing = 0
        }
        if (pressedKeys["ArrowLeft"]) {
            previousPressedKeys = pressedKeys
            Player.x -= Player.Xvelocity
            Player.vis.src = `assets/player-placeholder-left.jpg`
            Player.facing = 1
        }
        if (pressedKeys["ArrowDown"]) {
            previousPressedKeys = pressedKeys
            Player.y += Player.Yvelocity
            Player.vis.src = `assets/player-placeholder-down.jpg`
            Player.facing = 2
        }
        if (pressedKeys["ArrowRight"]) {
            previousPressedKeys = pressedKeys
            Player.x += Player.Xvelocity
            Player.vis.src = `assets/player-placeholder-right.jpg`
            Player.facing = 3
        }
    }

    // personagem não pode sair da tela
    if (Player.x <= Player.obj.style.width * 2) { // esquerda
        Player.x = Player.obj.style.width * 2
    }
    if (Player.y <= Player.obj.style.width * 2) { // cima
        Player.y = Player.obj.style.width * 2
    }
    if (Player.x >= (100 - Player.obj.style.width * 2)) { // direita
        Player.x = 100 - Player.obj.style.width * 2
    }
    if (Player.y >= (100 - Player.obj.style.width * 2)) { // baixo
        Player.y = 100 - Player.obj.style.width * 2
    }

    if (pressedKeys["Space"] && !Player.frozen){ // ataque
        Player.frozen = true // jogador não pode se mover durante o ataque

        let Swing = {
            obj: document.createElement("div"),
            vis: document.createElement("img")
        }

        Swing.obj.setAttribute('id', "swing");

        switch(Player.facing){ // direção do ataque
        case 0:
            Swing.obj.style.width = "4vw"
            Swing.obj.style.height = "2.1666666vw"
            Swing.vis.src = `assets/swing-placeholder-h.jpg`

            Swing.obj.style.left = `calc(${Player.obj.style.left} - ${Swing.obj.style.width} / 2)`
            Swing.obj.style.top = `calc(${Player.obj.style.top} - ${Swing.obj.style.height} * 2)`

            canvas.appendChild(Swing.obj),
            Swing.obj.appendChild(Swing.vis)
            break;
        case 1:
            Swing.obj.style.width = "2.1666666vw"
            Swing.obj.style.height = "4vw"
            Swing.vis.src = `assets/swing-placeholder-v.jpg`

            Swing.obj.style.left = `calc(${Player.obj.style.left} - ${Swing.obj.style.width} * 2)`
            Swing.obj.style.top = `calc(${Player.obj.style.top} - ${Swing.obj.style.height} / 2)`

            canvas.appendChild(Swing.obj),
            Swing.obj.appendChild(Swing.vis)
            break;
        case 3:
            Swing.obj.style.width = "2.1666666vw"
            Swing.obj.style.height = "4vw"
            Swing.vis.src = `assets/swing-placeholder-v.jpg`

            Swing.obj.style.left = `calc(${Player.obj.style.left} + ${Swing.obj.style.width})`
            Swing.obj.style.top = `calc(${Player.obj.style.top} - ${Swing.obj.style.height} / 2)`

            canvas.appendChild(Swing.obj),
            Swing.obj.appendChild(Swing.vis)
            break;
        default:
            Swing.obj.style.width = "4vw"
            Swing.obj.style.height = "2.1666666vw"
            Swing.vis.src = `assets/swing-placeholder-h.jpg`

            Swing.obj.style.left = `calc(${Player.obj.style.left} - ${Swing.obj.style.width} / 2)`
            Swing.obj.style.top = `calc(${Player.obj.style.top} + ${Swing.obj.style.height})`

            canvas.appendChild(Swing.obj),
            Swing.obj.appendChild(Swing.vis)
            break;
        }

        let swingRect = Swing.obj.getBoundingClientRect(); // ataque destrói inimigos

        if (enemyRects.length >= 1) {
        for (let i = 0; i < enemyRects.length; i++){
            if (
                enemyRects[i] != undefined &&
                enemyRects[i].top < swingRect.bottom &&
                enemyRects[i].left < swingRect.right &&
                enemyRects[i].bottom > swingRect.top &&
                enemyRects[i].right > swingRect.left
            ) {
                enemyIDs[i].remove()
                delete enemyRects[i];

                enemyCounter += 1
                enemyCounterEl.innerHTML = `Inimigos: ${enemyCounter}`
                }
            }
        }   

        function clearSwingTimer(){ // tempo mínimo do ataque
            swingTimeout = setTimeout(clearSwing, 300)
        }

        clearSwingTimer()

        function clearSwing(){
            Swing.obj.remove();
            Player.frozen = false
            clearTimeout(swingTimeout)
        }
    }

    if (timer.innerHTML == 0) {
        clearInterval(countdownID)
    }

    // colisão entre o jogador e as moedas individuais
    if (coinRects.length >= 1) { // executar apenas depois que tiver pelo menos uma moeda viva
        for (let i = 0; i < coinRects.length; i++){ // executar uma vez para cada moeda dentro do array
            if (
                coinRects[i] != undefined &&
                coinRects[i].top < playerRect.bottom &&
                coinRects[i].left < playerRect.right &&
                coinRects[i].bottom > playerRect.top &&
                coinRects[i].right > playerRect.left
            ) {
                coinIDs[i].remove()
                delete coinRects[i];

                coinCounter += 1
                coinCounterEl.innerHTML = `Moedas: ${coinCounter}`
            }
        }
    }

    if (enemyRects.length >= 1) { // colisão dos inimigos com o jogador
        for (let i = 0; i < enemyRects.length; i++){
            if (
                enemyRects[i] != undefined &&
                enemyRects[i].top < playerRect.bottom &&
                enemyRects[i].left < playerRect.right &&
                enemyRects[i].bottom > playerRect.top &&
                enemyRects[i].right > playerRect.left
            ) {
                playerDefeated = true;
                results();
                timerCountdown = 0;
                return;
            }
        }
    }

    if (timerCountdown <= 0) { // fim do jogo
        results();
        return;
    }

    draw();
    requestAnimationFrame(gameLoop);
}