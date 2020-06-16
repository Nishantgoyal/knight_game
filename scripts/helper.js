function create_knight_image() {
    var knight_img = new Image();
    knight_img.src = "images/knight_image.png";
    knight_img.classList = ["img-fluid"];
    return knight_img;
}

function add_knight(pos_x, pos_y) {
    // console.log("Adding knight at:", pos_x, pos_y);
    var cell = chessBoard.table.rows[pos_x].cells[pos_y];
    cell.classList.add("knight");
    var knight_img = create_knight_image();
    cell.innerHTML = null;
    cell.appendChild(knight_img);
}

function clear_knight(position) {
    if (position.length === 0) {
        return;
    }
    pos_x = Number(position[0]);
    pos_y = Number(position[1]);
    var cell = chessBoard.table.rows[pos_x].cells[pos_y];
    cell.classList.add("visited");
    cell.textContent = "x";
    cell.classList.remove("knight");
}

function move_back_knight(position) {
    pos_x = Number(position[0]);
    pos_y = Number(position[1]);
    var cell = chessBoard.table.rows[pos_x].cells[pos_y];
    cell.innerHTML = null;
    cell.classList.remove("knight");
    cell.classList.remove("visited");
    // cell.textContent = "x";
}

function all_moves(pos_x, pos_y) {
    var all_moves_list = [];
    all_moves_list.push([pos_x + 1, pos_y + 2]);
    all_moves_list.push([pos_x + 1, pos_y - 2]);
    all_moves_list.push([pos_x - 1, pos_y + 2]);
    all_moves_list.push([pos_x - 1, pos_y - 2]);
    all_moves_list.push([pos_x + 2, pos_y + 1]);
    all_moves_list.push([pos_x + 2, pos_y - 1]);
    all_moves_list.push([pos_x - 2, pos_y + 1]);
    all_moves_list.push([pos_x - 2, pos_y - 1]);
    return all_moves_list;
}


function is_valid_move(pos) {
    pos_x = Number(pos[0]);
    pos_y = Number(pos[1]);
    var pos_valid = (pos_x >= 0 && pos_x < 8 && pos_y >= 0 && pos_y < 8);
    if (pos_valid === true) {
        var classes = chessBoard.table.rows[pos_x].cells[pos_y].classList;
        var is_visited = false;
        classes.forEach(function(class_name) {
            if (class_name == "visited") {
                is_visited = true;
            }
        });
    }
    return pos_valid && !is_visited;
}

function get_valid_moves(pos) {
    if (pos === null) {
        return;
    }
    pos_x = Number(pos[0]);
    pos_y = Number(pos[1]);
    var valid_moves_list = [];
    var all_moves_list = all_moves(pos_x, pos_y);
    all_moves_list.forEach(function(ele) {
        if (is_valid_move(ele)) {
            // console.log(ele);
            valid_moves_list.push(ele);
        }
    })
    return valid_moves_list;
}

function get_min_valid_move(valid_moves) {
    min_valid_move = undefined;
    min_value = 8;
    for (var i = 0; i < valid_moves.length; i++) {
        value = chessBoard.board_values[valid_moves[i][0]][valid_moves[i][1]]
        console.log(valid_moves[i], value);
    }
}

function reduce_weight(position) {
    pos_x = Number(position[0]);
    pos_y = Number(position[1]);
    valid_moves = get_valid_moves(position);
    for (var i = 0; i < valid_moves.length; i++) {
        console.log(valid_moves[i]);
        chessBoard.board_values[valid_moves[i][0]][valid_moves[i][1]]--;
        var cell = chessBoard.table.rows[valid_moves[i][0]].cells[valid_moves[i][1]];
        console.log(cell);
        cell.textContent = chessBoard.board_values[valid_moves[i][0]][valid_moves[i][1]];
    }
}

function solve() {
    if (state.trace.length > 1) {
        document.querySelector(".page-title h3").textContent = "Please reset the board and click on a cell. Then click on solve button";
    } else if (state.trace.length === 1) {
        var cur_pos = state.trace[0];
        for (var i = 0; i < 64; i++) {
            console.log(cur_pos);
            var valid_moves = get_valid_moves(cur_pos);
            console.log(valid_moves);
            get_min_valid_move(valid_moves);
            break;
        }
    } else {
        document.querySelector(".page-title h3").textContent = "Please click on a cell. Then click on solve button";
    }
}