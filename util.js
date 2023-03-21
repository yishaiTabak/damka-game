import { Pawn, Queen } from "./classesForDamka.js";
export class Util {
    static createBoard(pieces, myboard, board) {
        for(let x = 0; x < 8; x++)
            for(let y = 0;y < 8; y++) {
                myboard[x][y] = document.createElement('div')
                if((x % 2 === 0 && y % 2 === 0) || x % 2 === 1 && y % 2 === 1) {
                    myboard[x][y].className = 'brown-square'
                    if(x<3)
                        Util.makePawn(pieces, myboard, x, y, false)
                    else if(x>4)
                        Util.makePawn(pieces, myboard, x, y, true)
                    else
                        pieces[x][y] = null
                }
                else
                    myboard[x][y].className = 'white-square'
                board.appendChild(myboard[x][y])
            }
    }
    static makePawn(pieces, myboard, x, y, isWhite) {
        pieces[x][y] = new Pawn(isWhite, document.createElement('div'))
        pieces[x][y].theDiv.className = (isWhite?'white-pawn' : 'black-pawn')
        myboard[x][y].appendChild(pieces[x][y].theDiv)
    }
    static makeQueen(pieces,myboard, destinationRow, destinationColumn,isWhite) {
        pieces[destinationRow][destinationColumn].theDiv.className = 'none'
        pieces[destinationRow][destinationColumn] = new Queen (isWhite, document.createElement('div'),document.createElement('img'))
        pieces[destinationRow][destinationColumn].theDiv.className = (isWhite?'white-pawn':'black-pawn')
        pieces[destinationRow][destinationColumn].container.className = 'queen'
        pieces[destinationRow][destinationColumn].container.src = 'https://www.pngfind.com/pngs/m/286-2865290_this-free-icons-png-design-of-chess-piece.png'
        pieces[destinationRow][destinationColumn].theDiv.appendChild(pieces[destinationRow][destinationColumn].container)
        myboard[destinationRow][destinationColumn].appendChild(pieces[destinationRow][destinationColumn].theDiv)
    }
} 