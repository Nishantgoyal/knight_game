function create_knight_image() {
    var knight_img = new Image();
    knight_img.src = "images/knight_image.png";
    knight_img.classList = ["img-fluid"];
    return knight_img;
}

function get_cell(position) {
    pos_x = Number(position[0]);
    pos_y = Number(position[1]);
    return chessBoard.table.rows[pos_x].cells[pos_y];
}

function add_knight(position) {
    var cell = get_cell(position);
    cell.classList.add("knight");
    var knight_img = create_knight_image();
    cell.innerHTML = null;
    cell.appendChild(knight_img);
}

function clear_knight(position) {
    if (position.length === 0) {
        return;
    }
    var cell = get_cell(position);
    cell.classList.add("visited");
    cell.textContent = "x";
    cell.classList.remove("knight");
}

function move_back_knight(position) {
    var cell = get_cell(position);
    cell.innerHTML = null;
    cell.classList.remove("knight");
    cell.classList.remove("visited");
}

function all_moves(pos_x, pos_y) {
    var all_moves_list = [
        [pos_x + 1, pos_y + 2],
        [pos_x + 1, pos_y - 2],
        [pos_x - 1, pos_y + 2],
        [pos_x - 1, pos_y - 2],
        [pos_x + 2, pos_y + 1],
        [pos_x + 2, pos_y - 1],
        [pos_x - 2, pos_y + 1],
        [pos_x - 2, pos_y - 1],
    ];
    return all_moves_list;
}

function is_position_bounded(position) {
    pos_x = Number(position[0]);
    pos_y = Number(position[1]);
    return (pos_x >= 0 && pos_x < 8 && pos_y >= 0 && pos_y < 8);
}

function is_cell_visited(position) {
    var classes = get_cell(position).classList;
    var is_visited = false;
    classes.forEach(function(class_name) {
        if (class_name == "visited") {
            is_visited = true;
        }
    });
    return is_visited;
}

function is_valid_move(position) {
    var pos_valid = is_position_bounded(position);
    if (!pos_valid) {
        return pos_valid;
    }
    var is_visited = is_cell_visited(position);
    return !is_visited;
}

function get_valid_moves(position) {
    pos_x = Number(position[0]);
    pos_y = Number(position[1]);
    var valid_moves_list = [];
    var all_moves_list = all_moves(pos_x, pos_y);
    all_moves_list.forEach(function(ele) {
        if (is_valid_move(ele)) {
            valid_moves_list.push(ele);
        }
    })
    return valid_moves_list;
}

function get_min_valid_move(position) {
    var valid_moves = get_valid_moves(position);
    var min_valid_move;
    var min_value = 8;
    // valid_moves.forEach(function (vm) {
    //     var value = chessBoard.board_values[vm[0]][vm[1]];
    //     if (value < min_value) {
    // //         min_value = value;
    //         min_valid_move = vm;
    //     }
    // });
    for (var i = 0; i < valid_moves.length; i++) {
        var value = chessBoard.board_values[valid_moves[i][0]][valid_moves[i][1]];
        if (value < min_value) {
            min_value = value;
            min_valid_move = valid_moves[i];
        }
    }
    return min_valid_move;
}

function modify_weight(position, weight) {
    var valid_moves = get_valid_moves(position);
    console.log(valid_moves);
    for (var i = 0; i < valid_moves.length; i++) {
        chessBoard.board_values[valid_moves[i][0]][valid_moves[i][1]] += weight;
        var cell = get_cell(valid_moves[i]);
        cell.textContent = chessBoard.board_values[valid_moves[i][0]][valid_moves[i][1]];
    }
}

function sleep(ms) {
    // ms = 10;
    return new Promise(resolve => setTimeout(resolve, ms));
}