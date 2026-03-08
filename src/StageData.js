/**
 * Stage enemy compositions — original NES Battle City data.
 * Each stage has 20 enemies. Values are EnemyTypeEnum constants.
 * B=BASIC, F=FAST, P=POWER, A=ARMOR
 */
var StageEnemies = (function() {
    const B = EnemyTypeEnum.BASIC;
    const F = EnemyTypeEnum.FAST;
    const P = EnemyTypeEnum.POWER;
    const A = EnemyTypeEnum.ARMOR;

    return [
        // Stage 1-5
        [B,B,B,B,B,B,B,B,B,B, B,B,B,B,B,B,B,B,F,F],
        [B,B,B,B,B,B,F,F,F,F, B,B,B,B,F,F,F,F,F,F],
        [B,B,B,B,F,F,F,F,F,F, P,P,P,P,B,B,B,B,F,F],
        [B,B,B,B,F,F,F,F,P,P, P,P,A,A,B,B,B,B,F,F],
        [B,B,B,B,F,F,P,P,P,P, A,A,A,A,B,B,F,F,F,F],

        // Stage 6-10
        [B,B,F,F,F,F,P,P,P,P, A,A,A,A,B,B,F,F,P,P],
        [B,B,F,F,P,P,P,P,A,A, A,A,F,F,F,F,P,P,A,A],
        [F,F,F,F,P,P,P,P,A,A, A,A,F,F,F,F,P,P,A,A],
        [F,F,F,F,P,P,A,A,A,A, F,F,F,F,P,P,A,A,A,A],
        [F,F,P,P,P,P,A,A,A,A, F,F,P,P,A,A,A,A,A,A],

        // Stage 11-15
        [F,F,P,P,A,A,A,A,A,A, F,F,P,P,A,A,A,A,A,A],
        [P,P,P,P,A,A,A,A,A,A, P,P,P,P,A,A,A,A,A,A],
        [P,P,A,A,A,A,A,A,A,A, P,P,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,A,A, P,P,P,P,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,A,A, A,A,A,A,A,A,A,A,A,A],

        // Stage 16-20
        [B,B,B,B,B,B,B,B,B,B, B,B,B,B,B,B,B,B,F,F],
        [B,B,B,B,B,B,F,F,F,F, B,B,B,B,F,F,F,F,F,F],
        [B,B,B,B,F,F,F,F,F,F, P,P,P,P,B,B,B,B,F,F],
        [B,B,B,B,F,F,F,F,P,P, P,P,A,A,B,B,B,B,F,F],
        [B,B,B,B,F,F,P,P,P,P, A,A,A,A,B,B,F,F,F,F],

        // Stage 21-25
        [B,B,F,F,F,F,P,P,P,P, A,A,A,A,B,B,F,F,P,P],
        [B,B,F,F,P,P,P,P,A,A, A,A,F,F,F,F,P,P,A,A],
        [F,F,F,F,P,P,P,P,A,A, A,A,F,F,F,F,P,P,A,A],
        [F,F,F,F,P,P,A,A,A,A, F,F,F,F,P,P,A,A,A,A],
        [F,F,P,P,P,P,A,A,A,A, F,F,P,P,A,A,A,A,A,A],

        // Stage 26-30
        [F,F,P,P,A,A,A,A,A,A, F,F,P,P,A,A,A,A,A,A],
        [P,P,P,P,A,A,A,A,A,A, P,P,P,P,A,A,A,A,A,A],
        [P,P,A,A,A,A,A,A,A,A, P,P,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,A,A, P,P,P,P,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,A,A, A,A,A,A,A,A,A,A,A,A],

        // Stage 31-35
        [B,B,F,F,P,P,A,A,A,A, B,B,F,F,P,P,A,A,A,A],
        [F,F,F,F,P,P,P,P,A,A, A,A,A,A,A,A,A,A,A,A],
        [P,P,P,P,A,A,A,A,A,A, P,P,P,P,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,A,A, A,A,A,A,A,A,A,A,A,A],
        [A,A,A,A,A,A,A,A,A,A, A,A,A,A,A,A,A,A,A,A],
    ];
})();
