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
                        var wall1 = new BrickWall(WallTileEnum.BRICK_RIGHT);
                        wall1.setXYPosition((j * 32) + 16, (i * 32));
                        objectContainer.addObject(wall1);
                        break;
                    case MapBlockEnum.BW_BOT:
                        var wall2 = new BrickWall(WallTileEnum.BRICK_BOT);
                        wall2.setXYPosition((j * 32), (i * 32) + 16);
                        objectContainer.addObject(wall2);
                        break;
                    case MapBlockEnum.BW_LEFT:
                        var wall3 = new BrickWall(WallTileEnum.BRICK_LEFT);
                        wall3.setXYPosition((j * 32), (i * 32));
                        objectContainer.addObject(wall3);
                        break;
                    case MapBlockEnum.BW_TOP:
                        var wall4 = new BrickWall(WallTileEnum.BRICK_TOP);
                        wall4.setXYPosition((j * 32), (i * 32));
                        objectContainer.addObject(wall4);
                        break;
                    case MapBlockEnum.BW_FULL:
                        var wall5 = new BrickWall(WallTileEnum.BRICK_FULL);
                        wall5.setXYPosition((j * 32) + 16, (i * 32) + 16);
                        objectContainer.addObject(wall5);
                        break;
                    case MapBlockEnum.CW_RIGHT:
                        var cwall1 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        cwall1.setXYPosition((j * 32) + 16, (i * 32));
                        objectContainer.addObject(cwall1);
                        break;
                    case MapBlockEnum.CW_BOT:
                        var cwall2 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        cwall2.setXYPosition((j * 32), (i * 32) + 16);
                        objectContainer.addObject(cwall2);
                        break;
                    case MapBlockEnum.CW_LEFT:
                        var cwall3 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        cwall3.setXYPosition((j * 32), (i * 32));
                        objectContainer.addObject(cwall3);
                        break;
                    case MapBlockEnum.CW_TOP:
                        var cwall4 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        cwall4.setXYPosition((j * 32), (i * 32));
                        objectContainer.addObject(cwall4);
                        break;
                    case MapBlockEnum.CW_FULL:
                        var cwall5 = new ConcreteWall(WallTileEnum.BRICK_FULL);
                        cwall5.setXYPosition((j * 32) + 16, (i * 32) + 16);
                        objectContainer.addObject(cwall5);
                        break;
                    case MapBlockEnum.WATER:
                        var wtr = new Water(WallTileEnum.BRICK_FULL);
                        wtr.setXYPosition((j * 32) + 16, (i * 32) + 16);
                        objectContainer.addObject(wtr);
                        break;
                    case MapBlockEnum.GRASS:
                        var grs = new Grass(WallTileEnum.BRICK_FULL);
                        grs.setXYPosition((j * 32) + 16, (i * 32) + 16);
                        objectContainer.addObject(grs);
                        break;
                    case MapBlockEnum.ICE:
                        var ice = new Ice(WallTileEnum.BRICK_FULL);
                        ice.setXYPosition((j * 32) + 16, (i * 32) + 16);
                        objectContainer.addObject(ice);
                        break;
                    case MapBlockEnum.EMPTY:
                        break;
                }
            }
        }
    }
}
