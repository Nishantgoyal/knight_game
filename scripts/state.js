var state = {
    cur_pos: [],
    cur_coord: undefined,
    trace: [],
    print_trace: function() {
        console.log("<<<<<=====>>>>>");
        for (var i = 0; i < this.trace.length; i++) {
            console.log("Move: ", i, " X: ", this.trace[i][0], " Y: ", this.trace[i][1]);
        }
    },
    initialise: function() {
        this.cur_pos = [];
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
        this.cur_pos = [posX, posY];
        this.cur_coord = {
            x: posX,
            y: posY
        }
        this.trace.push(this.cur_pos);
        add_knight(this.cur_pos);
        hightlight_valid_moves(this.cur_pos);
        modify_weight(this.cur_pos, -1);
    } else {
        // If it is not first move
        // Check if it is a valid move
        is_valid = is_move_valid(this.cur_pos, [posX, posY]);
        if (is_valid) {
            clear_knight(this.cur_pos);
            this.cur_pos = [posX, posY];
            this.cur_coord = {
                x: posX,
                y: posY
            }
            hightlight_valid_moves(this.cur_pos);

            this.trace.push(this.cur_pos);
            modify_weight(this.cur_pos, -1);
            add_knight(this.cur_pos);
            end_game(this.cur_pos);
        }
    }
}

function end_game(position) {
    var visited_count = document.querySelectorAll(".visited");
    if (visited_count.length === 63) {
        modify_title("You Win.");
        return;
    }
    var valid_moves = get_valid_moves(position);
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

    // Clear the last position
    var last_pos = this.trace.pop();
    clear_position(last_pos);

    // Increase board values for valid moves
    modify_weight(last_pos, 1);

    this.cur_pos = this.trace.pop();
    if (this.cur_pos !== undefined) {
        hightlight_valid_moves(this.cur_pos);

        this.trace.push(this.cur_pos);
        add_knight(this.cur_pos);
    } else {
        $(".highlight").removeClass("highlight");
        this.cur_pos = [];
    }
}