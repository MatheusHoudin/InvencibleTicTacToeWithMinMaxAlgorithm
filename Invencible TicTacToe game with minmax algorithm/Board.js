/**
 * This class represents the Tic Tac Toe's game board.
 * 
 * - Attributes
 *  - _gameBoard is a 3x3 matrix that holds the players' moves.
 */
class Board{
    constructor(){
        this._gameBoard = [['-','-','-'],['-','-','-'],['-','-','-']];
    }

    /**
     * It copies the board's values to a new board and returns it so that changes on the latter will not affect
     * the current one.
     * @returns Board
     */
    copyGameBoard(){
        var copy = [];
        for(var i=0;i<this._gameBoard.length;i++){
            copy[i] = this._gameBoard[i].slice(0);
        }
        var board = new Board();
        board.gameBoard = copy;
        return board;
    }

    /**
     * @param {string} player 
     * @param {int} row 
     * @param {int} column 
     * Inserts the player value(X or O) in the board matrix on the specified position by row and column
     * only if that position is not filled yet.
     * Returns a boolean value equals true to specify if the move could be made, otherwise it returns false.
     * @returns boolean
     */
    playAtCell(player,row,column){
        if(!this.gameHasEndedWithWinner() || !this.isBoardFilled()){
            if(this._gameBoard[row][column]=='-'){
                this._gameBoard[row][column] = player;
                return true;
            }else{
                return false;
            }
        }
        return false;
    }

    /**
     * @param {int} row 
     * @param {int} column 
     * Inserts the value - on a cell.
     */
    deleteCellAt(row,column){
        this._gameBoard[row][column] = '-';
    }

    /**
     * This method searches for all the not filled positions which are the ones with the '-' value and
     * inserts an object with the row and column in an array.
     * @returns {array({int,int})} {row,column}
     */
    getPossibleMoves(){
        var possibleMoves = [];
        for(var i=0;i<this._gameBoard.length;i++){
            for(var j=0;j<this._gameBoard.length;j++){
                if(this._gameBoard[i][j] == '-'){
                    possibleMoves.push({row:i,column:j});
                }
            }
        }
        return possibleMoves;
    }

    /** 
     * @param {string} player 
     * It places the player value in the next not filled position and returns an object with the played position if the
     * move was possible, otherwise it returns an object with a null played position.
     * @returns {int,int} row,column
     */
    play(player){
        if(!this.gameHasEndedWithWinner() || !this.isBoardFilled()){
            for(var i=0;i<this._gameBoard.length;i++){
                for(var j=0;j<this._gameBoard.length;j++){
                    if(this._gameBoard[i][j]=='-'){
                        this._gameBoard[i][j] = player;
                        return {row: i, column: j};
                    }
                }
            }
        }
        return {row: null, column: null};
    }

    /**
     * It verifies if all the board is filled with either X or O values and there is no - value left.
     * @returns boolean
     */
    isBoardFilled(){
        for(var i=0;i<this._gameBoard.length;i++){
            for(var j=0;j<this._gameBoard.length;j++){
                if(this._gameBoard[i][j]=='-'){
                    return false;
                }
            }
        }
        return true;
    }

    gameHasEndedWithWinner(){
        return this.existsCrossedColumn() || this.existsCrossedRow() || this.existsCrossedDiagonal();
    }

    existsCrossedColumn(){
        return this.areColumnItemsTheSameAndFilled(0) || this.areColumnItemsTheSameAndFilled(1) || this.areColumnItemsTheSameAndFilled(2);
    }

    existsCrossedRow(){
        return this.areRowItemsTheSameAndFilled(0) || this.areRowItemsTheSameAndFilled(1) || this.areRowItemsTheSameAndFilled(2);
    }

    existsCrossedDiagonal(){
        return this.isFirstDiagonalItemsTheSameAndFilled() || this.isSecondDiagonalItemsTheSameAndFilled();
    }

    isFirstDiagonalItemsTheSameAndFilled(){
        return this._gameBoard[2][0] != '-' &&
         ((this._gameBoard[2][0] == this._gameBoard[1][1]) &&
          (this._gameBoard[1][1] == this._gameBoard[0][2]));
    }

    isSecondDiagonalItemsTheSameAndFilled(){
        return this._gameBoard[0][0] != '-' &&
         ((this._gameBoard[0][0] == this._gameBoard[1][1]) &&
          (this._gameBoard[1][1] == this._gameBoard[2][2]));
    }

    areColumnItemsTheSameAndFilled(column){
        return this._gameBoard[0][column] != '-' && 
        ((this._gameBoard[0][column] == this._gameBoard[1][column]) &&
        (this._gameBoard[1][column] == this._gameBoard[2][column]));
    }

    areRowItemsTheSameAndFilled(row){
        return this._gameBoard[row][0] != '-' &&
        ((this._gameBoard[row][0] == this._gameBoard[row][1]) &&
        (this._gameBoard[row][1] == this._gameBoard[row][2]));
    }

    get gameBoard(){
        return this._gameBoard;
    }

    set gameBoard(gameBoard){
        this._gameBoard = gameBoard;
    }

    toString(){
        var value = null;
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                value += this._gameBoard[i][j];
            }
        }
        return value;
    }

    showGameBoard(){
        for(var i=0;i<3;i++){
            console.log(this._gameBoard[i][0]+" | "+this._gameBoard[i][1]+" | "+this._gameBoard[i][2]);
        }
        console.log("");
    }
}