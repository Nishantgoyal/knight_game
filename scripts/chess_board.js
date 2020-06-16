var chessBoard = {
    table: null,
    board_values: [
        [2, 3, 4, 4, 4, 4, 3, 2],
        [3, 4, 6, 6, 6, 6, 4, 3],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [3, 4, 6, 6, 6, 6, 4, 3],
        [2, 3, 4, 4, 4, 4, 3, 2]
    ],

    initialise: function() {
        document.querySelector(".chessboard").innerHTML = null;
        var chessboard = document.querySelector(".chessboard");
        var table = document.createElement("table");
        for (var i = 0; i < 8; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < 8; j++) {
                var cell = document.createElement("td");
                cell.classList.add("cell");
                if ((i + j) % 2 == 0) {
                    cell.classList.add("white");
                } else {
                    cell.classList.add("black");
                }
                // cell.textContent = this.board_values[i][j];
                cell.addEventListener("click", function(event) {
                    posX = event.target.getAttribute("posX");
                    posY = event.target.getAttribute("posY");
                    state.move(posX, posY);
                });
                cell.setAttribute("posX", (i));
                cell.setAttribute("posY", (j));

                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        chessboard.appendChild(table);
        this.table = document.querySelector(".chessboard table");
    }
};