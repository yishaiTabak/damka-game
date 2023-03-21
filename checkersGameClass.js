import { Util } from "./util.js"; 
export class CheckersGame {
    constructor(){
        this.lastClick = [0,0]
        this.isWhiteTurn = true
        this.thereIsAnotherCapture = false
    }
updateLastClick(destinationRow, destinationColumn) {
    this.lastClick = [destinationRow, destinationColumn]
}
changeTurn() {
    this.isWhiteTurn = !this.isWhiteTurn
}
handleBurnedPieces(pieces, isWhiteTurn) {
    for(let locationRow = 0; locationRow<8;locationRow++)
        for(let locationColumn = 0;locationColumn<8;locationColumn++)
            if(pieces[locationRow][locationColumn] != null && pieces[locationRow][locationColumn].isWhite === isWhiteTurn)
                for(let destinationRow = 0; destinationRow<8;destinationRow++)
                    for(let destinationColoumn = 0;destinationColoumn<8;destinationColoumn++)
                        if(pieces[locationRow][locationColumn].isCaptureMove(locationRow,locationColumn,destinationRow,destinationColoumn, pieces)) {
                            pieces[locationRow][locationColumn].theDiv.className = 'none'
                            pieces[locationRow][locationColumn] = null
                            destinationRow= 8
                            destinationColoumn=8
                        }
}
handleNewQueen(pieces,gameBoard,destinationRow, destinationColumn) {
    if(pieces[destinationRow][destinationColumn] != null) {
        if( pieces[destinationRow][destinationColumn].isWhite && destinationRow === 0)
            Util.makeQueen(pieces,gameBoard, destinationRow, destinationColumn, true)
        else if(!(pieces[destinationRow][destinationColumn].isWhite) && destinationRow === 7)
            Util.makeQueen(pieces,gameBoard, destinationRow, destinationColumn, false)
    }
}
moveChosenPiece(pieces, gameBoard, locationRow, locationColumn, destinationRow, destinationColumn) {
        pieces[destinationRow][destinationColumn] = pieces[locationRow][locationColumn]
        pieces[locationRow][locationColumn] = null
        gameBoard[destinationRow][destinationColumn].appendChild(pieces[destinationRow][destinationColumn].theDiv)
}
handleCaptureMove(pieces,gameBoard, locationRow, locationColumn, destinationRow, destinationColumn) {
    pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2].theDiv.className = 'none'
    pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2] = null
    this.moveChosenPiece(pieces, gameBoard, locationRow, locationColumn, destinationRow, destinationColumn)
}
handleMoveAndBurnedPieces(pieces,gameBoard,isWhiteTurn,locationRow, locationColumn, destinationRow, destinationColumn) {
    this.handleBurnedPieces(pieces, isWhiteTurn)
    if(pieces[locationRow][locationColumn] != null)
        this.moveChosenPiece(pieces, gameBoard, locationRow,locationColumn, destinationRow, destinationColumn)
}
handleFullCapture(pieces,gameBoard,locationRow, locationColumn, destinationRow, destinationColumn) {
    this.handleCaptureMove(pieces, gameBoard,locationRow,locationColumn, destinationRow, destinationColumn)
    this.thereIsAnotherCapture = pieces[destinationRow][destinationColumn].isMultipleCaptures(destinationRow,destinationColumn, pieces)
    this.updateLastClick(destinationRow, destinationColumn)
}
isBlackWon(isWhiteTurn, pieces) {
    for(let locationRow = 0; locationRow<8;locationRow++)
        for(let locationColumn = 0; locationColumn<8; locationColumn++)
            if(pieces[locationRow][locationColumn] != null && pieces[locationRow][locationColumn].isWhite &&
            (isWhiteTurn || pieces[locationRow][locationColumn].itHasOptionToMove(locationRow, locationColumn, pieces)))
                return false
    return true
}
isWhiteWon(isWhiteTurn, pieces) {
    for(let locationRow = 0; locationRow<8;locationRow++)
        for(let locationColumn = 0; locationColumn<8; locationColumn++) 
            if(pieces[locationRow][locationColumn] != null && !(pieces[locationRow][locationColumn].isWhite) &&
            (!isWhiteTurn || pieces[locationRow][locationColumn].itHasOptionToMove(locationRow, locationColumn, pieces)))
                return false
    return true
}
play(pieces,gameBoard,isWhiteTurn,lastClick, destinationRow, destinationColumn){
    if (pieces[lastClick[0]][lastClick[1]] != null &&
    pieces[lastClick[0]][lastClick[1]].isLegalMove(lastClick[0], lastClick[1], destinationRow, destinationColumn, isWhiteTurn, pieces, this.thereIsAnotherCapture)) {
        this.hundleMove(pieces,gameBoard,isWhiteTurn,lastClick[0], lastClick[1], destinationRow, destinationColumn)
        if(this.isBlackWon(isWhiteTurn,pieces))
            return 'blackWon'
        else if (this.isWhiteWon(isWhiteTurn, pieces))
            return 'whiteWon'
    }
    if(!this.thereIsAnotherCapture)
        this.updateLastClick(destinationRow, destinationColumn)
}
hundleMove(pieces,gameBoard,isWhiteTurn,locationRow, locationColumn, destinationRow, destinationColumn) {
    if(!this.thereIsAnotherCapture && (destinationRow - locationRow === 1 || destinationRow - locationRow === -1))
        this.handleMoveAndBurnedPieces(pieces,gameBoard,isWhiteTurn,locationRow, locationColumn, destinationRow, destinationColumn)
    else
        this.handleFullCapture(pieces,gameBoard,locationRow, locationColumn, destinationRow, destinationColumn)
    if(!this.thereIsAnotherCapture) {
        this.changeTurn()
        this.handleNewQueen(pieces,gameBoard,destinationRow, destinationColumn)
    }
}
}