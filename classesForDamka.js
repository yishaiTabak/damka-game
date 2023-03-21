export class Pawn {
    constructor(isWhite, theDiv) {
        this.isWhite = isWhite
        this.theDiv = theDiv
    }
    isLegalMove(originalX, originalY, newX, newY, isWhiteTurn, mypawns, thereIsAnotherCapture) {
        if(this.isWhite !== isWhiteTurn || mypawns[newX][newY] !== null)
            return false
        if(thereIsAnotherCapture)
            return Queen.isCaptureMove(originalX, originalY, newX, newY, this.isWhite, mypawns)
        else
            return this.isRegularMove(mypawns, originalX, originalY, newX, newY) || this.isCaptureMove(originalX, originalY, newX, newY, mypawns)
    }
    isRegularMove(mypawns, originalX, originalY, newX, newY) {
        let positiveForBlack = this.isWhite? -1:1
        return (mypawns[newX][newY] === null && newX - originalX === positiveForBlack && (newY - originalY === 1 || newY - originalY === -1))
    }
    isCaptureMove(originalX, originalY, newX, newY, mypawns) {
        if(mypawns[newX][newY] !== null)
            return false
        let positiveForBlack = this.isWhite? -1:1
        if(newX - originalX === positiveForBlack * 2 && (newY - originalY === 2 || newY - originalY === -2))
            if(mypawns[(originalX + newX)/2][(originalY + newY)/2] != null && this.isWhite !== mypawns[(originalX + newX)/2][(originalY + newY)/2].isWhite)
                return true
        return false
    }
    isMultipleCaptures(originalX, originalY, mypawns) {
        for(let newX = 0; newX<8;newX++)
            for(let newY = 0; newY<8; newY++)
                if (Queen.isCaptureMove(originalX, originalY, newX, newY, this.isWhite, mypawns))
                    return true
        return false
    }
    itHasOptionToMove(originalX, originalY, mypawns) {
        for(let i = 0;i<8;i++)
            for(let j = 0; j<8;j++)
                if(this.isRegularMove(mypawns, originalX, originalY, i, j) || this.isCaptureMove(originalX, originalY, i, j, mypawns))
                    return true
        return false
    }
 }
 export class Queen extends Pawn {
    constructor(isWhite, theDiv, container) {
        super(isWhite, theDiv)
        this.container = container
    }
    static isCaptureMove(originalX, originalY, newX, newY, isWhite, mypawns) {
        if(mypawns[newX][newY] === null && (newX - originalX === 2 || newX - originalX === -2) && (newY - originalY === 2 || newY - originalY === -2))
            if(mypawns[(originalX + newX)/2][(originalY + newY)/2] !== null && isWhite !== mypawns[(originalX + newX)/2][(originalY + newY)/2].isWhite)
                return true
        return false
    }
    isCaptureMove(originalX, originalY, newX, newY, mypawns) {
        return Queen.isCaptureMove(originalX, originalY, newX, newY,this.isWhite, mypawns)
    }
    isRegularMove(mypawns, originalX, originalY, newX, newY) {
        return (mypawns[newX][newY] === null && (newX - originalX === 1 || newX - originalX === -1) && (newY - originalY === 1 || newY - originalY === -1))
    }
}