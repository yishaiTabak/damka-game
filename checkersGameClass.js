import { Pawn, Queen } from "./classesForDamka.js";
export class CheckersGame {
    constructor(){
        this.lastClick = [0,0]
        this.isWhiteTurn = true
        this.thereIsAnotherCapture = false
        this.isBlackWon = false
        this.isWhiteWon = false
        this.pieces = [[], [], [], [], [], [], [], []]
        this.initPieces()
    }
initPieces(){
    for(let x = 0; x < 8; x++)
        for(let y = 0;y < 8; y++)
            if((x % 2 === 0 && y % 2 === 0) || x % 2 === 1 && y % 2 === 1) {
                if(x<3)
                    this.pieces[x][y] = new Pawn(false)
                else if(x>4)
                    this.pieces[x][y] = new Pawn(true)
                else
                    this.pieces[x][y] = null
            }
}
static newPieces(pieces) {
    let newPieces = [[], [], [], [], [], [], [], []]
    for (let i = 0; i< 8;i++) {
        for(let j = 0;j<8;j++) {
            if(((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) && pieces[i][j] != null) {
                if (pieces[i][j] instanceof Queen)
                    newPieces[i][j] = new Queen(pieces[i][j].isWhite)
                else
                    newPieces[i][j] = new Pawn(pieces[i][j].isWhite)
            }
            else
                newPieces[i][j] = null
        }
    }
    return newPieces
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
            const isLocationEmpty = this.pieces[locationRow][locationColumn] == null
            const isChosenPieceTurn = () => {return this.pieces[locationRow][locationColumn].isWhite === this.isWhiteTurn}
            if(!isLocationEmpty && isChosenPieceTurn())
                for(let destinationRow = 0; destinationRow<8;destinationRow++)
                    for(let destinationColoumn = 0;destinationColoumn<8;destinationColoumn++)
                        if(this.pieces[locationRow][locationColumn].isCaptureMove(locationRow,locationColumn,destinationRow,destinationColoumn, this.pieces)) {
                            this.pieces[locationRow][locationColumn] = null
                            destinationRow= 8
                            destinationColoumn=8
                        }
        }
}
handleNewQueen(destinationRow, destinationColumn) {
    if(this.pieces[destinationRow][destinationColumn] != null) {
        if(this.pieces[destinationRow][destinationColumn].isWhite && destinationRow === 0)
            this.pieces[destinationRow][destinationColumn] = new Queen(true)
        else if(!(this.pieces[destinationRow][destinationColumn].isWhite) && destinationRow === 7)
            this.pieces[destinationRow][destinationColumn] = new Queen(false)
    }
}
moveChosenPiece(locationRow, locationColumn, destinationRow, destinationColumn) {
        this.pieces[destinationRow][destinationColumn] = this.pieces[locationRow][locationColumn]
        this.pieces[locationRow][locationColumn] = null
}
handleCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn) {
    this.pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2] = null
    this.moveChosenPiece(locationRow, locationColumn, destinationRow, destinationColumn)
}
static handleCaptureMove(pieces, locationRow, locationColumn, destinationRow, destinationColumn) {
    pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2] = null
    pieces[destinationRow][destinationColumn] = pieces[locationRow][locationColumn]
    pieces[locationRow][locationColumn] = null
    return pieces
}
handleMoveAndBurnedPieces(locationRow, locationColumn, destinationRow, destinationColumn) {
    this.handleBurnedPieces()
    const isLocationEmpty = this.pieces[locationRow][locationColumn] == null
    if(!isLocationEmpty)
        this.moveChosenPiece(locationRow,locationColumn, destinationRow, destinationColumn)
}
handleFullCapture(locationRow, locationColumn, destinationRow, destinationColumn) {
    this.handleCaptureMove(locationRow,locationColumn, destinationRow, destinationColumn)
    this.thereIsAnotherCapture = this.pieces[destinationRow][destinationColumn].isMultipleCaptures(destinationRow,destinationColumn, this.pieces)
    this.updateLastClick(destinationRow, destinationColumn)
}
isBlackOvercome() {
    for(let locationRow = 0; locationRow<8;locationRow++)
        for(let locationColumn = 0; locationColumn<8; locationColumn++) {
            const isLocationEmpty = this.pieces[locationRow][locationColumn] == null
            if(!isLocationEmpty && this.pieces[locationRow][locationColumn].isWhite &&
                (!this.isWhiteTurn || this.pieces[locationRow][locationColumn].itHasOptionToMove(locationRow, locationColumn, this.pieces)))
                    return false
        }
    return true
}
isWhiteOvercome() {
    for(let locationRow = 0; locationRow<8;locationRow++)
        for(let locationColumn = 0; locationColumn<8; locationColumn++) {
            const isLocationEmpty = this.pieces[locationRow][locationColumn] == null
            if(!isLocationEmpty && !(this.pieces[locationRow][locationColumn].isWhite) &&
                (this.isWhiteTurn || this.pieces[locationRow][locationColumn].itHasOptionToMove(locationRow, locationColumn, this.pieces)))
                    return false
        }
    return true
}
play(lastClick, destinationRow, destinationColumn){
    const isLocationEmpty = this.pieces[lastClick[0]][lastClick[1]] == null
    if (!isLocationEmpty &&
        this.pieces[lastClick[0]][lastClick[1]].isLegalMove(lastClick[0], lastClick[1], destinationRow, destinationColumn, this.isWhiteTurn, this.pieces)) {
        this.hundleMove(lastClick[0], lastClick[1], destinationRow, destinationColumn)
        this.isBlackWon = this.isBlackOvercome()
        this.isWhiteWon = this.isWhiteOvercome()
        if(this.isBlackWon || this.isWhiteWon)
            return
    }
    if(!this.thereIsAnotherCapture)
        this.updateLastClick(destinationRow, destinationColumn)
}
hundleMove(locationRow, locationColumn, destinationRow, destinationColumn) {
    const isSingleStep = destinationRow - locationRow === 1 || destinationRow - locationRow === -1
    if(!this.thereIsAnotherCapture && isSingleStep)
        this.handleMoveAndBurnedPieces(locationRow, locationColumn, destinationRow, destinationColumn)
    else
        {
            let newPieces = CheckersGame.newPieces(this.pieces)
            this.bbb(newPieces, locationRow,locationColumn,destinationRow,destinationColumn, true)
        }
    //    this.handleFullCapture(locationRow, locationColumn, destinationRow, destinationColumn)
    if(!this.thereIsAnotherCapture) {
        this.changeTurn()
        this.handleNewQueen(destinationRow, destinationColumn)
    }
}
bbb(newPieces,locationRow, locationColumn,destinationRow, destinationColumn,isFirsCapture) {
    let isTheLast = true
    for(let indexes of [[2,2], [2,-2], [-2,2], [-2,-2]]) {
        const newRow = locationRow + indexes[0]
        const newColumn = locationColumn +indexes[1]
        const isIndexesInBoard = (0 <= newRow && newRow <8 && 0 <=newColumn && newColumn <8)
        if(isIndexesInBoard) {
            if(isFirsCapture) {
                 if(this.pieces[locationRow][locationColumn]&& this.pieces[locationRow][locationColumn].isCaptureMove(locationRow, locationColumn, newRow, newColumn, newPieces)) {
                    let somePieces = CheckersGame.newPieces(newPieces)
                    somePieces = CheckersGame.handleCaptureMove(somePieces, locationRow, locationColumn, newRow, newColumn)
                    this.bbb(somePieces, newRow, newColumn,destinationRow, destinationColumn, false)
                    isTheLast = false
                }
            }
            else if(Queen.isCaptureMove(locationRow, locationColumn, newRow, newColumn, this.isWhiteTurn, newPieces)) {
                    let somePieces = CheckersGame.newPieces(newPieces)
                    somePieces = CheckersGame.handleCaptureMove(somePieces, locationRow, locationColumn, newRow, newColumn)
                    this.bbb(somePieces, newRow, newColumn,destinationRow, destinationColumn, false)
                    isTheLast = false
            }
        }
    }
    if(isTheLast && locationRow === destinationRow && locationColumn === destinationColumn)
        this.pieces = newPieces
}
}