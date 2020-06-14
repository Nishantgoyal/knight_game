function assign_class_to_cell(cell, cell_row, cell_col) {
    cell.classList.add("cell");
    if ((cell_row + cell_col) % 2 == 0) {
        cell.classList.add("white");
    } else {
        cell.classList.add("black");
    }
}

function create_board() {
    var chessboard = document.querySelector(".chessboard");
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");
    for (var i = 0; i < 8; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 8; j++) {
            var cell = document.createElement("td");
            assign_class_to_cell(cell, i, j);
            row.appendChild(cell);

        }
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    chessboard.appendChild(table);
}

create_board()