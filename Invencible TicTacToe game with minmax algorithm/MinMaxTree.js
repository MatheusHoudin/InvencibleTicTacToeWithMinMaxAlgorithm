/**
 * This class represents creates MinMaxAlgorithm of TicTacToe's game instance.
 */
class MinMaxTree{
    

  /**
   * 
   * @param {Node} node 
   * @param {boolean} isMaximizer 
   * This method set up the tree to be used with MinMax values.
   * It does not use the prunning technique, it was implemented before but due to some found problems
   * in the MinMax values setup it was removed.
   */
  minMax(node,isMaximizer){

    if(node.children.length == 0){
      return node.value;
    }

    if(isMaximizer){
      var bestValue = Number.NEGATIVE_INFINITY;
      node.children.some((actualNode,index,array) => {
        var value = this.minMax(actualNode,!isMaximizer);
        bestValue = value != null ? Math.max(bestValue,value) : bestValue;
        actualNode.parent.value = bestValue;
      });
      return bestValue;
    }else{
      var bestValue = Number.POSITIVE_INFINITY;
      node.children.some((actualNode,index,array) => {
        var value = this.minMax(actualNode,!isMaximizer);
        bestValue = value != null ? Math.min(bestValue,value) : bestValue;
        actualNode.parent.value = bestValue;
      });
      return bestValue;
    }

  }
    
    set root(root){
      this._root = root;
    }
    
    set depth(depth){
      this._depth = depth;
    }
    
    get root(){
      return this._root;
    }
    
    get depth(){
      return this._depth;
    }
  }