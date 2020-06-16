var controls = {
    reset: document.getElementById("reset"),
    back: document.getElementById("back"),
    solution: document.getElementById("solution")
};


controls.reset.addEventListener("click", function() {
    chessBoard.initialise();
    state.initialise();
});

controls.back.addEventListener("click", function() {
    state.back();
});

controls.solution.addEventListener("click", solve);