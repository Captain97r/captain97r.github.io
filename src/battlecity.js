var xmlhttp = new XMLHttpRequest();
xmlhttp.addEventListener("loadend", Game.loaded, false);
xmlhttp.open("GET", "stages/stage_04.bin", true);
xmlhttp.responseType = "arraybuffer";
xmlhttp.send();

xmlhttp.onload = function (event) {
    var array = xmlhttp.response;
    if (array) {
        var byteArray = new Uint8Array(array);
        Globals.currentStageBinary = byteArray;
        Globals.stageLoaded = true;
    }
}

window.onload = function () {

    let ctx = document.getElementById('drawingCanvas').getContext('2d');

    let game = new Game(ctx);

    // TODO: idk how bind() works but I need to know it
    document.addEventListener("keydown", game.handleKeyPress.bind(game));
    document.addEventListener("keyup", game.handleKeyRelease.bind(game));

    var lastUpdateTime = (new Date()).getTime();

    setInterval(function() {
        game.update();
        var currentTime = (new Date()).getTime();
        var timeDifference = currentTime - lastUpdateTime;
        game.setTimeDelta(timeDifference / 20);
        lastUpdateTime = currentTime;
      }, 1000 / 240);
}