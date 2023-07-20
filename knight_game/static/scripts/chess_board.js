var chessBoard = {
  table: null,
  board_values: initialise_board_values(),
  initialise: initialise_chessboard,
  speed: 1000,
};

function initialise_board_values() {
  return [
    [2, 3, 4, 4, 4, 4, 3, 2],
    [3, 4, 6, 6, 6, 6, 4, 3],
    [4, 6, 8, 8, 8, 8, 6, 4],
    [4, 6, 8, 8, 8, 8, 6, 4],
    [4, 6, 8, 8, 8, 8, 6, 4],
    [4, 6, 8, 8, 8, 8, 6, 4],
    [3, 4, 6, 6, 6, 6, 4, 3],
    [2, 3, 4, 4, 4, 4, 3, 2],
  ];
}

function initialise_chessboard() {
  document.querySelector(".chessboard").innerHTML = null;
  document.querySelector(".chessboard").appendChild(create_table());
  this.table = document.querySelector(".chessboard table");
}

function create_table() {
  var table = document.createElement("div");
  table.classList.add("table");
  for (var i = 0; i < 8; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    for (var j = 0; j < 8; j++) {
      var cell = create_cell(i, j);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  return table;
}

function create_cell(i, j) {
  var cell = document.createElement("div");
  var ID = i + "_" + j;
  cell.id = ID;
  cell.classList.add("cell");
  if ((i + j) % 2 === 0) {
    cell.classList.add("white");
  } else {
    cell.classList.add("black");
  }
  cell.setAttribute("posX", i);
  cell.setAttribute("posY", j);
  cell.addEventListener("click", click_listener_on_cell);
  return cell;
}

function click_listener_on_cell() {
  coordinate = {
    x: Number(this.getAttribute("posX")),
    y: Number(this.getAttribute("posY")),
  };
  state.move(coordinate);
}

function modify_visited() {
  $(".visited").removeClass("visited");
  state.trace.forEach(function (coordinate) {
    var id = get_ID_at_coordinates(coordinate);
    $(id).addClass("visited");
  });
}

function update_board(move_type = "forward") {
  $(".knight div").fadeOut(chessBoard.speed / 2, function () {
    $(this).html("");
  });
  $(".knight").removeClass("knight");
  var id = "#" + state.cur_coord.x + "_" + state.cur_coord.y;
  $(id).addClass("knight");
  var div = document.createElement("div");
  $(id).html(div);
  $(id + " div").fadeIn(chessBoard.speed / 2);
  modify_weight(move_type);
  modify_visited();
  add_valid_class_to_valid_moves(state.cur_coord);
  end_game();
}
