var initGameFlag = false;
function setup() {
  createCanvas(100,100);
  createP("Open the browser console in order to see the game's progress before clicking in the Play button.");
  createP("Otherwise the game is going to start and the presented dialog boxes will not allow you to access the browser console.");
  var initGameButton = createButton("Play");
  initGameButton.mousePressed(() => initGameFlag = true);
}

function playGame(){
    while(true){
      var board = new Board();
      board.gameBoard = [['-','-','-'],['-','-','-'],['-','-','-']];
      var ticTacToe;
      var minMaxTree;
      var root = new Node(null,board);
      
      var chosenPlayer = prompt("Type X(or x) or O(or o) to define your player");
      
      if(chosenPlayer=='x' || chosenPlayer=='X'){
        var leftPlays = 9;
        while(true){
          var playerInputs = getInputValues();
          if(playerInputs!=null){
            if(board.playAtCell("X",playerInputs.playedRow,playerInputs.playedColumn)){
              if(verifyGameHasEnded(board,"X")) break;
              leftPlays--;
              board.showGameBoard();
              
              root = new Node(null,board);
              ticTacToe = new TicTacToe(board);
              ticTacToe.generateTree(root,leftPlays,false);
              minMaxTree = new MinMaxTree(root,leftPlays);
              minMaxTree.minMax(root,false);
              root = ticTacToe.searchAINextMove(root,false);
              board = root.board;
              board.showGameBoard();
              leftPlays--;
              if(verifyGameHasEnded(board,"O")) break;
            }else{
              console.log("Line and/or Column are not between 0 - 2 or you tried to play on an already filled position!");
              console.log("Please, try again!");
              continue;
            }
          }else{
            continue;
          }
        }
      }else if(chosenPlayer=='o' || chosenPlayer=='O'){
        var leftPlays = 9;
        while(true){
          root = new Node(null,board);
          ticTacToe = new TicTacToe(board);
          ticTacToe.generateTree(root,leftPlays,true);
          minMaxTree = new MinMaxTree(root,leftPlays);
          minMaxTree.minMax(root,true);
          root = ticTacToe.searchAINextMove(root,true);
          board = root.board;
          board.showGameBoard();
          leftPlays--;
          if(verifyGameHasEnded(board,"X")) break;
          var playerInputs = getInputValues();
          if(playerInputs!=null){
            if(board.playAtCell("O",playerInputs.playedRow,playerInputs.playedColumn)){
              if(verifyGameHasEnded(board,"O")) break;
              leftPlays--;
              board.showGameBoard();
          }else{
            console.log("Line and/or Column are not between 0 - 2 or you tried to play on an already filled position!");
            console.log("Please, try again!");
          }
        }else{          
          continue;
        }
      }
        
      }else{
        continue;
      }
    }
  }

  function verifyGameHasEnded(board,lastPlayer){
    if(board.gameHasEndedWithWinner()){
      console.log("Player ",lastPlayer," won the game!");
      return true;
    }else if(board.isBoardFilled()){
      console.log("None of you won!");
      return true;
    }else{
      return false;
    }
  }

  function getInputValues(){
    var row = prompt("Type the line you want to play(0, 1 or 2)");
    var column = prompt("Type the column you want to play(0, 1 or 2)");
    if((row >=0 && row <=2) && (column >=0 && column<=2)){
      return {playedRow:row,playedColumn:column};
    }
    return null;
  }

  function draw() {
    if(initGameFlag){
      playGame();
    }
  }
