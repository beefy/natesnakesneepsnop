
var game_started = false;

function frame() {
    setTimeout(frame, 100);
    move_snake();
}

function move() {
    $("#snake")[0].style.marginleft = $("#snake")[0].style.marginleft + 1;
}

//$("#canvas").onkeypress = function () {
//    window.alert("Key Pressed");
//};

function keyPressed(e) {
    
    //pressed space - start game
    if (event.keyCode == 32 && game_started == false) {
        $("#spaceToPlay")[0].style.display = "none";
        $("#snake")[0].style.display = "block";
        game_started = true;
        frame()
    }
}