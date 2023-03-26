import { CheckersGame } from "./checkersGameClass.js";
export class Pawn {
constructor(isWhite) {
    this.isWhite = isWhite
    this.isOptionToCapture
    this.simulationBoardForBeatenPieces
}
isRegularMove(pieces, locationRow, locationColumn, destinationRow, destinationColumn) {
    const positiveForBlack = this.isWhite? -1:1
    const isDestinationEmpty = pieces[destinationRow][destinationColumn] == null;
    const isBlackMoveDirection = destinationRow - locationRow === positiveForBlack;
    const isLegalSingleStep =  (destinationColumn - locationColumn === 1 || destinationColumn - locationColumn === -1);
    return (isDestinationEmpty && isBlackMoveDirection && isLegalSingleStep);
}
isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, pieces) {
    const positiveForBlack = this.isWhite? -1:1
    const isDestinationEmpty = pieces[destinationRow][destinationColumn] == null;
    const isTwoStepsVertically = destinationRow - locationRow === positiveForBlack * 2
    const isTwoStepsHorizontally = destinationColumn - locationColumn === 2 || destinationColumn - locationColumn === -2
    if(isDestinationEmpty && isTwoStepsVertically && isTwoStepsHorizontally) {
        const isSingleStepEmpty = () => {
            return pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2] == null}
        const isSingleStepEnemyPiece = () => {
            return this.isWhite !== pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2].isWhite}
        return (!isSingleStepEmpty() && isSingleStepEnemyPiece())
    }
    return false
}
isMultipleCaptures(locationRow, locationColumn, pieces) {
    for(let destinationRow = 0; destinationRow<8;destinationRow++)
        for(let destinationColumn = 0; destinationColumn<8; destinationColumn++)
            if(Queen.isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, this.isWhite, pieces))
                return true
    return false
}
itHasOptionToMove(locationRow, locationColumn, pieces) {
    for(let destinationRow = 0;destinationRow<8;destinationRow++)
        for(let destinationCol = 0; destinationCol<8;destinationCol++)
            if(this.isRegularMove(pieces, locationRow, locationColumn, destinationRow, destinationCol) ||
                this.isCaptureMove(locationRow, locationColumn, destinationRow, destinationCol, pieces))
                return true
    return false
}
isLegalMove(locationRow, locationColumn, destinationRow, destinationColumn, isWhiteTurn, pieces) {
    const isChosenPieceTurn = this.isWhite === isWhiteTurn
    const isDestinationEmpty = pieces[destinationRow][destinationColumn] == null
    if(!isChosenPieceTurn || !isDestinationEmpty)
        return false
    return this.isRegularMove(pieces, locationRow, locationColumn, destinationRow, destinationColumn) ||
    this.isEatingMove(pieces, locationRow, locationColumn, destinationRow, destinationColumn)
}
isEatingMove(pieces, locationRow, locationColumn, destinationRow, destinationColumn) {
    this.isOptionToCapture = false
    this.checkOptionsToCapture(pieces, locationRow, locationColumn, destinationRow, destinationColumn, true)
    if(this.isOptionToCapture)
        return true
    return false
}
checkOptionsToCapture(newPieces,locationRow, locationColumn, destinationRow, destinationColumn, isFirsCapture) {
    let isTheLastCapture = true
    for(let indexes of [[2,2], [2,-2], [-2,2], [-2,-2]]) {
        const newRow = locationRow + indexes[0]
        const newColumn = locationColumn +indexes[1]
        const isIndexesInBoard = (0 <= newRow && newRow <8 && 0 <=newColumn && newColumn <8)

        const handleSimulationCapture = () => {
            let somePieces = CheckersGame.newPieces(newPieces)
            somePieces = CheckersGame.handleCaptureMove(somePieces, locationRow, locationColumn, newRow, newColumn)
            this.checkOptionsToCapture(somePieces, newRow, newColumn,destinationRow, destinationColumn, false)
            isTheLastCapture = false
        }
        if(isIndexesInBoard)
            if(isFirsCapture) {
                if(this.isCaptureMove(locationRow, locationColumn, newRow, newColumn, newPieces)) {
                    handleSimulationCapture()
            }
        }
            else if(Queen.isCaptureMove(locationRow, locationColumn, newRow, newColumn, this.isWhite, newPieces)){
                handleSimulationCapture()
            }
        const isSelectedPieceDestination = locationRow === destinationRow && locationColumn === destinationColumn
        if(isTheLastCapture && isSelectedPieceDestination) {
            this.isOptionToCapture = true
            this.simulationBoardForBeatenPieces = newPieces
        }
    }
}
}


export class Queen extends Pawn {
constructor(isWhite) {
    super(isWhite)
}
static isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, isWhite, pieces) {
    const isDestinationEmpty = pieces[destinationRow][destinationColumn] == null
    const isTwoStepsHorizontally = destinationRow - locationRow === 2 || destinationRow - locationRow === -2
    const isTwoStepsVertically = destinationColumn - locationColumn === 2 || destinationColumn - locationColumn === -2
    if(isDestinationEmpty && isTwoStepsVertically && isTwoStepsHorizontally) {
        const isSingleStepEmpty = () => {
            return pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2] == null}
        const isSingleStepEnemyPiece = () => {
            return isWhite !== pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2].isWhite}
        return (!isSingleStepEmpty() && isSingleStepEnemyPiece())
    }
    return false
}
isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, pieces) {
    return Queen.isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn,this.isWhite, pieces)
}
isRegularMove(pieces, locationRow, locationColumn, destinationRow, destinationColumn) {
    const isDestinationEmpty = pieces[destinationRow][destinationColumn] == null
    const isSingleStepHorizontally = destinationRow - locationRow === 1 || destinationRow - locationRow === -1
    const isSingleStepVertically = destinationColumn - locationColumn === 1 || destinationColumn - locationColumn === -1
    return (isDestinationEmpty && isSingleStepHorizontally && isSingleStepVertically)
}
}