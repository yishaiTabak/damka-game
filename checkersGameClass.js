import { Pawn, Queen } from "./classesForDamka.js";
export class CheckersGame {
    constructor(){
        this.lastClick = [0,0]
        this.isWhiteTurn = true
        this.isBlackWon = false
        this.isWhiteWon = false
        this.board = [[], [], [], [], [], [], [], []]
        this.initPieces()
    }
static isBrownSquare(row, column) {
    return (row % 2 === 0 && column % 2 === 0) || (row % 2 === 1 && column % 2 === 1)
}
initPieces(){
    for(let x = 0; x < 8; x++)
        for(let y = 0;y < 8; y++)
            if(CheckersGame.isBrownSquare(x,y)) {
                if(x<3)
                    this.board[x][y] = new Pawn(false)
                else if(x>4)
                    this.board[x][y] = new Pawn(true)
            }
}
static copyBoard(board) {
    let newBoard = [[], [], [], [], [], [], [], []]
    for (let i = 0; i< 8;i++) 
        for(let j = 0;j<8;j++) 
            if(CheckersGame.isBrownSquare(i,j) && board[i][j] != null)
                newBoard[i][j] = board[i][j] instanceof Queen? new Queen(board[i][j].isWhite) : new Pawn(board[i][j].isWhite)
    return newBoard
}
updateLastClick(destinationRow, destinationColumn) {
    this.lastClick = [destinationRow, destinationColumn]
}
changeTurn() {
    this.isWhiteTurn = !this.isWhiteTurn
}
handleBurnedPieces() {
    for(let locationRow = 0; locationRow<8;locationRow++)
        for(let locationColumn = 0;locationColumn<8;locationColumn++) {
            const isLocationEmpty = this.board[locationRow][locationColumn] == null
            const isChosenPieceTurn = () => {return this.board[locationRow][locationColumn].isWhite === this.isWhiteTurn}
            if(!isLocationEmpty && isChosenPieceTurn())
                for(let destinationRow = 0; destinationRow<8;destinationRow++)
                    for(let destinationColoumn = 0;destinationColoumn<8;destinationColoumn++)
                        if(this.board[locationRow][locationColumn].isCaptureMove(locationRow,locationColumn,destinationRow,destinationColoumn, this.board)) {
                            this.board[locationRow][locationColumn] = null
                            destinationRow= 8
                            destinationColoumn=8
                        }
        }
}
handleNewQueen(destinationRow, destinationColumn) {
    const selectedPiece = this.board[destinationRow][destinationColumn]
    if(selectedPiece != null) {
        if(selectedPiece.isWhite && destinationRow === 0)
            this.board[destinationRow][destinationColumn] = new Queen(true)
        else if(!selectedPiece.isWhite && destinationRow === 7)
            this.board[destinationRow][destinationColumn] = new Queen(false)
    }
}
moveChosenPiece(locationRow, locationColumn, destinationRow, destinationColumn) {
        this.board[destinationRow][destinationColumn] = this.board[locationRow][locationColumn]
        this.board[locationRow][locationColumn] = null
}
static handleCaptureMove(board, locationRow, locationColumn, destinationRow, destinationColumn) {
    board[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2] = null
    board[destinationRow][destinationColumn] = board[locationRow][locationColumn]
    board[locationRow][locationColumn] = null
    return board
}
handleMoveAndBurnedPieces(locationRow, locationColumn, destinationRow, destinationColumn) {
    this.handleBurnedPieces()
    const isLocationEmpty = this.board[locationRow][locationColumn] == null
    if(!isLocationEmpty)
        this.moveChosenPiece(locationRow,locationColumn, destinationRow, destinationColumn)
}
isBlackOvercome() {
    for(let locationRow = 0; locationRow<8;locationRow++)
        for(let locationColumn = 0; locationColumn<8; locationColumn++) {
            const selectedPiece = this.board[locationRow][locationColumn]
            const isLocationEmpty = selectedPiece == null
            if(!isLocationEmpty && selectedPiece.isWhite &&
            (!this.isWhiteTurn || selectedPiece.itHasOptionToMove(locationRow, locationColumn, this.board)))
                return false
        }
    return true
}
isWhiteOvercome() {
    for(let locationRow = 0; locationRow<8;locationRow++)
        for(let locationColumn = 0; locationColumn<8; locationColumn++) {
            const selectedPiece = this.board[locationRow][locationColumn]
            const isLocationEmpty = selectedPiece == null
            if(!isLocationEmpty && !(selectedPiece.isWhite) &&
            (this.isWhiteTurn || selectedPiece.itHasOptionToMove(locationRow, locationColumn, this.board)))
                return false
        }
    return true
}
play(lastClick, destinationRow, destinationColumn){
    const selectedPiece = this.board[lastClick[0]][lastClick[1]]
    const isLocationEmpty = selectedPiece == null
    if (!isLocationEmpty &&
        selectedPiece.isLegalMove(lastClick[0], lastClick[1], destinationRow, destinationColumn, this.isWhiteTurn, this.board)) {
        this.hundleMove(lastClick[0], lastClick[1], destinationRow, destinationColumn)
        this.isBlackWon = this.isBlackOvercome()
        this.isWhiteWon = this.isWhiteOvercome()
        if(this.isBlackWon || this.isWhiteWon)
            return
    }
        this.updateLastClick(destinationRow, destinationColumn)
}
hundleMove(locationRow, locationColumn, destinationRow, destinationColumn) {
    const isSingleStep = destinationRow - locationRow === 1 || destinationRow - locationRow === -1
    if(isSingleStep)
        this.handleMoveAndBurnedPieces(locationRow, locationColumn, destinationRow, destinationColumn)
    else
        this.board = this.board[locationRow][locationColumn].simulationBoardForBeatenPieces
    this.changeTurn()
    this.handleNewQueen(destinationRow, destinationColumn)
}
}