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
  all_moves(coordinates).forEach((coordinate) => {
    const id = `#${coordinate.x}_${coordinate.y}`;
    const pos_valid = is_coordinates_bounded(coordinate);
    const is_visited = $(id).hasClass("visited");
    if (pos_valid && !is_visited) {
      $(id).addClass("valid");
    }
  });
};

const get_min_valid_move = () => {
  const valid_moves = $(".valid");
  let min_valid_move;
  let min_value = 8;
  for (let i = 0; i < valid_moves.length; i++) {
    const id = valid_moves[i]
      .getAttribute("id")
      .split("_")
      .map((num) => Number(num));
    const value = chessBoard.board_values[id[0]][id[1]];
    if (value < min_value) {
      min_value = value;
      min_valid_move = {
        x: id[0],
        y: id[1],
      };
    }
  }
  return min_valid_move;
};

const modify_weight = (move_type) => {
  let weight = -1;
  if (move_type === "back") {
    weight = 1;
  }
  const valid_moves = $(".valid");
  for (let i = 0; i < valid_moves.length; i++) {
    const id = valid_moves[i]
      .getAttribute("id")
      .split("_")
      .map((num) => Number(num));
    chessBoard.board_values[id[0]][id[1]] += weight;
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const display_message = (message, persist = false) => {
  $(".message").text(message);
  $(".message").stop(true, true).fadeIn(1000);
  if (!persist) {
    $(".message").stop(true, true).fadeOut(5000);
  }
};

const initialise_board_values = () => [
  [2, 3, 4, 4, 4, 4, 3, 2],
  [3, 4, 6, 6, 6, 6, 4, 3],
  [4, 6, 8, 8, 8, 8, 6, 4],
  [4, 6, 8, 8, 8, 8, 6, 4],
  [4, 6, 8, 8, 8, 8, 6, 4],
  [4, 6, 8, 8, 8, 8, 6, 4],
  [3, 4, 6, 6, 6, 6, 4, 3],
  [2, 3, 4, 4, 4, 4, 3, 2],
];

const create_table = () => {
  const table = document.createElement("div");
  table.classList.add("table");
  for (let i = 0; i < 8; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 8; j++) {
      const cell = create_cell(i, j);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  return table;
};

const create_cell = (i, j) => {
  const cell = document.createElement("div");
  cell.id = `${i}_${j}`;
  cell.classList.add("cell");
  if ((i + j) % 2 === 0) {
    cell.classList.add("white");
  } else {
    cell.classList.add("black");
  }
  cell.addEventListener("click", (event) => {
    const id = event.target
      .getAttribute("id")
      .split("_")
      .map((num) => Number(num));
    coordinate = {
      x: id[0],
      y: id[1],
    };
    state.move(coordinate);
  });
  return cell;
};

const modify_visited = () => {
  $(".visited").removeClass("visited");
  state.trace.forEach((coordinate) => {
    const id = `#${coordinate.x}_${coordinate.y}`;
    $(id).addClass("visited");
  });
};

const end_game = () => {
  const visited_count = $(".visited").length;
  if (visited_count === 63) {
    display_message("You Win.", (persist = true));
    return;
  }
  const valid_moves = $(".valid").length;
  if (valid_moves === 0) {
    display_message("Game Over. No More moves", (persist = true));
  }
};

const update_board = (move_type = "forward") => {
  $(".knight div").fadeOut(chessBoard.speed / 2, () => {
    $(this).html("");
  });
  $(".knight").removeClass("knight");
  const id = `#${state.cur_coord.x}_${state.cur_coord.y}`;
  $(id).addClass("knight");
  const div = document.createElement("div");
  $(id).html(div);
  $(`${id} div`).fadeIn(chessBoard.speed / 2);
  modify_weight(move_type);
  modify_visited();
  add_valid_class_to_valid_moves(state.cur_coord);
  end_game();
};


const update_progress_bar = () => {
  document.getElementById('progress-bar').style.height = `${state.trace.length}vh`;
};
