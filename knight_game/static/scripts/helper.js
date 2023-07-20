const get_ID_at_coordinates = (coordinates) =>
  "#" + coordinates.x + "_" + coordinates.y;

const all_moves = (coordinates) => [
  { x: coordinates.x + 1, y: coordinates.y + 2 },
  { x: coordinates.x + 1, y: coordinates.y - 2 },
  { x: coordinates.x - 1, y: coordinates.y + 2 },
  { x: coordinates.x - 1, y: coordinates.y - 2 },
  { x: coordinates.x + 2, y: coordinates.y + 1 },
  { x: coordinates.x + 2, y: coordinates.y - 1 },
  { x: coordinates.x - 2, y: coordinates.y + 1 },
  { x: coordinates.x - 2, y: coordinates.y - 1 },
];

const is_coordinates_bounded = (coordinates) =>
  coordinates.x >= 0 &&
  coordinates.x < 8 &&
  coordinates.y >= 0 &&
  coordinates.y < 8;

const add_valid_class_to_valid_moves = (coordinates) => {
  $(".valid").removeClass("valid");
  all_moves(coordinates).forEach((ele) => {
    var id = get_ID_at_coordinates(ele);
    var pos_valid = is_coordinates_bounded(ele);
    var is_visited = $(id).hasClass("visited");
    if (pos_valid && !is_visited) {
      $(id).addClass("valid");
    }
  });
};

const get_min_valid_move = () => {
  var valid_moves = $(".valid");
  var min_valid_move;
  var min_value = 8;
  for (var i = 0; i < valid_moves.length; i++) {
    var valid_move = valid_moves[i];
    var x = Number(valid_move.getAttribute("posX"));
    var y = Number(valid_move.getAttribute("posY"));

    var value = chessBoard.board_values[x][y];
    if (value < min_value) {
      min_value = value;
      min_valid_move = {
        x: x,
        y: y,
      };
    }
  }
  return min_valid_move;
};

const modify_weight = (move_type) => {
  var weight = -1;
  if (move_type === "back") {
    weight = 1;
  }
  var valid_moves = $(".valid");
  for (var i = 0; i < valid_moves.length; i++) {
    var move = valid_moves[i];
    x = Number(move.getAttribute("posX"));
    y = Number(move.getAttribute("posY"));
    chessBoard.board_values[x][y] += weight;
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const display_message = (message, persist = false) => {
  $("#message").text(message);
  $("#message").stop(true, true).fadeIn(500);
  if (!persist) {
    $("#message").stop(true, true).fadeOut(5000);
  }
};

const is_move_valid = (coordinates) =>
  $("#" + coordinates.x + "_" + coordinates.y).hasClass("valid");
