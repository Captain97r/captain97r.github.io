var ObjectsJson = 
`{
    "tanks": 
    {
        "animationFrames" : 2,
        "objectSizeX" : 32,
        "objectSizeY" : 32,
        "friendlyTank": 
        {
            "defaultSpeed": 3,
            "types" : 
            {
               "stock": 
                {
                    "animation" :
                    {
                        "up" : 
                        {
                            "frameX" : [0, 32],
                            "frameY" : [0, 0]
                        },
                        "right" : 
                        {
                            "frameX" : [0, 32],
                            "frameY" : [32, 32]
                        },
                        "down" : 
                        {
                            "frameX" : [0, 32],
                            "frameY" : [64, 64]
                        },
                        "left" : 
                        {
                            "frameX" : [0, 32],
                            "frameY" : [96, 96]
                        }
                    }
                },
                "light": 
                {
                    "animation" :
                    {
                        "up" : 
                        {
                            "frameX" : [64, 96],
                            "frameY" : [0, 0]
                        },
                        "right" : 
                        {
                            "frameX" : [64, 96],
                            "frameY" : [32, 32]
                        },
                        "down" : 
                        {
                            "frameX" : [64, 96],
                            "frameY" : [64, 64]
                        },
                        "left" : 
                        {
                            "frameX" : [64, 96],
                            "frameY" : [96, 96]
                        }
                    }
                },
                "medium": 
                {
                    "animation" :
                    {
                        "up" : 
                        {
                            "frameX" : [128, 160],
                            "frameY" : [0, 0]
                        },
                        "right" : 
                        {
                            "frameX" : [128, 160],
                            "frameY" : [32, 32]
                        },
                        "down" : 
                        {
                            "frameX" : [128, 160],
                            "frameY" : [64, 64]
                        },
                        "left" : 
                        {
                            "frameX" : [128, 160],
                            "frameY" : [96, 96]
                        }
                    }
                },
                "heavy": 
                {
                    "animation" :
                    {
                        "up" : 
                        {
                            "frameX" : [192, 224],
                            "frameY" : [0, 0]
                        },
                        "right" : 
                        {
                            "frameX" : [192, 224],
                            "frameY" : [32, 32]
                        },
                        "down" : 
                        {
                            "frameX" : [192, 224],
                            "frameY" : [64, 64]
                        },
                        "left" : 
                        {
                            "frameX" : [192, 224],
                            "frameY" : [96, 96]
                        }
                    }
                } 
            }
            
        }
    },

    "bullets" :
    {
        "animationFrames" : 1,
        "objectSizeX" : 8,
        "objectSizeY" : 8,
        "tiles" : 
        {
            "up" :
            {
                "frameX" : [0],
                "frameY" : [352]
            },
            "right" :
            {
                "frameX" : [8],
                "frameY" : [352]
            },
            "down" :
            {
                "frameX" : [16],
                "frameY" : [352]
            },
            "left" :
            {
                "frameX" : [24],
                "frameY" : [352]
            }
        }
    },

    "walls" : 
    {
        "animationFrames" : 1,
        "objectSizeX" : 16,
        "objectSizeY" : 16,
        "brickWall" :
        {
            "tiles" : 
            {
                "full" :
                {
                    "frameX" : [0],
                    "frameY" : [256]
                },
                "lbEmpty" :
                {
                    "frameX" : [16],
                    "frameY" : [256]
                },
                "rbEmpty" :
                {
                    "frameX" : [32],
                    "frameY" : [256]
                },
                "ltEmpty" :
                {
                    "frameX" : [48],
                    "frameY" : [256]
                },
                "rtEmpty" :
                {
                    "frameX" : [64],
                    "frameY" : [256]
                },
                "left" :
                {
                    "frameX" : [80],
                    "frameY" : [256]
                },
                "bot" :
                {
                    "frameX" : [96],
                    "frameY" : [256]
                },
                "right" :
                {
                    "frameX" : [112],
                    "frameY" : [256]
                },
                "top" :
                {
                    "frameX" : [128],
                    "frameY" : [256]
                },
                "ltPresent" :
                {
                    "frameX" : [144],
                    "frameY" : [256]
                },
                "rtPresent" :
                {
                    "frameX" : [160],
                    "frameY" : [256]
                },
                "rbPresent" :
                {
                    "frameX" : [176],
                    "frameY" : [256]
                },
                "lbPresent" :
                {
                    "frameX" : [192],
                    "frameY" : [256]
                },
                "antiDiag" :
                {
                    "frameX" : [208],
                    "frameY" : [256]
                },
                "mainDiag" :
                {
                    "frameX" : [224],
                    "frameY" : [256]
                }
            }
        },
        "concreteWall" :
        {
            "tile" : 
            {
                "frameX" : [0],
                "frameY" : [272]
            }
        },
        "ice" :
        {
            "tile" :
            {
                "frameX" : [0],
                "frameY" : [288]
            }
        },
        "grass" :
        {
            "tile" :
            {
                "frameX" : [0],
                "frameY" : [304]
            }
        },
        "water" :
        {
            "tile" :
            {
                "frameX" : [0],
                "frameY" : [320]
            }
        }
    },

    "eagle" :
    {
        "objectSizeX" : 32,
        "objectSizeY" : 32,
        "alive" :
        {
            "frameX" : [0],
            "frameY" : [360]
        },
        "destroyed" :
        {
            "frameX" : [32],
            "frameY" : [360]
        }
    },

    "menu" :
    {
        "battleTitle" : { "frameX" : [134], "frameY" : [274], "width" : 378, "height" : 56 },
        "cityTitle"   : { "frameX" : [206], "frameY" : [354], "width" : 250, "height" : 56 },
        "onePlayer"   : { "frameX" : [324], "frameY" : [423], "width" : 124, "height" : 14 },
        "twoPlayers"  : { "frameX" : [324], "frameY" : [455], "width" : 140, "height" : 14 },
        "construction": { "frameX" : [324], "frameY" : [487], "width" : 188, "height" : 14 },
        "cursor"      : { "frameX" : [0],   "frameY" : [32],  "width" : 32,  "height" : 32 }
    },

    "font" :
    {
        "letterY"      : 994,
        "letterHeight" : 12,
        "digitY"       : 1010,
        "digitHeight"  : 13,
        "letters" :
        {
            "A" : { "x" : 2,   "w" : 12 },
            "B" : { "x" : 18,  "w" : 12 },
            "C" : { "x" : 34,  "w" : 12 },
            "D" : { "x" : 50,  "w" : 12 },
            "E" : { "x" : 66,  "w" : 12 },
            "F" : { "x" : 82,  "w" : 12 },
            "G" : { "x" : 98,  "w" : 12 },
            "H" : { "x" : 114, "w" : 12 },
            "I" : { "x" : 132, "w" : 8  },
            "J" : { "x" : 146, "w" : 12 },
            "K" : { "x" : 162, "w" : 12 },
            "L" : { "x" : 178, "w" : 10 },
            "M" : { "x" : 194, "w" : 14 },
            "N" : { "x" : 210, "w" : 12 },
            "O" : { "x" : 226, "w" : 12 },
            "P" : { "x" : 242, "w" : 12 },
            "Q" : { "x" : 258, "w" : 12 },
            "R" : { "x" : 274, "w" : 12 },
            "S" : { "x" : 290, "w" : 12 },
            "T" : { "x" : 306, "w" : 12 },
            "U" : { "x" : 322, "w" : 12 },
            "V" : { "x" : 338, "w" : 12 },
            "W" : { "x" : 354, "w" : 14 },
            "X" : { "x" : 370, "w" : 12 },
            "Y" : { "x" : 386, "w" : 12 },
            "Z" : { "x" : 402, "w" : 12 }
        },
        "digits" :
        {
            "0" : { "x" : 2,   "w" : 12 },
            "1" : { "x" : 20,  "w" : 8  },
            "2" : { "x" : 34,  "w" : 12 },
            "3" : { "x" : 50,  "w" : 12 },
            "4" : { "x" : 66,  "w" : 12 },
            "5" : { "x" : 82,  "w" : 12 },
            "6" : { "x" : 98,  "w" : 12 },
            "7" : { "x" : 114, "w" : 12 },
            "8" : { "x" : 130, "w" : 12 },
            "9" : { "x" : 146, "w" : 12 }
        },
        "special" :
        {
            "\u00a9" : { "x" : 162, "y" : 1010, "w" : 12, "h" : 13 },
            "."      : { "x" : 182, "y" : 1010, "w" : 4,  "h" : 13 },
            "-"      : { "x" : 258, "y" : 1010, "w" : 12, "h" : 13 }
        }
    }

}`