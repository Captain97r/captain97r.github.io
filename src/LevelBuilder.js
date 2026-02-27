class LevelBuilder {

    build(objectContainer, stageBinary) {

        var blockArray = new Uint8Array(stageBinary.length * 2);
        for (var i = 0; i < stageBinary.length; i++) {
            blockArray[i * 2] = (stageBinary[i] >> 4) & 0xF;
            blockArray[(i * 2) + 1] = stageBinary[i] & 0xF;
        }

        for (var i = 0; i < Globals.STAGE_HEIGHT; i++) {
            for (var j = 0; j < Globals.STAGE_WIDTH; j++) {

                switch(blockArray[i * Globals.STAGE_WIDTH + j]) {
                    case MapBlockEnum.BW_RIGHT:
                        var tile1 = new BrickWall(WallTileEnum.BRICK_FULL);
                        var tile2 = new BrickWall(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32) + 16,  (i * 32));
                        tile2.setXYPosition((j * 32) + 16,  (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        break;
                    case MapBlockEnum.BW_BOT:
                        var tile1 = new BrickWall(WallTileEnum.BRICK_FULL);
                        var tile2 = new BrickWall(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32) + 16);
                        tile2.setXYPosition((j * 32) + 16,   (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        break;
                    case MapBlockEnum.BW_LEFT:
                        var tile1 = new BrickWall(WallTileEnum.BRICK_FULL);
                        var tile2 = new BrickWall(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),   (i * 32));
                        tile2.setXYPosition((j * 32),   (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        break;
                    case MapBlockEnum.BW_TOP:
                        var tile1 = new BrickWall(WallTileEnum.BRICK_FULL);
                        var tile2 = new BrickWall(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32));
                        tile2.setXYPosition((j * 32) + 16,   (i * 32));

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        break;
                    case MapBlockEnum.BW_FULL:
                        var tile1 = new BrickWall(WallTileEnum.BRICK_FULL);
                        var tile2 = new BrickWall(WallTileEnum.BRICK_FULL);
                        var tile3 = new BrickWall(WallTileEnum.BRICK_FULL);
                        var tile4 = new BrickWall(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32));
                        tile2.setXYPosition((j * 32) + 16,   (i * 32));
                        tile3.setXYPosition((j * 32),        (i * 32) + 16);
                        tile4.setXYPosition((j * 32) + 16,   (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        objectContainer.addObject(tile3);
                        objectContainer.addObject(tile4);
                        break;
                    case MapBlockEnum.CW_RIGHT:
                        var tile1 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        var tile2 = new ConcreteWall(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32) + 16,  (i * 32));
                        tile2.setXYPosition((j * 32) + 16,  (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        break;
                    case MapBlockEnum.CW_BOT:
                        var tile1 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        var tile2 = new ConcreteWall(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32) + 16);
                        tile2.setXYPosition((j * 32) + 16,   (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        break;
                    case MapBlockEnum.CW_LEFT:
                        var tile1 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        var tile2 = new ConcreteWall(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),   (i * 32));
                        tile2.setXYPosition((j * 32),   (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        break;
                    case MapBlockEnum.CW_TOP:
                        var tile1 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        var tile2 = new ConcreteWall(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32));
                        tile2.setXYPosition((j * 32) + 16,   (i * 32));

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        break;
                        
                    case MapBlockEnum.CW_FULL:
                        var tile1 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        var tile2 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        var tile3 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        var tile4 = new ConcreteWall(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32));
                        tile2.setXYPosition((j * 32) + 16,   (i * 32));
                        tile3.setXYPosition((j * 32),        (i * 32) + 16);
                        tile4.setXYPosition((j * 32) + 16,   (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        objectContainer.addObject(tile3);
                        objectContainer.addObject(tile4);
                        break;
                    case MapBlockEnum.WATER:
                        var tile1 = new Water(WallTileEnum.BRICK_FULL);
                        var tile2 = new Water(WallTileEnum.BRICK_FULL);
                        var tile3 = new Water(WallTileEnum.BRICK_FULL);
                        var tile4 = new Water(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32));
                        tile2.setXYPosition((j * 32) + 16,   (i * 32));
                        tile3.setXYPosition((j * 32),        (i * 32) + 16);
                        tile4.setXYPosition((j * 32) + 16,   (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        objectContainer.addObject(tile3);
                        objectContainer.addObject(tile4);
                        break;
                    case MapBlockEnum.GRASS:
                        var tile1 = new Grass(WallTileEnum.BRICK_FULL);
                        var tile2 = new Grass(WallTileEnum.BRICK_FULL);
                        var tile3 = new Grass(WallTileEnum.BRICK_FULL);
                        var tile4 = new Grass(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32));
                        tile2.setXYPosition((j * 32) + 16,   (i * 32));
                        tile3.setXYPosition((j * 32),        (i * 32) + 16);
                        tile4.setXYPosition((j * 32) + 16,   (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        objectContainer.addObject(tile3);
                        objectContainer.addObject(tile4);
                        break;
                    case MapBlockEnum.ICE:
                        var tile1 = new Ice(WallTileEnum.BRICK_FULL);
                        var tile2 = new Ice(WallTileEnum.BRICK_FULL);
                        var tile3 = new Ice(WallTileEnum.BRICK_FULL);
                        var tile4 = new Ice(WallTileEnum.BRICK_FULL);

                        tile1.setXYPosition((j * 32),        (i * 32));
                        tile2.setXYPosition((j * 32) + 16,   (i * 32));
                        tile3.setXYPosition((j * 32),        (i * 32) + 16);
                        tile4.setXYPosition((j * 32) + 16,   (i * 32) + 16);

                        objectContainer.addObject(tile1);
                        objectContainer.addObject(tile2);
                        objectContainer.addObject(tile3);
                        objectContainer.addObject(tile4);
                        break;
                    case MapBlockEnum.EMPTY:
                        break;
                }
            }
        }
    }
}