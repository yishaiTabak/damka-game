import { Pawn, Queen } from "./classesForDamka.js";
export class CheckersGame {
    constructor(board){
        this.board = board
        this.lastClick = [0,0]
        this.isWhiteTurn = true
        this.mult = false
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
handleRegularMove(mypawns, myboard, originalX, originalY, newX, newY){
    this.moveChosenPiece(mypawns, myboard, originalX, originalY, newX, newY)
 //   this.handleMyQueen(mypawns,myboard,newX, newY)
}
handleMyQueen(mypawns,myboard,newX, newY) {
    if(mypawns[newX][newY] != null) {
        if( mypawns[newX][newY].isWhite && newX === 0)
            this.handleNewQueen(mypawns,myboard, newX, newY, true)
        else if(!(mypawns[newX][newY].isWhite) && newX === 7)
            this.handleNewQueen(mypawns,myboard, newX, newY, false)
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
handleNewQueen(mypawns,myboard, newX, newY,isWhite) {
    mypawns[newX][newY].theDiv.className = 'none'
    mypawns[newX][newY] = new Queen (isWhite, document.createElement('div'),document.createElement('img'))
    mypawns[newX][newY].theDiv.className = (isWhite?'white-pawn':'black-pawn')
    mypawns[newX][newY].container.className = 'queen'
    mypawns[newX][newY].container.src = 'https://www.pngfind.com/pngs/m/286-2865290_this-free-icons-png-design-of-chess-piece.png'
    mypawns[newX][newY].theDiv.appendChild(mypawns[newX][newY].container)
    myboard[newX][newY].appendChild(mypawns[newX][newY].theDiv)
}
// play(mypawns,myboard,isWhiteTurn,lastClick, newX, newY) {
//     if(this.mult) {
//         if(mypawns[newX][newY] == null && mypawns[lastClick[0]][lastClick[1]] != null && Queen.isCaptureMove(lastClick[0],lastClick[1], newX, newY,mypawns[lastClick[0]][lastClick[1]].isWhite, mypawns))
//             this.handleFullCapture(mypawns,myboard,lastClick, newX, newY)
//             this.lastClick = [newX, newY]
//     }
//     else {
//         if(mypawns[lastClick[0]][lastClick[1]] != null && mypawns[lastClick[0]][lastClick[1]].isWhite === isWhiteTurn){
//             if(mypawns[lastClick[0]][lastClick[1]].isRegularMove(mypawns, lastClick[0],lastClick[1], newX, newY)) {
//                 this.handleMoveAndBurnedPieces(mypawns,myboard,isWhiteTurn,lastClick, newX, newY)
//                 this.isWhiteTurn = !this.isWhiteTurn
//             }
//             else if(mypawns[lastClick[0]][lastClick[1]].isCaptureMove(lastClick[0],lastClick[1], newX, newY, mypawns)) {
//                 this.handleFullCapture(mypawns,myboard,lastClick, newX, newY)
//             }
//         }
//         this.lastClick = [newX,newY]
//     }
//     if(this.isBlackWon(isWhiteTurn,mypawns))
//         return 'blackWon'
//     else if (this.isWhiteWon(isWhiteTurn, mypawns))
//         return 'whiteWon'
// }
handleMoveAndBurnedPieces(mypawns,myboard,isWhiteTurn,lastClick, newX, newY) {
    this.handleBurnedPieces(mypawns, isWhiteTurn)
    if(mypawns[lastClick[0]][lastClick[1]] != null)
        this.handleRegularMove(mypawns, myboard, lastClick[0],lastClick[1], newX, newY)
   // this.lastClick = [newX,newY]
}
handleFullCapture(mypawns,myboard,lastClick, newX, newY) {
    this.handleCaptureMove(mypawns, myboard,lastClick[0],lastClick[1], newX, newY)
    this.mult = mypawns[newX][newY].isMultipleCaptures(newX,newY, mypawns)
    this.lastClick = [newX, newY]
   // if(this.mult === false) {
     //   this.isWhiteTurn = !this.isWhiteTurn
       // this.handleMyQueen(mypawns,myboard,newX, newY)
    //}
}
isBlackWon(isWhiteTurn, mypawns) {
    for(let originalX = 0; originalX<8;originalX++)
        for(let originalY = 0; originalY<8; originalY++)
            if(mypawns[originalX][originalY] != null && mypawns[originalX][originalY].isWhite &&
            (isWhiteTurn || mypawns[originalX][originalY].thereIsOptionToMove(originalX, originalY, mypawns)))
                return false
    return true
}
isWhiteWon(isWhiteTurn, mypawns) {
    for(let originalX = 0; originalX<8;originalX++)
        for(let originalY = 0; originalY<8; originalY++) 
            if(mypawns[originalX][originalY] != null && !(mypawns[originalX][originalY].isWhite) &&
            (!isWhiteTurn || mypawns[originalX][originalY].thereIsOptionToMove(originalX, originalY, mypawns)))
                return false
    return true
}
play(mypawns,myboard,isWhiteTurn,lastClick, newX, newY){
    if (mypawns[lastClick[0]][lastClick[1]] != null &&
    mypawns[lastClick[0]][lastClick[1]].isLegalMove(lastClick[0], lastClick[1], newX, newY, isWhiteTurn, mypawns, this.mult)) {
        this.hundleMove(mypawns,myboard,isWhiteTurn,lastClick[0], lastClick[1], newX, newY)
        if(this.isBlackWon(isWhiteTurn,mypawns))
            return 'blackWon'
        else if (this.isWhiteWon(isWhiteTurn, mypawns))
            return 'whiteWon'
    }
    if(!this.mult)
        this.lastClick = [newX, newY]
}
hundleMove(mypawns,myboard,isWhiteTurn,originalX, originalY, newX, newY) {
    if(!this.mult && (newX - originalX === 1 || newX - originalX === -1))
        this.handleMoveAndBurnedPieces(mypawns,myboard,isWhiteTurn,[originalX, originalY], newX, newY)
    else
        this.handleFullCapture(mypawns,myboard,[originalX, originalY], newX, newY)
    if(!this.mult) {
        this.isWhiteTurn = !this.isWhiteTurn
        this.handleMyQueen(mypawns,myboard,newX, newY)
    }
}
static createBoard(mypawns, myboard) {
    for(let x = 0; x < 8; x++)
        for(let y = 0;y < 8; y++) {
            myboard[x][y] = document.createElement('div')
            if((x % 2 === 0 && y % 2 === 0) || x % 2 === 1 && y % 2 === 1) {
                myboard[x][y].className = 'brown-square'
                if(x<3)
                    CheckersGame.handleNewPawn(mypawns, myboard, x, y, false)
                else if(x>4)
                    CheckersGame.handleNewPawn(mypawns, myboard, x, y, true)
                else
                    mypawns[x][y] = null
            }
            else {
                myboard[x][y].className = 'white-square'
            }
            board.appendChild(myboard[x][y])
        }
}
static handleNewPawn(mypawns, myboard, x, y, isWhite) {
    mypawns[x][y] = new Pawn(isWhite, document.createElement('div'))
    mypawns[x][y].theDiv.className = (isWhite?'white-pawn' : 'black-pawn')
    myboard[x][y].appendChild(mypawns[x][y].theDiv)
}
}