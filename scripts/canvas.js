
var game_started = false;
var active_snake_parts = [   [1,2], [1,3], [1,4], [2,4]  ];
var move_dir = "left";
var last_dir;

function frame() {
    check_death();
    check_grow();
    move_snake();
    setTimeout(frame, 150);
}

function move_snake() {

    //remove old display
    for (var i = 0; i < active_snake_parts.length; i++) {
        $("table tr:nth-child(" + active_snake_parts[i][1] + ") td:nth-child(" + active_snake_parts[i][0] + ")").css("background-color", "black");
    }

    //change which part is active
    for (var i = 0; i < active_snake_parts.length; i++) {
        if (move_dir != "paused") {
            if (i + 1 < active_snake_parts.length) {
                active_snake_parts[i][0] = active_snake_parts[i + 1][0];
                active_snake_parts[i][1] = active_snake_parts[i + 1][1];
            } else {
                if (move_dir == "left") {
                    active_snake_parts[i][0]++;
                } else if (move_dir == "right") {
                    active_snake_parts[i][0]--;
                } else if (move_dir == "down") {
                    active_snake_parts[i][1]++;
                } else if (move_dir == "up") {
                    active_snake_parts[i][1]--;
                }
            }
        } 
    }

    //display
    for (var i = 0; i < active_snake_parts.length; i++) {

        $("#snake tr:nth-child(" + active_snake_parts[i][1] + ") td:nth-child(" + active_snake_parts[i][0] + ")").css("background-color", "white");

        if (move_dir == "paused") {
            $("#snake tr:nth-child(" + active_snake_parts[active_snake_parts.length - 1][1] + ") td:nth-child(" + active_snake_parts[active_snake_parts.length-1][0] + ")").css("background-color", "blue");
        }
    }
}

function check_death() {

}

function check_grow() {

}

function keyDown(e) {
    
    //prevent scrolling
    if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }

    //pressed space - start game
    if (event.keyCode == 32 && game_started == false) {
        $("#spaceToPlay")[0].style.display = "none";
        $("#snake")[0].style.display = "block";
        game_started = true;
        frame()
    }

    //pressed right or 'd'
    if(game_started && move_dir != "right" && 
        (event.keyCode == 39 || event.keyCode == 68)) {
        move_dir = "left";
    }

    //pressed left or 'a'
    if(game_started && move_dir != "left" && 
        (event.keyCode == 37 || event.keyCode == 65)) {
        move_dir = "right";
    }

    //pressed up or 'w'
    if(game_started && move_dir != "down" && 
        (event.keyCode == 38 || event.keyCode == 87)) {
        move_dir = "up";
    }

    //pressed down or 's'
    if(game_started && move_dir != "up" && 
        (event.keyCode == 40 || event.keyCode == 83)) {
        move_dir = "down";
    }

    //pressed 'p'
    if(game_started && event.keyCode == 80) {
        if (move_dir != "paused") {
            last_dir = move_dir;
            move_dir = "paused";
        } else {
            move_dir = last_dir;
        }
    }
}