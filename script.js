// ideias
// jogo topdown
// personagem principal pode se mover em 8 direções e atacar em 4
// inimigos atiram projéteis para matar o jogador
// contador de fps para animações
let keysPressed = {}
window.onkeyup   = function(e) {keysPressed[e.key] = false;}
window.onkeydown = function(e) {keysPressed[e.key] = true;}

const Player = {
    obj: document.getElementById("player"),
    vis: document.getElementById("player-graphics"),
}

const timer = document.getElementById("timer")

const startButton = document.getElementById("start")

function gameStart() {
    startButton.style.display = `none`;
    timer.style.display = `block`;

    Player.obj.style.display = `block`;
    Player.obj.style.top = `50%`; Player.obj.style.left = `50%`; Player.obj.style.transform = `translate(-50%, -50%)`
    gameLoop();
}

function gameLoop() {
    /*
        if (keysPressed[`ArrowUp`]) {
            Player.obj.style.top = `calc($let Player.x}-1%)`
    }*/
}