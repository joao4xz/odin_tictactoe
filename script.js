function createPlayer(name, mark, turn){
  let obj = {};
  obj.name = name;
  obj.mark = mark;
  obj.turn = turn;
  return obj;
}


const arrayController = (function (){
  let board = ['','','','','','','','',''];

  return {
    getBoard: function(){
                return board;
              },
    setBoard: function(pos, marker){
                board[pos] = marker;
              }
  }
})();

const displayController = (function(){
  const squares = document.querySelectorAll('.square');

  
  squares.forEach( (element) => {
    element.addEventListener('click', () => {
      const classes = element.classList.value;
      const pos = classes.charAt(classes.length - 1);
      gameController.playTurn(element, pos);
    });
  });

  return {
    drawMark: function(square, mark){
                square.textContent = mark;
              }
  }
})();

const gameController = (function(){
  player1 = createPlayer('Player 1', 'X', true);
  player2 = createPlayer('Player 2', 'O', false);

  return {
    playTurn: function(square, pos){
      if(player1.turn) {
        arrayController.setBoard(pos, player1.mark);
        displayController.drawMark(square, player1.mark);
        player1.turn = false;
        player2.turn = true;
      }else if(player2.turn) {
        arrayController.setBoard(pos, player2.mark);
        displayController.drawMark(square, player2.mark);
        player2.turn = false;
        player1.turn = true;
      }
      console.log(arrayController.getBoard());
    }
  }
})();

// Game Flow Function
(function(){
  let isOver = false;

  const board = arrayController.getBoard();

})();