import { CheckersGame } from "./checkersGameClass.js";
import { Util } from "./util.js"; 
const game = new CheckersGame(document.getElementById('board'))
let myboard = [[], [], [], [], [], [], [], []]
let mypawns = [[], [], [], [], [], [], [], []]

Util.createBoard(mypawns, myboard)

for(let newX = 0; newX < 8; newX++) {
    for(let newY = 0;newY < 8; newY++) {
        myboard[newX][newY].addEventListener('click',() => {
            handleClick(game, mypawns, myboard, newX, newY)
    })
    }
}

const drawContainer = document.getElementById('draw-container')
const drawButton = document.getElementById('draw')
const accept = document.getElementById('accept')
const reject = document.getElementById('reject')

const resignButton = document.getElementById('resign')
const gameOverMassage = document.getElementById('game-over')
const gameOverContainer = document.getElementById('game-over-container')
const OKButton = document.getElementById('OK-button')

const whiteHeadline = document.getElementById('white-headline')
const blackHeadline = document.getElementById('black-headline')

drawButton.addEventListener('click', () => {
    drawContainer.className = 'modal-container'
    accept.addEventListener('click', () => {
        drawContainer.className = 'none'
        gameOverMassage.innerHTML = "game over!<br> it's a draw!"
        gameOverContainer.className = 'modal-container'
    })
    reject.addEventListener('click', () => {
        drawContainer.className = 'none'
    })
})

resignButton.addEventListener('click', () => {
    gameOverMassage.innerHTML = 'game over! <br>' + (game.isWhiteTurn? 'black won!': 'white won!') + gameOverMassage.innerHTML
    gameOverContainer.className = 'modal-container'
})
OKButton.addEventListener('click', () => {
    location.reload()
})
function handleClick(game, mypawns, myboard, newX, newY) {
    switch(game.play(mypawns,myboard,game.isWhiteTurn,game.lastClick, newX,newY)) {
        case 'blackWon':
        gameOverMassage.innerHTML = "game over!<br> black won"
        gameOverContainer.className = 'modal-container'
        break
        case 'whiteWon':
        gameOverMassage.innerHTML = "game over!<br> white won"
        gameOverContainer.className = 'modal-container'
        break
    }
    if(game.isWhiteTurn){
        blackHeadline.className = 'none'
        whiteHeadline.className = 'exist'
    }
    else{
        whiteHeadline.className = 'none'
        blackHeadline.className = 'exist'
    }
}