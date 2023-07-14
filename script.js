function createPlayer(mark, turn){
  let obj = {};
  obj.mark = mark;
  obj.turn = turn;
  return obj;
}

const arrayController = (function (){
  return {
    board: ['','','','','','','','',''],
    setBoard: function(pos, marker){
                arrayController.board[pos] = marker;
              },
    resetBoard: function(){
      arrayController.board = ['','','','','','','','',''];
    }
  }
})();

const displayController = (function(){
  const squares = document.querySelectorAll('.square');
  const text = document.querySelector('h2');
  const resetButton = document.querySelector('.resetButton');

  squares.forEach( (element) => {
    element.addEventListener('click', () => {
      const classes = element.classList.value;
      const pos = classes.charAt(classes.length - 1);
      gameController.playTurn(element, pos);
    });
  });

  resetButton.addEventListener('click', () => {
    arrayController.resetBoard();
    gameController.resetGameController();
    squares.forEach( (element) => {
      displayController.drawMark(element, '');
    });
    displayController.changeMessage(`Player X turn`);
    for(let i = 0; i < 9; i++){
      squares[i].classList.remove('winner-square');
    }
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
  let player1 = createPlayer('X', true);
  let player2 = createPlayer('O', false);
  let isOver;
  const winArray = [[0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]];

  function detectIsOver() {
    let counter = 0;
    for(let i = 0; i<8; i++){
      if(arrayController.board[winArray[i][0]] === arrayController.board[winArray[i][1]] && arrayController.board[winArray[i][0]] === arrayController.board[winArray[i][2]] && arrayController.board[winArray[i][0]] !== '') {
        displayController.changeMessage(`Player ${arrayController.board[winArray[i][0]]} wins!`);
        displayController.colorWinnerSquare(winArray[i]);
        return true;
      }
    }
    for(let i = 0; i<9; i++) {
      if(arrayController.board[i] !== ''){
        counter++;
        console.log(counter);
      }
    }
    if(counter === 9) {
      displayController.changeMessage(`Draw!`);
      return true;
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
    },
    resetGameController: function(){
      player1.turn = true;
      player2.turn = false;
      isOver = false;
    }
  }
})();