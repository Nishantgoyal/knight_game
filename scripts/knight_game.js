current_knight_pos = {
    "x": null,
    "y": null
}

function move(pos_x, pos_y) {
    cur_x = current_knight_pos["x"];
    cur_y = current_knight_pos["y"];
    if (cur_x !== null && cur_y !== null) {
        clear_knight(cur_x, cur_y);
    }
    current_knight_pos["x"] = pos_x;
    current_knight_pos["y"] = pos_y;
    add_knight(pos_x, pos_y);
}


function get_cell(pos_x, pos_y) {
    var chessBoard = document.getElementById("chessboard");
    var cell = chessBoard.rows[pos_x].cells[pos_y];
    return cell;
}

function create_knight_image() {
    var knight_img = new Image();
    knight_img.src = "images/knight_image.png";
    knight_img.classList = ["img-fluid"];
    return knight_img;
}

function add_knight(pos_x, pos_y) {
    console.log("Adding knight at:", pos_x, pos_y);
    var cell = get_cell(pos_x, pos_y);
    cell.classList.add("knight");
    var knight_img = create_knight_image();
    document.getElementsByClassName("knight")[0].appendChild(knight_img)
}

function clear_knight(pos_x, pos_y) {
    console.log("Clearing knight at:", pos_x, pos_y);
    var cell = get_cell(pos_x, pos_y);
    document.getElementsByClassName("knight")[0].innerHTML = null
    cell.classList.add("visited");
    cell.classList.remove("knight");
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

function get_classes(x, y) {
    var classes = document.getElementById("chessboard").rows[x].cells[y].classList;
    // console.log(classes);
    return classes;
}

function is_valid_move(pos) {
    var pos_valid = (pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8);
    if (pos_valid === true) {
        var classes = get_classes(pos[0], pos[1]);
        var is_visited = false;
        classes.forEach(function(class_name) {
            if (class_name == "visited") {
                is_visited = true;
            }
        });
    }

    return pos_valid && !is_visited;
}

function get_valid_moves(pos_x, pos_y) {
    var valid_moves_list = [];
    var all_moves_list = all_moves(pos_x, pos_y);
    all_moves_list.forEach(function(ele) {
        if (is_valid_move(ele)) {
            valid_moves_list.push(ele);
        }
    })
    return valid_moves_list;
}

function addOnClick() {
    var rows = document.getElementById("chessboard").rows;
    var i, j;
    for (i = 0; i < rows.length; i++) {
        for (j = 0; j < rows[i].cells.length; j++) {
            var ele = rows[i].cells[j];
            ele.classList.add("pos-" + i, "pos-" + j);
            ele.onclick = onClickBehaviour;
        }
    }
}

function get_pos_from_event(event) {
    var classL = event["path"][0].classList;
    var pos = [];
    for (var i = 0; i < classL.length; i++) {
        index_pos = classL[i].indexOf("pos-");
        if (index_pos != -1) {
            value = Number(classL[i].split("-")[1])
            pos.push(value)
        }
    }
    if (pos.length === 1) {
        pos.push(pos[0]);
    }
    return pos;
}

function is_current_pos_null() {
    if (current_knight_pos["x"] === null && current_knight_pos["y"] === null) {
        return true;
    }
    return false;
}

function onClickBehaviour(event) {
    pos = get_pos_from_event(event);
    x = pos[0];
    y = pos[1];
    if (is_current_pos_null()) {
        move(x, y);
    } else {
        cur_x = current_knight_pos["x"];
        cur_y = current_knight_pos["y"];
        var valid_moves = get_valid_moves(cur_x, cur_y);
        var is_valid = false;
        valid_moves.forEach(function(move) {
            if (move[0] == x && move[1] == y) {
                is_valid = true;
            }
        });
        if (is_valid === true) {
            move(x, y);
        } else {
            console.log("Cannot move to ", x, y);
        }
    }
}

addOnClick()