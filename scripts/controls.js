var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function() {
    document.querySelector(".chessboard").innerHTML = null;
    create_board();
    current_knight_pos = {
        "x": null,
        "y": null
    };
    addOnClick();
});