function get_ID_at_coordinates(coordinates) {
    // It returns the ID of the cell at the given coordinates
    // E.g.: coordinates: (3,2) --> cell with ID "3_2"
    return "#" + coordinates.x + "_" + coordinates.y;
}

function all_moves(coordinates) {
    return [{
            x: coordinates.x + 1,
            y: coordinates.y + 2
        },
        {
            x: coordinates.x + 1,
            y: coordinates.y - 2
        },
        {
            x: coordinates.x - 1,
            y: coordinates.y + 2
        },
        {
            x: coordinates.x - 1,
            y: coordinates.y - 2
        },
        {
            x: coordinates.x + 2,
            y: coordinates.y + 1
        },
        {
            x: coordinates.x + 2,
            y: coordinates.y - 1
        },
        {
            x: coordinates.x - 2,
            y: coordinates.y + 1
        },
        {
            x: coordinates.x - 2,
            y: coordinates.y - 1
        },
    ];
}

function is_coordinates_bounded(coordinates) {
    return (
        coordinates.x >= 0 && coordinates.x < 8 &&
        coordinates.y >= 0 && coordinates.y < 8
    );
}


function add_valid_class_to_valid_moves(coordinates) {
    $(".valid").removeClass("valid");
    all_moves(coordinates).forEach(function(ele) {
        var id = get_ID_at_coordinates(ele);
        var pos_valid = is_coordinates_bounded(ele);
        var is_visited = $(id).hasClass("visited");
        if (pos_valid && !is_visited) {
            $(id).addClass("valid");
        }
    });
}


function get_min_valid_move() {
    var valid_moves = $(".valid");
    var min_valid_move;
    var min_value = 8;
    for (var i = 0; i < valid_moves.length; i++) {
        var valid_move = valid_moves[i];
        var x = Number(valid_move.getAttribute("posx"));
        var y = Number(valid_move.getAttribute("posy"));

        var value = chessBoard.board_values[x][y];
        if (value < min_value) {
            min_value = value;
            min_valid_move = {
                x: x,
                y: y
            };
        }
    }
    return min_valid_move;
}

function modify_weight(move_type) {
    var weight = -1;
    if (move_type === "back") {
        weight = 1;
    }
    var valid_moves = $('.valid');
    for (var i = 0; i < valid_moves.length; i++) {
        var move = valid_moves[i];
        x = Number(move.getAttribute("posx"));
        y = Number(move.getAttribute("posy"));
        chessBoard.board_values[x][y] += weight;
    }
}

function sleep(ms) {
    // ms = 10;
    return new Promise(resolve => setTimeout(resolve, ms));
}

function modify_title(message) {
    $("#game-title").text(message);
}

function is_move_valid(coordinates) {
    return $("#" + coordinates.x + "_" + coordinates.y).hasClass("valid");
}