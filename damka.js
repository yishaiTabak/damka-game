import { CheckersGame } from "./checkersGameClass.js";
import { Util } from "./util.js"; 
const game = new CheckersGame()
let board = [[], [], [], [], [], [], [], []]
let pieces = [[], [], [], [], [], [], [], []]

Util.createBoard(pieces, board, document.getElementById('board'))

for(let rowIndex = 0; rowIndex < 8; rowIndex++) {
    for(let columnIndex = 0;columnIndex < 8; columnIndex++) {
        board[rowIndex][columnIndex].addEventListener('click',() => {
            deleteBorders()
            handleClick(game, pieces, board, rowIndex, columnIndex)
            if(game.thereIsAnotherCapture) 
                hundleBordersForLegalMoves(game.lastClick[0], game.lastClick[1])
            else
                hundleBordersForLegalMoves(rowIndex, columnIndex)
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
function handleClick(game, pieces, myboard, destinationRow, destinationColumn) {
    switch(game.play(pieces,myboard,game.isWhiteTurn,game.lastClick, destinationRow,destinationColumn)) {
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
function deleteBorders() {
    for(let x = 0; x<8;x++)
        for(let y =0;y<8;y++)
            if((x % 2 === 0 && y % 2 === 0) || x % 2 === 1 && y % 2 === 1)
                board[x][y].className = 'brown-square'
}
function hundleBordersForLegalMoves(rowIndex, columnIndex){
    if(pieces[rowIndex][columnIndex] != null && pieces[rowIndex][columnIndex].isWhite === game.isWhiteTurn) {
        board[rowIndex][columnIndex].className = 'black-border'
        for(let x = 0; x<8;x++)
            for(let y =0;y<8;y++) 
                if(pieces[rowIndex][columnIndex].isLegalMove(rowIndex, columnIndex, x, y, game.isWhiteTurn, pieces, game.thereIsAnotherCapture))
                    board[x][y].className = 'green-border' 
    }
}