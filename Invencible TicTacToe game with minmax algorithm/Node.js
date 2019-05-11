/**
 * This class represents a TicTacToe's game state on the game tree, or in other words,
 * a possible move to one of the two players.
 * 
 * - Attributes
 *    - _value represents one of the possible values of the game, either 0(draw), 1(X won) or -1(O won).
 *    - _children represents the next possible moves on the Tic Tac Toe game.
 *    - _player can be either the X or O player.
 *    - _board is a 3x3 matrix that holds the game's state.
 */
class Node{

  constructor(nodeValue,board){
    this._value = nodeValue;
    this._children = [];
    this._player = undefined;
    this._board = board;
  }
  
  addChild(child){
    this._children.push(child);
    child.parent = this;
  }

  get parent(){
    return this._parent;
  }

  get board(){
    return this._board;
  }
  
  get value(){
    return this._value;
  }
  
  get children(){
    return this._children;
  }

  get player(){
    return this._player;
  }
  
  set player(player){
    this._player = player;
  }
  set value(nodeValue){
    this._value = nodeValue;
  }

  set parent(parent){
    this._parent = parent;
  }

  set board(board){
    this._board = board;
  }
}
