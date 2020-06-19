var chessBoard = {
    table: null,
    board_values: initialise_board_values(),
    initialise: initialise_chessboard
};

function initialise_board_values() {
    return [
        [2, 3, 4, 4, 4, 4, 3, 2],
        [3, 4, 6, 6, 6, 6, 4, 3],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [3, 4, 6, 6, 6, 6, 4, 3],
        [2, 3, 4, 4, 4, 4, 3, 2]
    ];
}

function initialise_chessboard() {
    document.querySelector(".chessboard").innerHTML = null;
    document.querySelector(".chessboard").appendChild(create_table());
    this.table = document.querySelector(".chessboard table");
}

function create_table() {
    var table = document.createElement("table");
    for (var i = 0; i < 8; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 8; j++) {
            var cell = create_cell(i, j);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}

function create_cell(i, j) {
    var cell = document.createElement("td");
    var ID = i + "_" + j;
    cell.id = ID;
    cell.classList.add("cell");
    if ((i + j) % 2 === 0) {
        cell.classList.add("white");
    } else {
        cell.classList.add("black");
    }
    cell.setAttribute("posX", (i));
    cell.setAttribute("posY", (j));
    cell.addEventListener("click", click_listener_on_cell);
    // cell.textContent = chessBoard.board_values[i][j];
    return cell;
}

function click_listener_on_cell() {
    coordinate = {
        x: Number(this.getAttribute("posx")),
        y: Number(this.getAttribute("posy"))
    }
    state.move(coordinate);
}

function update_board(move_type = "forward") {
    var id = "#" + state.cur_coord.x + "_" + state.cur_coord.y;
    $(".knight").removeClass("knight");
    $(".visited").removeClass("visited");
    $(id).addClass("knight");
    modify_weight(move_type);
    state.trace.forEach(function(coordinate) {
        var id = get_ID_at_coordinates(coordinate)
        $(id).addClass("visited");
    });
    add_valid_class_to_valid_moves(state.cur_coord);
    end_game();

}