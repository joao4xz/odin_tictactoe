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
  const text = document.querySelector('h2');

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
              },
    changeMessage: function(message){
      text.textContent = message;
    },
    colorWinnerSquare: function(positions){
      for(let i = 0; i < 3; i++){
        squares[positions[i]].classList.add('winner-square');
      }
    } 
  }
})();

const gameController = (function(){
  const player1 = createPlayer('Player 1', 'X', true);
  const player2 = createPlayer('Player 2', 'O', false);
  let isOver
  const board = arrayController.getBoard();
  const winArray = [[0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]];

  function detectIsOver() {
    for(let i = 0; i<8; i++){
      if(board[winArray[i][0]] === board[winArray[i][1]] && board[winArray[i][0]] === board[winArray[i][2]] && board[winArray[i][0]] !== '') {
        displayController.changeMessage(`Player ${board[winArray[i][0]]} wins!`);
        displayController.colorWinnerSquare(winArray[i]);
        return true;
      }
    }
  }

  return {
    playTurn: function(square, pos){
      if(square.textContent === '' && !isOver){
        const currentPlayer = player1.turn ? player1 : player2;
        const nextPlayer = player1.turn ? player2 : player1;

        arrayController.setBoard(pos, currentPlayer.mark);
        displayController.drawMark(square, currentPlayer.mark);
        displayController.changeMessage(`Player ${nextPlayer.mark} turn`);

        currentPlayer.turn = false;
        nextPlayer.turn = true;

        isOver = detectIsOver();
      }
    }
  }
})();