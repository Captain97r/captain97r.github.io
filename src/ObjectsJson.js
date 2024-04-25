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
                "bottom" :
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
    }

}`