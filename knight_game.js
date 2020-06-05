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