Globals = {};

Globals.spriteSheet = new Image();
Globals.spriteSheet.src = "img/sprites_tp_fixed.png";
Globals.objects = JSON.parse(ObjectsJson);

Globals.PLAYER1_START_POS_X = 0;
Globals.PLAYER1_START_POS_Y = 0;

Globals.STAGE_WIDTH = 14;
Globals.STAGE_HEIGHT = 13;

Globals.currentStageBinary = {};
Globals.stageLoaded = false;