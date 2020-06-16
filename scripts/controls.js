var controls = {
    reset: document.getElementById("reset")
};


controls.reset.addEventListener("click", function() {
    chessBoard.initialise();
    state.initialise();
});