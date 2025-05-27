let pressedKeys = [];
let previousPressedKeys = [];

window.onkeyup   = function(e) {pressedKeys[e.code] = false;}
window.onkeydown = function(e) {pressedKeys[e.code] = true;}

const canvas = document.getElementById("game")

console.log(window.innerWidth, window.innerHeight)

const Player = {
    obj: document.getElementById("player"),
    vis: document.getElementById("player-graphics"),
    x: 50,
    y: 50,
    Xvelocity: 0.2,
    Yvelocity: 0.2 * (window.innerWidth / window.innerHeight),
    facing: 2,
    frozen: false
}

/*let playerPixelPosition = {
    x: Player.obj.offsetLeft,
    y: Player.obj.offsetTop
};*/

let enemyID = 0;
let coinID = 0;

let swingTimeout;

const timer = document.getElementById("timer")

const startButton = document.getElementById("start")

let enemyRNG;
let coinRNG;
let countdownID;

const enemyIDs = []
const coinIDs = []

function draw(){ // coordenadas dos objetos
    Player.obj.style.left = Player.x + "%"
    Player.obj.style.top = Player.y + "%"
}

function gameStart() {
    startButton.style.display = `none`;
    timer.style.display = `block`;

    Player.obj.style.display = `block`;
    Player.vis.src = `assets/player-placeholder-down.jpg`
    Player.obj.style.top = `50%`; Player.obj.style.left = `50%`; Player.obj.style.transform = `translate(-50%, -50%)`

    timer.innerHTML = 99

    function countdownTimer() {
        countdownID = setInterval(countdown, 1000);
    }
    countdownTimer()

    function countdown() {
        timer.innerHTML = timer.innerHTML - 1
        enemyRNG = Math.floor(Math.random() * 4); // 0-3
        coinRNG = Math.floor(Math.random() * 8); // 0-7

        if (enemyRNG == 0) {
            const Enemy = {
                obj: document.createElement("div"),
                vis: document.createElement("img")
            }

            Enemy.vis.src = `assets/enemy-placeholder.jpg`;
            Enemy.obj.setAttribute('class', 'enemy');
            Enemy.obj.setAttribute('id', enemyID);

            Enemy.obj.style.left = `calc(${Math.random() * 92}%`;
            Enemy.obj.style.top = `${Math.random() * 92}%`;

            canvas.appendChild(Enemy.obj)
            Enemy.obj.appendChild(Enemy.vis)
            
            enemyIDs.push[enemyID]
            enemyID++;
        }

        if (coinRNG == 0) {
            const Coin = {
                obj: document.createElement("div"),
                vis: document.createElement("img")
            }

            Coin.vis.src = `assets/coin-placeholder.jpg`;
            Coin.obj.setAttribute('class', 'coin');
            Coin.obj.setAttribute('id', coinID);

            Coin.obj.style.left = `calc(${Math.random() * 92}%`;
            Coin.obj.style.top = `${Math.random() * 92}%`;

            canvas.appendChild(Coin.obj)
            Coin.obj.appendChild(Coin.vis)
            
            enemyIDs.push[coinID]
            coinID++;
        }
    }

    gameLoop();
}

function gameLoop() {
    // posição do jogador em pixels
    const playerRect = Player.obj.getBoundingClientRect;

    // movimento do personagem com setinhas
    if (!Player.frozen) {
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

    // ataque
    if (pressedKeys["Space"] && !Player.frozen){
        Player.frozen = true

        const Swing = {
            obj: document.createElement("div"),
            vis: document.createElement("img")
        }

        Swing.obj.setAttribute('id', "swing");

        switch(Player.facing){
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

        function clearSwingTimer(){
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

    // funções de atualização
    draw();
    requestAnimationFrame(gameLoop);
}