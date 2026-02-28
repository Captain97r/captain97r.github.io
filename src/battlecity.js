var xmlhttp = new XMLHttpRequest();
xmlhttp.addEventListener("loadend", Game.loaded, false);
xmlhttp.addEventListener("progress", updateProgress, false);
xmlhttp.open("GET", "stages/stage_01.bin", true);
xmlhttp.responseType = "arraybuffer";
xmlhttp.send();

// состояние передачи от сервера к клиенту (загрузка)
function updateProgress (oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total;
      console.log(percentComplete);
    } else {
      // Невозможно вычислить состояние загрузки, так как размер неизвестен
    }
  }

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

    let currentScreen = new MenuScreen(ctx);

    document.addEventListener("keydown", function(evt) {
        currentScreen.handleKeyPress(evt);
    });
    document.addEventListener("keyup", function(evt) {
        if (currentScreen.handleKeyRelease)
            currentScreen.handleKeyRelease(evt);
    });

    var lastUpdateTime = (new Date()).getTime();

    setInterval(function() {
        currentScreen.update();
        var currentTime = (new Date()).getTime();
        var timeDifference = currentTime - lastUpdateTime;
        if (currentScreen.setTimeDelta)
            currentScreen.setTimeDelta(timeDifference / 20);
        lastUpdateTime = currentTime;

        // Menu → Game transition
        if (currentScreen instanceof MenuScreen && currentScreen.isStartGame()) {
            currentScreen = new Game(ctx);
        }
    }, 1000 / 240);
}
