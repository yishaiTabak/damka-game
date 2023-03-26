import { CheckersGame } from "./checkersGameClass.js";
import { Pawn, Queen } from "./classesForDamka.js";
export class UICheckers {
    constructor(){
        this.game = new CheckersGame();
        this.board = [[], [], [], [], [], [], [], []]
        }
    renderUi() { 
        this.initBoard()
        this.showPieces(this.game.pieces)
        for(let rowIndex = 0; rowIndex < 8; rowIndex++) 
            for(let columnIndex = 0;columnIndex < 8; columnIndex++) 
                this.board[rowIndex][columnIndex].addEventListener('click',() => {
                this.deleteBorders()
                this.handleClick(rowIndex, columnIndex)
                this.hundleBordersForLegalMoves(rowIndex, columnIndex)
            })
            this.hundleButtons()
    }
    showPieces(pieces) {
        for(let row = 0; row<8; row++)
            for(let column = 0;column<8;column++){
                this.board[row][column].replaceChildren()
                if(pieces[row][column] instanceof Pawn) {
                    this.makeVizualPiece(pieces, row,column)
                }
            }
    }
    makeVizualPiece(pieces, row,column) {
        const vizualPawn = document.createElement('div')
        vizualPawn.className = (pieces[row][column].isWhite?'white-pawn' : 'black-pawn')
        this.board[row][column].appendChild(vizualPawn)
        if(pieces[row][column] instanceof Queen)
            this.promotePawnToQueen(vizualPawn)
    }
    promotePawnToQueen(vizualPawn) {
        const imgOfQueen = document.createElement('img')
        imgOfQueen.className = 'queen'
        vizualPawn.appendChild(imgOfQueen)
    }
    initBoard() {
        for(let x = 0; x < 8; x++)
            for(let y = 0;y < 8; y++) {
                this.board[x][y] = document.createElement('div')
                const isBrownSquare = (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)
                    this.board[x][y].className = isBrownSquare? 'brown-square':'white-square'
                board.appendChild(this.board[x][y])
            }
    }
    deleteBorders() {
        for(let x = 0; x<8;x++)
            for(let y =0;y<8;y++)
                if((x % 2 === 0 && y % 2 === 0) || x % 2 === 1 && y % 2 === 1)
                    this.board[x][y].className = 'brown-square'
    }
    hundleBordersForLegalMoves(locationRow, locationColumn){
        const selectedPiece = this.game.pieces[locationRow][locationColumn]
        const isLocationEmpty = selectedPiece == null
        if(!isLocationEmpty && selectedPiece.isWhite === this.game.isWhiteTurn) {
            this.board[locationRow][locationColumn].className = 'shadow-square'
            for(let x = 0; x<8;x++)
                for(let y =0;y<8;y++) 
                    if(selectedPiece.isLegalMove(locationRow, locationColumn, x, y, this.game.isWhiteTurn, this.game.pieces))
                        this.board[x][y].className = 'green-border' 
        }
    }
    handleClick(destinationRow, destinationColumn) {
        this.game.play(this.game.lastClick, destinationRow,destinationColumn)
        this.hundleGameOver()
        this.hundleHeadline()
        this.showPieces(this.game.pieces)
    }
    hundleGameOver(){
        const gameOverMassage = document.getElementById('game-over')
        const gameOverContainer = document.getElementById('game-over-container')

        if(this.game.isBlackWon||this.game.isWhiteWon) {
            gameOverMassage.innerHTML = `game over!<br> ${this.game.isWhiteWon?'white':'black'} won`
            gameOverContainer.className = 'modal-container'
        }
 
    }
    hundleHeadline() {
        const whiteHeadline = document.getElementById('white-headline')
        const blackHeadline = document.getElementById('black-headline')
        const visibleHeadline = this.game.isWhiteTurn? whiteHeadline:blackHeadline
        const unvisibleHeadline = !this.game.isWhiteTurn? whiteHeadline:blackHeadline
        visibleHeadline.className = 'exist'
        unvisibleHeadline.className = 'none'
    }
    hundleDrawButton(gameOverMassage, gameOverContainer){
        const drawContainer = document.getElementById('draw-container')
        const drawButton = document.getElementById('draw')
        drawButton.addEventListener('click', () => {
            drawContainer.className = 'modal-container'
            this.handleAcceptbutton(gameOverMassage, gameOverContainer, drawContainer)
            this.handleRejectButton(drawContainer)
        })
    }
    handleRejectButton(drawContainer){
        const reject = document.getElementById('reject')
        reject.addEventListener('click', () => {
            drawContainer.className = 'none'
        })
    }
    handleAcceptbutton(gameOverMassage, gameOverContainer, drawContainer) {
        const accept = document.getElementById('accept')
        accept.addEventListener('click', () => {
            drawContainer.className = 'none'
            gameOverMassage.innerHTML = "game over!<br> it's a draw!"
            gameOverContainer.className = 'modal-container'
        })
    }
    hundleResignButton(gameOverMassage, gameOverContainer){
        const resignButton = document.getElementById('resign')
        resignButton.addEventListener('click', () => {
            gameOverMassage.innerHTML = 'game over! <br>' + (this.game.isWhiteTurn? 'black won!': 'white won!') + gameOverMassage.innerHTML
            gameOverContainer.className = 'modal-container'
        })
    }
    hundleOKbutton(){
        const OKButton = document.getElementById('OK-button')
        OKButton.addEventListener('click', () => {
            location.reload()
        })
    }
    hundleButtons(){
        const gameOverMassage = document.getElementById('game-over')
        const gameOverContainer = document.getElementById('game-over-container')
        this.hundleDrawButton(gameOverMassage, gameOverContainer)
        this.hundleResignButton(gameOverMassage, gameOverContainer)
        this.hundleOKbutton()
    }
}