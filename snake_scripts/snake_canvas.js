
var game_started = false;
var active_snake_parts = [[25, 13], [26, 13], [27, 13], [28, 13], [29, 13]];
var apple = [[Math.round(Math.random() * 57)+1, Math.round(Math.random() * 19)+1]];
var move_dir = "left";
var lastMoveDir = "left";
var last_dir;
var fed = 0;
var isDead = false;
var deathNum = 0;

function frame() {

    if (!isDead) {
        check_win();
        //check_death();
        check_grow();
        move_snake();
        setTimeout(frame, 150);
    } else {
        $("#death")[0].style.display = "block";
        death();
    }
}

function move_snake() {

    lastMoveDir = move_dir;

    if (fed > 0) {
        fed--;
        var add = [active_snake_parts[active_snake_parts.length - 1][0], active_snake_parts[active_snake_parts.length - 1][1]];
        active_snake_parts.push(add);
    }

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

    //display apple
    $("#snake tr:nth-child(" + apple[0][1] + ") td:nth-child(" + apple[0][0] + ")").css("background-color", "#00FF22");

    //display snake
    for (var i = 0; i < active_snake_parts.length; i++) {

        $("#snake tr:nth-child(" + active_snake_parts[i][1] + ") td:nth-child(" + active_snake_parts[i][0] + ")").css("background-color", "white");

        if (move_dir == "paused") {
            $("#snake tr:nth-child(" + active_snake_parts[active_snake_parts.length - 1][1] + ") td:nth-child(" + active_snake_parts[active_snake_parts.length-1][0] + ")").css("background-color", "#4754FF");
        }
    }

}

function check_win() {

}

function check_death() {
    for (var i = 0; i < active_snake_parts.length; i++) {

        //if collided with itself
        if (i != 0 && active_snake_parts[0][0] == active_snake_parts[i][0] && active_snake_parts[0][1] == active_snake_parts[i][1]) {
            isDead = true;
        }

        //if collided with wall
        if((active_snake_parts[i][0] < 0 || active_snake_parts[i][0] > 57) ||
            (active_snake_parts[i][1] < 0 || active_snake_parts[i][1] > 19)) {
            isDead = true;
        }
    }
}

function death() {
    $("#snake tr:nth-child(" + active_snake_parts[deathNum][1] + ") td:nth-child(" + active_snake_parts[deathNum][0] + ")").css("background-color", "#E83F3F");
    if(deathNum < active_snake_parts.length-1) deathNum++;
    setTimeout(frame, 250);
}

function check_grow() {
    for (var i = 0; i < active_snake_parts.length; i++) {
        if (active_snake_parts[i][0] == apple[0][0] && active_snake_parts[i][1] == apple[0][1]) {
            apple[0][1] = Math.round(Math.random() * 19);
            apple[0][0] = Math.round(Math.random() * 57);
            fed += 3;
        }
    }
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
    if(game_started && move_dir != "right" && lastMoveDir != "right" &&
        (event.keyCode == 39 || event.keyCode == 68)) {
        move_dir = "left";
    }

    //pressed left or 'a'
    if (game_started && move_dir != "left" && lastMoveDir != "left" &&
        (event.keyCode == 37 || event.keyCode == 65)) {
        move_dir = "right";
    }

    //pressed up or 'w'
    if (game_started && move_dir != "down" && lastMoveDir != "down" &&
        (event.keyCode == 38 || event.keyCode == 87)) {
        move_dir = "up";
    }

    //pressed down or 's'
    if (game_started && move_dir != "up" && lastMoveDir != "up" &&
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