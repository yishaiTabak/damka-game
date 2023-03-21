import { Util } from "./util.js"; 
export class CheckersGame {
    constructor(board){
        this.board = board
        this.lastClick = [0,0]
        this.isWhiteTurn = true
        this.thereIsAnotherCapture = false
    }
handleBurnedPieces(mypawns, isWhiteTurn) {
    for(let locationX = 0; locationX<8;locationX++)
        for(let locationY = 0;locationY<8;locationY++)
            if(mypawns[locationX][locationY] != null && mypawns[locationX][locationY].isWhite === isWhiteTurn)
                for(let destinationX = 0; destinationX<8;destinationX++)
                    for(let destinationY = 0;destinationY<8;destinationY++)
                        if(mypawns[locationX][locationY].isCaptureMove(locationX,locationY,destinationX,destinationY, mypawns)) {
                            mypawns[locationX][locationY].theDiv.className = 'none'
                            mypawns[locationX][locationY] = null
                            destinationX= 8
                            destinationY=8
                        }
}
handleNewQueen(mypawns,myboard,newX, newY) {
    if(mypawns[newX][newY] != null) {
        if( mypawns[newX][newY].isWhite && newX === 0)
            Util.makeQueen(mypawns,myboard, newX, newY, true)
        else if(!(mypawns[newX][newY].isWhite) && newX === 7)
            Util.makeQueen(mypawns,myboard, newX, newY, false)
    }
}
moveChosenPiece(mypawns, myboard, originalX, originalY, newX, newY) {
        mypawns[newX][newY] = mypawns[originalX][originalY]
        mypawns[originalX][originalY] = null
        myboard[newX][newY].appendChild(mypawns[newX][newY].theDiv)
}
handleCaptureMove(mypawns,myboard, originalX, originalY, newX, newY) {
    mypawns[(originalX + newX)/2][(originalY + newY)/2].theDiv.className = 'none'
    mypawns[(originalX + newX)/2][(originalY + newY)/2] = null
    this.moveChosenPiece(mypawns, myboard, originalX, originalY, newX, newY)
}
handleMoveAndBurnedPieces(mypawns,myboard,isWhiteTurn,lastClick, newX, newY) {
    this.handleBurnedPieces(mypawns, isWhiteTurn)
    if(mypawns[lastClick[0]][lastClick[1]] != null)
        this.moveChosenPiece(mypawns, myboard, lastClick[0],lastClick[1], newX, newY)
}
handleFullCapture(mypawns,myboard,lastClick, newX, newY) {
    this.handleCaptureMove(mypawns, myboard,lastClick[0],lastClick[1], newX, newY)
    this.thereIsAnotherCapture = mypawns[newX][newY].isMultipleCaptures(newX,newY, mypawns)
    this.lastClick = [newX, newY]
}
isBlackWon(isWhiteTurn, mypawns) {
    for(let originalX = 0; originalX<8;originalX++)
        for(let originalY = 0; originalY<8; originalY++)
            if(mypawns[originalX][originalY] != null && mypawns[originalX][originalY].isWhite &&
            (isWhiteTurn || mypawns[originalX][originalY].itHasOptionToMove(originalX, originalY, mypawns)))
                return false
    return true
}
isWhiteWon(isWhiteTurn, mypawns) {
    for(let originalX = 0; originalX<8;originalX++)
        for(let originalY = 0; originalY<8; originalY++) 
            if(mypawns[originalX][originalY] != null && !(mypawns[originalX][originalY].isWhite) &&
            (!isWhiteTurn || mypawns[originalX][originalY].itHasOptionToMove(originalX, originalY, mypawns)))
                return false
    return true
}
play(mypawns,myboard,isWhiteTurn,lastClick, newX, newY){
    if (mypawns[lastClick[0]][lastClick[1]] != null &&
    mypawns[lastClick[0]][lastClick[1]].isLegalMove(lastClick[0], lastClick[1], newX, newY, isWhiteTurn, mypawns, this.thereIsAnotherCapture)) {
        this.hundleMove(mypawns,myboard,isWhiteTurn,lastClick[0], lastClick[1], newX, newY)
        if(this.isBlackWon(isWhiteTurn,mypawns))
            return 'blackWon'
        else if (this.isWhiteWon(isWhiteTurn, mypawns))
            return 'whiteWon'
    }
    if(!this.thereIsAnotherCapture)
        this.lastClick = [newX, newY]
}
hundleMove(mypawns,myboard,isWhiteTurn,originalX, originalY, newX, newY) {
    if(!this.thereIsAnotherCapture && (newX - originalX === 1 || newX - originalX === -1))
        this.handleMoveAndBurnedPieces(mypawns,myboard,isWhiteTurn,[originalX, originalY], newX, newY)
    else
        this.handleFullCapture(mypawns,myboard,[originalX, originalY], newX, newY)
    if(!this.thereIsAnotherCapture) {
        this.isWhiteTurn = !this.isWhiteTurn
        this.handleNewQueen(mypawns,myboard,newX, newY)
    }
}
}