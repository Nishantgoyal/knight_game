var controls = {
    reset: document.getElementById("reset"),
    back: document.getElementById("back"),
    solution: document.getElementById("solution")
};


controls.reset.addEventListener("click", function() {
    // Behaviour of Reset button

    // 1. Resets the game title
    modify_title("Knight Tour");

    // 2. Resets the board values
    chessBoard.board_values = initialise_board_values();

    // 3. Initialises the chessboard
    chessBoard.initialise();

    // 4. Initialise the state
    state.initialise();
});

controls.back.addEventListener("click", function() {
    state.back();
});

controls.solution.addEventListener("click", function() {
    if (state.trace.length > 0) {
        modify_title("Please reset the board and click on a cell. Then click on solve button");
    } else if (state.cur_coord === undefined) {
        modify_title("Please click on a cell. Then click on solve button");
    } else {
        solve();
    }
});

async function solve() {
    // var cur_pos = state.trace[0];
    for (var i = 1; i < 64; i++) {
        cur_pos = get_min_valid_move();
        state.move(cur_pos);
        await sleep(500);
        // break;
    }
}