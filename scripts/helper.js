function get_cell(coordinates) {
    return chessBoard.table.rows[coordinates.x].cells[coordinates.y];
}

function get_ID_at_coordinates(coordinates) {
    // It returns the ID of the cell at the given coordinates
    // E.g.: coordinates: (3,2) --> cell with ID "3_2"
    return "#" + coordinates.x + "_" + coordinates.y;
}

function add_knight(cur_coordinates) {
    var cell = chessBoard.table.rows[cur_coordinates.x].cells[cur_coordinates.y];
    cell.classList.remove("visited");
    cell.classList.add("knight");
}

function clear_knight(coordinates) {
    if (coordinates === undefined) {
        return;
    }
    var cell = get_cell(coordinates);
    cell.classList.add("visited");
    // cell.textContent = null;
    cell.classList.remove("knight");
}

function clear_coordinates(coordinates) {
    $(get_ID_at_coordinates(coordinates)).removeClass("knight");
    $(get_ID_at_coordinates(coordinates)).removeClass("visited");
}

function all_moves(coordinates) {
    return [
        [coordinates.x + 1, coordinates.y + 2],
        [coordinates.x + 1, coordinates.y - 2],
        [coordinates.x - 1, coordinates.y + 2],
        [coordinates.x - 1, coordinates.y - 2],
        [coordinates.x + 2, coordinates.y + 1],
        [coordinates.x + 2, coordinates.y - 1],
        [coordinates.x - 2, coordinates.y + 1],
        [coordinates.x - 2, coordinates.y - 1],
    ];
}

function is_coordinates_bounded(coordinates) {
    return (
        coordinates.x >= 0 && coordinates.x < 8 &&
        coordinates.y >= 0 && coordinates.y < 8
    );
}

function is_cell_visited(coordinates) {
    var classes = get_cell(coordinates).classList;
    var is_visited = false;
    classes.forEach(function(class_name) {
        if (class_name == "visited") {
            is_visited = true;
        }
    });
    return is_visited;
}

function is_valid_move(coordinates) {
    var pos_valid = is_coordinates_bounded(coordinates);
    if (!pos_valid) {
        return pos_valid;
    }
    var is_visited = is_cell_visited(coordinates);
    return !is_visited;
}

function clear_valid_moves() {
    $(".valid").removeClass("valid");
}

function add_valid_moves(coordinates) {
    clear_valid_moves();
    var valid_moves_list = [];
    var all_moves_list = all_moves(coordinates);
    all_moves_list.forEach(function(ele) {
        if (is_valid_move(ele)) {
            id = get_ID_at_coordinates(ele);
            $(id).addClass("valid");
            valid_moves_list.push(ele);
        }
    })
    return valid_moves_list;
}

function get_valid_moves(coordinates) {
    var valid_moves_list = [];
    var all_moves_list = all_moves(coordinates);
    all_moves_list.forEach(function(ele) {
        if (is_valid_move(ele)) {
            valid_moves_list.push(ele);
        }
    })
    return valid_moves_list;
}

function get_min_valid_move(coordinates) {
    var valid_moves = get_valid_moves(coordinates);
    var min_valid_move;
    var min_value = 8;
    for (var i = 0; i < valid_moves.length; i++) {
        var value = chessBoard.board_values[valid_moves[i][0]][valid_moves[i][1]];
        if (value < min_value) {
            min_value = value;
            min_valid_move = valid_moves[i];
        }
    }
    return min_valid_move;
}

function modify_weight(coordinates, weight) {
    var valid_moves = get_valid_moves(coordinates);
    // console.log(valid_moves);
    for (var i = 0; i < valid_moves.length; i++) {
        chessBoard.board_values[valid_moves[i][0]][valid_moves[i][1]] += weight;
        // var cell = get_cell(valid_moves[i]);
        // cell.textContent = chessBoard.board_values[valid_moves[i][0]][valid_moves[i][1]];
    }
}

function sleep(ms) {
    // ms = 10;
    return new Promise(resolve => setTimeout(resolve, ms));
}

function remove_highlight_class() {
    $(".highlight").removeClass("highlight");
}

function hightlight_valid_moves(cur_coordinates) {
    remove_highlight_class();

    var valid_moves = get_valid_moves([
        cur_coordinates.x,
        cur_coordinates.y
    ]);
    // console.log(valid_moves);
    valid_moves.forEach(function(move) {
        var cell = get_cell(move);
        // console.log(cell);
        cell.classList.add("highlight");
    });
}

function modify_title(message) {
    // Changes the message of the game-title element
    $("#game-title").text(message);
}

function is_move_valid(coordinates, move) {
    // It checks the current coordinates, and move player is trying to make. 
    // It returns true if move is one of the valid moves else false
    is_valid = false;
    var valid_moves = get_valid_moves(coordinates);
    for (var i = 0; i < valid_moves.length; i++) {
        if (coordinates.x === valid_moves[i][0] && coordinates.y === valid_moves[i][1]) {
            is_valid = true;
        }
    }
    return is_valid;
}