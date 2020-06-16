var controls = {
    reset: document.getElementById("reset"),
    back: document.getElementById("back")
};


controls.reset.addEventListener("click", function() {
    chessBoard.initialise();
    state.initialise();
});

controls.back.addEventListener("click", function() {
    state.back();
});