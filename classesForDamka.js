import { CheckersGame } from "./checkersGameClass.js";
export class Pawn {
constructor(isWhite) {
    this.isWhite = isWhite
    this.thereIsOptionToCapture
    this.simulationBoardForBeatenPieces
}
isRegularMove(board, locationRow, locationColumn, destinationRow, destinationColumn) {
    const positiveForBlack = this.isWhite? -1:1
    const isDestinationEmpty = board[destinationRow][destinationColumn] == null;
    const isBlackMoveDirection = destinationRow - locationRow === positiveForBlack;
    const isLegalSingleStep =  (destinationColumn - locationColumn === 1 || destinationColumn - locationColumn === -1);
    return (isDestinationEmpty && isBlackMoveDirection && isLegalSingleStep);
}
isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, board) {
    const positiveForBlack = this.isWhite? -1:1
    const isDestinationEmpty = board[destinationRow][destinationColumn] == null;
    const isTwoStepsVertically = destinationRow - locationRow === positiveForBlack * 2
    const isTwoStepsHorizontally = destinationColumn - locationColumn === 2 || destinationColumn - locationColumn === -2
    if(isDestinationEmpty && isTwoStepsVertically && isTwoStepsHorizontally) {
        const isSingleStepEmpty = () => {
            return board[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2] == null}
        const isSingleStepEnemyPiece = () => {
            return this.isWhite !== board[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2].isWhite}
        return (!isSingleStepEmpty() && isSingleStepEnemyPiece())
    }
    return false
}
isMultipleCaptures(locationRow, locationColumn, board) {
    for(let destinationRow = 0; destinationRow<8;destinationRow++)
        for(let destinationColumn = 0; destinationColumn<8; destinationColumn++)
            if(Queen.isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, this.isWhite, board))
                return true
    return false
}
itHasOptionToMove(locationRow, locationColumn, board) {
    for(let destinationRow = 0;destinationRow<8;destinationRow++)
        for(let destinationCol = 0; destinationCol<8;destinationCol++)
            if(this.isRegularMove(board, locationRow, locationColumn, destinationRow, destinationCol) ||
                this.isCaptureMove(locationRow, locationColumn, destinationRow, destinationCol, board))
                return true
    return false
}
isLegalMove(locationRow, locationColumn, destinationRow, destinationColumn, isWhiteTurn, board) {
    const isChosenPieceTurn = this.isWhite === isWhiteTurn
    const isDestinationEmpty = board[destinationRow][destinationColumn] == null
    if(!isChosenPieceTurn || !isDestinationEmpty)
        return false
    return this.isRegularMove(board, locationRow, locationColumn, destinationRow, destinationColumn) ||
    this.isEatingMove(board, locationRow, locationColumn, destinationRow, destinationColumn)
}
isEatingMove(board, locationRow, locationColumn, destinationRow, destinationColumn) {
    this.thereIsOptionToCapture = false
    this.checkOptionsToCapture(board, locationRow, locationColumn, destinationRow, destinationColumn, true)
    if(this.thereIsOptionToCapture)
        return true
    return false
}
checkOptionsToCapture(newBoard,locationRow, locationColumn, destinationRow, destinationColumn, isFirsCapture){
    let isTheLastCapture = true
    for(let indexes of [[2,2], [2,-2], [-2,2], [-2,-2]]) {
        const newRow = locationRow + indexes[0]
        const newColumn = locationColumn +indexes[1]
        const isIndexesInBoard = (0 <= newRow && newRow <8 && 0 <=newColumn && newColumn <8)
        const handleSimulationCapture = () => {
            let someBoard = CheckersGame.copyBoard(newBoard)
            someBoard = CheckersGame.handleCaptureMove(someBoard, locationRow, locationColumn, newRow, newColumn)
            this.checkOptionsToCapture(someBoard, newRow, newColumn,destinationRow, destinationColumn, false)
            isTheLastCapture = false
        }
        if(isIndexesInBoard)
            if(isFirsCapture) {
                if(this.isCaptureMove(locationRow, locationColumn, newRow, newColumn, newBoard)) 
                    handleSimulationCapture()
        }
            else if(Queen.isCaptureMove(locationRow, locationColumn, newRow, newColumn, this.isWhite, newBoard))
                handleSimulationCapture()
    }
        const isSelectedPieceDestination = locationRow === destinationRow && locationColumn === destinationColumn
        if(isTheLastCapture && isSelectedPieceDestination) {
            this.thereIsOptionToCapture = true
            this.simulationBoardForBeatenPieces = newBoard
        }
}
}


export class Queen extends Pawn {
constructor(isWhite) {
    super(isWhite)
}
static isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, isWhite, board) {
    const isDestinationEmpty = board[destinationRow][destinationColumn] == null
    const isTwoStepsHorizontally = destinationRow - locationRow === 2 || destinationRow - locationRow === -2
    const isTwoStepsVertically = destinationColumn - locationColumn === 2 || destinationColumn - locationColumn === -2
    if(isDestinationEmpty && isTwoStepsVertically && isTwoStepsHorizontally) {
        const isSingleStepEmpty = () => {
            return board[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2] == null}
        const isSingleStepEnemyPiece = () => {
            return isWhite !== board[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2].isWhite}
        return (!isSingleStepEmpty() && isSingleStepEnemyPiece())
    }
    return false
}
isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, board) {
    return Queen.isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn,this.isWhite, board)
}
isRegularMove(board, locationRow, locationColumn, destinationRow, destinationColumn) {
    const isDestinationEmpty = board[destinationRow][destinationColumn] == null
    const isSingleStepHorizontally = destinationRow - locationRow === 1 || destinationRow - locationRow === -1
    const isSingleStepVertically = destinationColumn - locationColumn === 1 || destinationColumn - locationColumn === -1
    return (isDestinationEmpty && isSingleStepHorizontally && isSingleStepVertically)
}
}