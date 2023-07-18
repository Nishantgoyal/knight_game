var controls = {
  reset: document.getElementById("reset"),
  back: document.getElementById("back"),
  solution: document.getElementById("solution"),
  info: document.getElementById("info"),
};
controls.info.addEventListener("click", function () {
  message =
    "Find a Sequence of moves for the knight such that it visits every square exactly once";
  display_message(message, (persist = true));
});

controls.reset.addEventListener("click", function () {
  // Behaviour of Reset button
  chessBoard.speed = 1000;
  if (state.cur_coord === undefined) {
    return;
  }
  display_message("Board Reset");
  chessBoard.board_values = initialise_board_values();
  chessBoard.initialise();
  state.initialise();
});

controls.back.addEventListener("click", function () {
  state.back();
});

controls.solution.addEventListener("click", function () {
  if (state.trace.length > 0) {
    display_message(
      "Please reset the board and click on a cell. Then click on solve button.",
      (persist = true)
    );
  } else if (state.cur_coord === undefined) {
    display_message(
      "Please click on a cell. Then click on solve button",
      (persist = true)
    );
  } else {
    solve();
  }
});

async function solve() {
  // var cur_pos = state.trace[0];
  chessBoard.speed = 0;
  for (var i = 1; i < 64; i++) {
    cur_pos = get_min_valid_move();
    state.move(cur_pos);
    await sleep(400);
    // break;
  }
}
