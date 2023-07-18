var state = {
  cur_coord: undefined,
  trace: [],
  initialise: function () {
    this.cur_coord = undefined;
    this.trace = [];
  },
  move: move,
  back: move_back,
};

function move(coordinate) {
  display_message("");
  if (this.cur_coord === undefined) {
    this.cur_coord = coordinate;
    update_board();
  } else {
    is_valid = is_move_valid(coordinate);
    if (is_valid) {
      this.trace.push(this.cur_coord);
      this.cur_coord = coordinate;
      update_board();
    } else {
      display_message("Invalid Move");
    }
  }
}

function end_game() {
  var visited_count = $(".visited").length;
  if (visited_count === 63) {
    display_message("You Win.", (persist = true));
    return;
  }
  var valid_moves = $(".valid").length;
  if (valid_moves === 0) {
    display_message("Game Over. No More moves", (persist = true));
  }
}

function move_back() {
  if (this.trace.length === 0) {
    if (this.cur_coord === undefined) {
      display_message("No move to go Back.");
    } else {
      display_message("No move to go Back. Please reset the board. ");
    }
    return;
  }
  display_message("Moved back");
  this.cur_coord = this.trace.pop();
  update_board("back");
}
