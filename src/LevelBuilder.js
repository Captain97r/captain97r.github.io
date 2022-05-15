class LevelBuilder {

    build(field, stageBinary) {

        var blockArray = new Uint8Array(stageBinary.length * 2);
        for (var i = 0; i < stageBinary.length; i++) {
            blockArray[i * 2] = (stageBinary[i] >> 4) & 0xF;
            blockArray[(i * 2) + 1] = stageBinary[i] & 0xF;
        }

        for (var i = 0; i < Globals.STAGE_HEIGHT; i++) {
            for (var j = 0; j < Globals.STAGE_WIDTH; j++) {

                switch(blockArray[i * Globals.STAGE_WIDTH + j]) {
                    case MapBlockEnum.BW_RIGHT:
                        var tile1 = new BrickWallTile(WallTileEnum.BRICK_FULL);
                        var tile2 = new BrickWallTile(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),       (i * 32));
                        tile2.setXYPosition((j * 32) + 16,  (i * 32));

                        field.push(tile1);
                        field.push(tile2);
                        break;
                    case MapBlockEnum.BW_BOT:
                        var tile1 = new BrickWallTile(WallTileEnum.BRICK_FULL);
                        var tile2 = new BrickWallTile(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32) + 16);
                        tile2.setXYPosition((j * 32) + 16,   (i * 32) + 16);

                        field.push(tile1);
                        field.push(tile2);
                        break;
                    case MapBlockEnum.BW_LEFT:
                        var tile1 = new BrickWallTile(WallTileEnum.BRICK_FULL);
                        var tile2 = new BrickWallTile(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),   (i * 32));
                        tile2.setXYPosition((j * 32),   (i * 32) + 16);

                        field.push(tile1);
                        field.push(tile2);
                        break;
                    case MapBlockEnum.BW_TOP:
                        var tile1 = new BrickWallTile(WallTileEnum.BRICK_FULL);
                        var tile2 = new BrickWallTile(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32));
                        tile2.setXYPosition((j * 32) + 16,   (i * 32));

                        field.push(tile1);
                        field.push(tile2);
                        break;
                    case MapBlockEnum.BW_FULL:
                        var tile1 = new BrickWallTile(WallTileEnum.BRICK_FULL);
                        var tile2 = new BrickWallTile(WallTileEnum.BRICK_FULL);
                        var tile3 = new BrickWallTile(WallTileEnum.BRICK_FULL);
                        var tile4 = new BrickWallTile(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32));
                        tile2.setXYPosition((j * 32) + 16,   (i * 32));
                        tile3.setXYPosition((j * 32),        (i * 32) + 16);
                        tile4.setXYPosition((j * 32) + 16,   (i * 32) + 16);

                        field.push(tile1);
                        field.push(tile2);
                        field.push(tile3);
                        field.push(tile4);
                        break;
                    case MapBlockEnum.CW_RIGHT:
                        break;
                    case MapBlockEnum.CW_BOT:
                        break;
                    case MapBlockEnum.CW_LEFT:
                        break;
                    case MapBlockEnum.CW_TOP:
                        break;
                    case MapBlockEnum.WATER:
                        break;
                    case MapBlockEnum.GRASS:
                        break;
                    case MapBlockEnum.ICE:
                        break;
                    case MapBlockEnum.EMPTY:
                        break;
                }
            }
        }
    }
}