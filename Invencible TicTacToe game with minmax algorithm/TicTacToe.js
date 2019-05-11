/**
 * This class represents the Tic Tac Toe game.
 * - Attributes
 *  - board represents a Board object.
 */
class TicTacToe{
    constructor(board){
        this._board = board;
    }

    /**
     * @param {Node} currentNode 
     * @param {boolean} isMaximizerPlayer
     * This method searches among a node's children to find the next best path to follow, in other words
     * the next best move. This search depends on the player that is being passed to the currentNode parameter,
     * it could either be X or O.
     * 
     * @returns {Node} selectedNode 
     */
    searchAINextMove(currentNode,isMaximizerPlayer){
        var selectedNode = null;
        for(var i=0;i<currentNode.children.length;i++){
            if(currentNode.children[i] == null) continue;
            if(isMaximizerPlayer){
                if(currentNode.children[i].value == 1){
                    return currentNode.children[i];
                }
            }else{
                if(currentNode.children[i].value == -1){
                    return currentNode.children[i];
                }
            }
            if(currentNode.children[i].value == 0){
                selectedNode = currentNode.children[i];
            }
        }
        return selectedNode;
    }

    /**
     * 
     * @param {Node} node 
     * @param {int} childrenNumber
     * @param {boolean} isMaximizerPlayer
     * 
     * This recursive method generates all the TicTacToe's game tree that is used to represent all the possible moves
     * on the entire game. Terminal states(leaves) are always going to have a value 0, 1 or -1 whether the game
     * has ended with a draw or with a winner(1 to X and 0 to 0).
     * 
     * This method follows a depth search approach to create the tree.
     */
    generateTree(node,childrenNumber,isMaximizerPlayer){
        var player = isMaximizerPlayer ? 'X' : 'O';
        node.player = player;
        var possibleMoves = node.board.getPossibleMoves();

        for(var i=0;i<childrenNumber;i++){
            var nextMove = possibleMoves.shift();
            var boardCopy = node.board.copyGameBoard();
            boardCopy.playAtCell(player,nextMove.row,nextMove.column);

            var childNode = new Node(null,boardCopy);
            node.addChild(childNode);

            if(boardCopy.isBoardFilled() && !boardCopy.gameHasEndedWithWinner()){
                childNode.value = 0;
            }else if(boardCopy.gameHasEndedWithWinner()){
                if(player == 'x' || player == 'X'){
                    childNode.value = 1;
                }else if(player == 'o' || player == 'O'){
                    childNode.value = -1;
                }
            }else{
                this.generateTree(childNode,childrenNumber-1,!isMaximizerPlayer);
            }
        }
        return;
    }

    set board(board){
        this._board=board;
    }

    get board(){
        return this._board;
    }
}