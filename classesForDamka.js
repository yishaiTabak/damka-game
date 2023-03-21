export class Pawn {
    constructor(isWhite, theDiv) {
        this.isWhite = isWhite
        this.theDiv = theDiv
    }
    isLegalMove(locationRow, locationColumn, destinationRow, destinationColumn, isWhiteTurn, pieces, thereIsAnotherCapture) {
        if(this.isWhite !== isWhiteTurn || pieces[destinationRow][destinationColumn] !== null)
            return false
        if(thereIsAnotherCapture)
            return Queen.isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, this.isWhite, pieces)
        else
            return this.isRegularMove(pieces, locationRow, locationColumn, destinationRow, destinationColumn) || this.isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, pieces)
    }
    isRegularMove(pieces, locationRow, locationColumn, destinationRow, destinationColumn) {
        let positiveForBlack = this.isWhite? -1:1
        return (pieces[destinationRow][destinationColumn] === null && destinationRow - locationRow === positiveForBlack && (destinationColumn - locationColumn === 1 || destinationColumn - locationColumn === -1))
    }
    isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, pieces) {
        if(pieces[destinationRow][destinationColumn] !== null)
            return false
        let positiveForBlack = this.isWhite? -1:1
        if(destinationRow - locationRow === positiveForBlack * 2 && (destinationColumn - locationColumn === 2 || destinationColumn - locationColumn === -2))
            if(pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2] != null && this.isWhite !== pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2].isWhite)
                return true
        return false
    }
    isMultipleCaptures(locationRow, locationColumn, pieces) {
        for(let destinationRow = 0; destinationRow<8;destinationRow++)
            for(let destinationColumn = 0; destinationColumn<8; destinationColumn++)
                if (Queen.isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, this.isWhite, pieces))
                    return true
        return false
    }
    itHasOptionToMove(locationRow, locationColumn, pieces) {
        for(let i = 0;i<8;i++)
            for(let j = 0; j<8;j++)
                if(this.isRegularMove(pieces, locationRow, locationColumn, i, j) || this.isCaptureMove(locationRow, locationColumn, i, j, pieces))
                    return true
        return false
    }
 }
 export class Queen extends Pawn {
    constructor(isWhite, theDiv, container) {
        super(isWhite, theDiv)
        this.container = container
    }
    static isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, isWhite, pieces) {
        if(pieces[destinationRow][destinationColumn] === null && (destinationRow - locationRow === 2 || destinationRow - locationRow === -2) && (destinationColumn - locationColumn === 2 || destinationColumn - locationColumn === -2))
            if(pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2] !== null && isWhite !== pieces[(locationRow + destinationRow)/2][(locationColumn + destinationColumn)/2].isWhite)
                return true
        return false
    }
    isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn, pieces) {
        return Queen.isCaptureMove(locationRow, locationColumn, destinationRow, destinationColumn,this.isWhite, pieces)
    }
    isRegularMove(pieces, locationRow, locationColumn, destinationRow, destinationColumn) {
        return (pieces[destinationRow][destinationColumn] === null && (destinationRow - locationRow === 1 || destinationRow - locationRow === -1) && (destinationColumn - locationColumn === 1 || destinationColumn - locationColumn === -1))
    }
}