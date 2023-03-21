import { Pawn, Queen } from "./classesForDamka.js";
export class Util {
    static createBoard(mypawns, myboard) {
        for(let x = 0; x < 8; x++)
            for(let y = 0;y < 8; y++) {
                myboard[x][y] = document.createElement('div')
                if((x % 2 === 0 && y % 2 === 0) || x % 2 === 1 && y % 2 === 1) {
                    myboard[x][y].className = 'brown-square'
                    if(x<3)
                        Util.makePawn(mypawns, myboard, x, y, false)
                    else if(x>4)
                        Util.makePawn(mypawns, myboard, x, y, true)
                    else
                        mypawns[x][y] = null
                }
                else
                    myboard[x][y].className = 'white-square'
                board.appendChild(myboard[x][y])
            }
    }
    static makePawn(mypawns, myboard, x, y, isWhite) {
        mypawns[x][y] = new Pawn(isWhite, document.createElement('div'))
        mypawns[x][y].theDiv.className = (isWhite?'white-pawn' : 'black-pawn')
        myboard[x][y].appendChild(mypawns[x][y].theDiv)
    }
    static makeQueen(mypawns,myboard, newX, newY,isWhite) {
        mypawns[newX][newY].theDiv.className = 'none'
        mypawns[newX][newY] = new Queen (isWhite, document.createElement('div'),document.createElement('img'))
        mypawns[newX][newY].theDiv.className = (isWhite?'white-pawn':'black-pawn')
        mypawns[newX][newY].container.className = 'queen'
        mypawns[newX][newY].container.src = 'https://www.pngfind.com/pngs/m/286-2865290_this-free-icons-png-design-of-chess-piece.png'
        mypawns[newX][newY].theDiv.appendChild(mypawns[newX][newY].container)
        myboard[newX][newY].appendChild(mypawns[newX][newY].theDiv)
    }
} 