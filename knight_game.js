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

function is_valid_move(pos) {
    return (pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8);
}

function valid_moves(pos_x, pos_y) {
    var valid_moves_list = [];
    var all_moves_list = all_moves(pos_x, pos_y);
    all_moves_list.forEach(function(ele) {
        if (is_valid_move(ele)) {
            valid_moves_list.push(ele);
        }
    })
    return valid_moves_list;
}