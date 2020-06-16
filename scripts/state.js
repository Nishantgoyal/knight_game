var state = {
    cur_pos: [],
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

    var is_valid = false;
    var is_empty = false;
    if (this.cur_pos.length == 0) {
        is_empty = true;
    }
    var valid_moves = get_valid_moves(this.cur_pos);
    // console.log(valid_moves);
    for (var i = 0; i < valid_moves.length; i++) {
        if (posX == valid_moves[i][0] && posY == valid_moves[i][1]) {
            is_valid = true;
        }
    }
    if (is_empty) {
        this.cur_pos = [posX, posY];
        this.trace.push(this.cur_pos);
        add_knight(posX, posY);
    } else {
        if (valid_moves.length === 0) {
            console.log("No Valid Moves Left");
        }
        if (is_valid) {
            clear_knight(this.cur_pos);
            this.cur_pos = [posX, posY];
            this.trace.push(this.cur_pos);
            add_knight(posX, posY);
        }
    }
    this.print_trace();
}


function move_back() {
    var last_pos = this.trace.pop();
    if (last_pos === undefined) {
        console.log("No moves made");
        return;
    } else {
        move_back_knight(last_pos);
        this.cur_pos = this.trace.pop();
        if (this.cur_pos !== undefined) {
            this.trace.push(this.cur_pos);
            add_knight(this.cur_pos[0], this.cur_pos[1]);
        } else {
            this.cur_pos = [];
        }
    }
    console.log(this);
}