var controls = {
    reset: document.getElementById("reset"),
    back: document.getElementById("back"),
    solution: document.getElementById("solution")
};


controls.reset.addEventListener("click", function() {
    // Behaviour of Reset button

    // 1. Resets the game title
    modify_title("Knight Tour");
    chessBoard.board_values = initialise_board_values();
    chessBoard.initialise();
    state.initialise();
});

controls.back.addEventListener("click", function() {
    state.back();
});

controls.solution.addEventListener("click", function() {
    if (state.trace.length > 1) {
        modify_title("Please reset the board and click on a cell. Then click on solve button");

    } else if (state.trace.length === 1) {
        solve();
    } else {
        modify_title("Please click on a cell. Then click on solve button");
    }
});

async function solve() {
    var cur_pos = state.trace[0];
    for (var i = 1; i < 64; i++) {
        cur_pos = get_min_valid_move(cur_pos);
        state.move(cur_pos[0], cur_pos[1]);
        await sleep(1000);
    }
}