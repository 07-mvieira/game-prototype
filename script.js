// ideias
// jogo topdown
// personagem principal pode se mover em 8 direções e atacar em 4
// inimigos atiram projéteis para matar o jogador
// contador de fps para animações
const fps = 1000/90; // para cada 1000 ms, 90 atualizações

let pressedKeys = [];
let previousPressedKeys = [];

window.onkeyup   = function(e) {pressedKeys[e.code] = false;}
window.onkeydown = function(e) {pressedKeys[e.code] = true;}

const canvas = document.getElementById("game")

const Player = {
    obj: document.getElementById("player"),
    vis: document.getElementById("player-graphics"),
    x: 50,
    y: 50,
    Xvelocity: 0.2,
    Yvelocity: 0.2 * (window.innerWidth / window.innerHeight),
    facing: 2
}

const timer = document.getElementById("timer")

const startButton = document.getElementById("start")

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
    gameLoop();
}

function gameLoop() {
    // movimento do personagem com setinhas
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

    // personagem não pode sair da tela
    if (Player.y >= 96) {
        Player.y = 96
    }

    // ataque
    if (pressedKeys["Space"]){
        const Swing = {
            obj: document.createElement("div"),
            vis: document.createElement("img")
        }
        
        Swing.obj.setAttribute('id', "swing");
        
        switch(Player.facing){
        case 0:
            console.log("facing up!")
            Swing.obj.style.width = "4vw"
            Swing.obj.style.height = "2.1666666vw"
            Swing.vis.src = `assets/swing-placeholder-up.jpg`

            Swing.obj.style.left = Player.x
            Swing.obj.style.top = Player.y - Swing.obj.style.height

            canvas.appendChild(Swing.obj),
            Swing.obj.appendChild(Swing.vis)
            break;
        case 1:
            console.log("facing left!")
            Swing.obj.style.width = "2.1666666vw"
            Swing.obj.style.height = "4vw"
            Swing.vis.src = `assets/swing-placeholder-left.jpg`

            Swing.obj.style.left = Player.x - Swing.obj.style.width
            Swing.obj.style.top = Player.y

            canvas.appendChild(Swing.obj),
            Swing.obj.appendChild(Swing.vis)
            break;
        case 3:
            console.log("facing right!")
            Swing.obj.style.width = "2.1666666vw"
            Swing.obj.style.height = "4vw"
            Swing.vis.src = `assets/swing-placeholder-right.jpg`

            Swing.obj.style.left = Player.x
            Swing.obj.style.top = Player.y + Player.obj.style.height + Swing.obj.style.height

            canvas.appendChild(Swing.obj),
            Swing.obj.appendChild(Swing.vis)
            break;
        default:
            console.log("facing down!")
            Swing.obj.style.width = "4vw"
            Swing.obj.style.height = "2.1666666vw"
            Swing.vis.src = `assets/swing-placeholder-down.jpg`

            Swing.obj.style.left = Player.x
            Swing.obj.style.top = Player.y - Swing.obj.style.height

            canvas.appendChild(Swing.obj),
            Swing.obj.appendChild(Swing.vis)
            break;
        }
    }

    // funções de atualização
    draw();
    requestAnimationFrame(gameLoop);
}