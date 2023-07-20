const chessBoard = {
  table: null,
  board_values: initialise_board_values(),
  initialise: function () {
    document.querySelector(".chessboard").innerHTML = null;
    document.querySelector(".chessboard").appendChild(create_table());
    this.table = document.querySelector(".chessboard table");
  },
  speed: 1000,
};

chessBoard.initialise();
