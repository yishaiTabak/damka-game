import { CheckersGame } from "./checkersGameClass.js";
import { Pawn, Queen } from "./classesForDamka.js";
export class UICheckers {
    constructor(){
        this.game = new CheckersGame();
        this.UIboard = [[], [], [], [], [], [], [], []];
        }
    renderUi() { 
        this.initBoard()
        this.showPieces(this.game.board)
        for(let rowIndex = 0; rowIndex < 8; rowIndex++) 
            for(let columnIndex = 0;columnIndex < 8; columnIndex++) 
                this.UIboard[rowIndex][columnIndex].addEventListener('click',() => {
                this.deleteBorders()
                this.handleClick(rowIndex, columnIndex)
                this.handleBordersForLegalMoves(rowIndex, columnIndex)
            });
            this.handleButtons();
    }
    showPieces(board) {
        for(let row = 0; row<8; row++)
            for(let column = 0;column<8;column++){
                this.UIboard[row][column].replaceChildren()
                if(board[row][column] instanceof Pawn) {
                    this.makeVizualPiece(board, row,column)
                }
            }
    }
    makeVizualPiece(board, row,column) {
        const vizualPawn = document.createElement('div')
        vizualPawn.className = (board[row][column].isWhite?'white-pawn' : 'black-pawn')
        this.UIboard[row][column].appendChild(vizualPawn)
        if(board[row][column] instanceof Queen)
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
                this.UIboard[x][y] = document.createElement('div')
                const isBrownSquare = (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)
                    this.UIboard[x][y].className = isBrownSquare? 'brown-square':'white-square'
                board.appendChild(this.UIboard[x][y])
            }
    }
    deleteBorders() {
        for(let x = 0; x<8;x++)
            for(let y =0;y<8;y++)
                if((x % 2 === 0 && y % 2 === 0) || x % 2 === 1 && y % 2 === 1)
                    this.UIboard[x][y].className = 'brown-square'
    }
    handleBordersForLegalMoves(locationRow, locationColumn){
        const selectedPiece = this.game.board[locationRow][locationColumn]
        const isLocationEmpty = selectedPiece == null
        if(!isLocationEmpty && selectedPiece.isWhite === this.game.isWhiteTurn
            ) {
            this.UIboard[locationRow][locationColumn].className = 'shadow-square'
            for(let x = 0; x<8;x++)
                for(let y =0;y<8;y++) 
                    if(selectedPiece.isLegalMove(locationRow, locationColumn, x, y, this.game.isWhiteTurn, this.game.board))
                        this.UIboard[x][y].className = 'green-border' 
        }
    }
    handleClick(destinationRow, destinationColumn) {
        this.game.play(this.game.lastClick, destinationRow,destinationColumn)
        this.handleGameOver()
        this.handleHeadline()
        this.showPieces(this.game.board)
    }
    handleGameOver(){
        const gameOverMassage = document.getElementById('game-over')
        const gameOverContainer = document.getElementById('game-over-container')

        if(this.game.isBlackWon||this.game.isWhiteWon) {
            gameOverMassage.innerHTML = `game over!<br> ${this.game.isWhiteWon?'white':'black'} won`
            gameOverContainer.className = 'modal-container'
        }
 
    }
    handleHeadline() {
        const whiteHeadline = document.getElementById('white-headline')
        const blackHeadline = document.getElementById('black-headline')
        const visibleHeadline = this.game.isWhiteTurn? whiteHeadline:blackHeadline
        const unvisibleHeadline = !this.game.isWhiteTurn? whiteHeadline:blackHeadline
        visibleHeadline.className = 'exist'
        unvisibleHeadline.className = 'none'
    }
    handleDrawButton(gameOverMassage, gameOverContainer){
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
    handleButtons(){
        const gameOverMassage = document.getElementById('game-over')
        const gameOverContainer = document.getElementById('game-over-container')
        this.handleDrawButton(gameOverMassage, gameOverContainer)
        this.hundleResignButton(gameOverMassage, gameOverContainer)
        this.hundleOKbutton()
    }
}