var state = {
    cur_coord: undefined,
    trace: [],
    print_trace: function() {
        console.log("<<<<<=====>>>>>");
        for (var i = 0; i < this.trace.length; i++) {
            console.log("Move: ", i, " X: ", this.trace[i][0], " Y: ", this.trace[i][1]);
        }
    },
    initialise: function() {
        this.cur_coord = undefined;
        this.trace = [];
    },
    move: move,
    back: move_back
};

function move(posX, posY) {
    // This is called when any cell is clicked

    var is_valid = false;
    var first_move = false;

    // Check Trace to see if any moves made
    if (this.trace.length == 0) {
        first_move = true;
    }


    if (first_move) {
        // If it is the first move, just move it there
        this.cur_coord = {
            x: posX,
            y: posY
        }
        this.trace.push(this.cur_coord);
        add_knight(this.cur_coord);
        hightlight_valid_moves(this.cur_coord);
        modify_weight(this.cur_coord, -1);
    } else {
        // If it is not first move
        // Check if it is a valid move
        is_valid = is_move_valid(this.cur_coord, [posX, posY]);
        if (is_valid) {
            clear_knight(this.cur_coord);
            this.cur_coord = {
                x: posX,
                y: posY
            }
            hightlight_valid_moves(this.cur_coord);

            this.trace.push(this.cur_coord);
            modify_weight(this.cur_coord, -1);
            add_knight(this.cur_coord);
            end_game(this.cur_coord);
        }
    }
}

function end_game(coordinates) {
    var visited_count = document.querySelectorAll(".visited");
    if (visited_count.length === 63) {
        modify_title("You Win.");
        return;
    }
    var valid_moves = get_valid_moves(coordinates);
    if (valid_moves.length === 0) {
        modify_title("Game Over. No moves left");
    }
}


function move_back() {
    // Function to move the Knight by 1 step

    // Case 1: Only one or no move made
    if (this.trace.length <= 1) {
        return;
    }

    // Case 2: More than one move made

    // Clear the last coordinates
    var last_pos = this.trace.pop();
    console.log(last_pos);
    clear_coordinates(last_pos);

    // Increase board values for valid moves
    modify_weight(last_pos, 1);

    this.cur_coord = this.trace.pop();
    if (this.cur_coord !== undefined) {
        hightlight_valid_moves(this.cur_coord);

        this.trace.push(this.cur_coord);
        add_knight(this.cur_coord);
    } else {
        $(".highlight").removeClass("highlight");
        this.cur_coord = [];
    }
}