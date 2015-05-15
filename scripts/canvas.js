
var game_started = false;

function frame() {

}

function move() {

}

//$("#canvas").onkeypress = function () {
//    window.alert("Key Pressed");
//};

function keyPressed(e) {
    
    //pressed space - start game
    if (event.keyCode == 32 && game_started == false) {
        $("#spaceToPlay")[0].style.display = "none";
        game_started = true;
        frame()
    }
}