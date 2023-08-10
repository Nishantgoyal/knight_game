const controls = {
  reset: document.getElementById("reset"),
  back: document.getElementById("back"),
  solution: document.getElementById("solution"),
  info: document.getElementById("info"),
};

controls.info.addEventListener("click", () => {
  message =
    "Find a Sequence of moves for the knight such that it visits every square exactly once";
  display_message(message, (persist = true));
});

controls.reset.addEventListener("click", () => {
  chessBoard.speed = 1000;
  if (state.cur_coord === undefined) {
    return;
  }
  display_message("Board Reset");
  chessBoard.board_values = initialise_board_values();
  chessBoard.initialise();
  state.initialise();
  update_progress_bar();

});

controls.back.addEventListener("click", () => {
  state.back();
  update_progress_bar();

});

controls.solution.addEventListener("click", () => {
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

const solve = async () => {
  chessBoard.speed = 0;
  for (let i = 1; i < 64; i++) {
    cur_pos = get_min_valid_move();
    state.move(cur_pos);
    await sleep(400);
  }
};
