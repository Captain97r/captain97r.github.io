class GameOverLabel {
    constructor(ctx) {
        this._ctx = ctx;
        this._font = Globals.objects.font;
        
        this._text = "GAME OVER";
        this._letterHeight = this._font.letterHeight;
        this._letterY = this._font.letterY;
        
        this._isAnimating = false;
        this._animationStartTime = 0;
        this._animationDuration = 960;
        this._startY = 0;
        this._targetY = 0;
        this._currentY = 0;

        this._letterWidths = [];
        this._letterPositions = [];
        this._totalWidth = 0;

        // Offscreen canvas used to tint white sprites red
        this._offscreen = document.createElement('canvas');
        this._offscreen.width = 16;
        this._offscreen.height = 16;
        this._offCtx = this._offscreen.getContext('2d');

        this._measureText();
    }
    
    _measureText() {
        const upper = this._text.toUpperCase();
        let currentX = 0;
        
        for (let i = 0; i < upper.length; i++) {
            const ch = upper[i];
            let width = 0;
            
            if (ch === ' ') {
                width = 8;
            } else if (ch === '_') {
                width = 12;
            } else if (this._font.letters[ch]) {
                width = this._font.letters[ch].w + 2;
            } else if (this._font.digits[ch]) {
                width = this._font.digits[ch].w + 2;
            } else if (this._font.special[ch]) {
                width = this._font.special[ch].w + 2;
            }
            
            this._letterWidths.push(width);
            this._letterPositions.push(currentX);
            currentX += width;
        }
        
        this._totalWidth = currentX;
    }
    
    startAnimation() {
        this._isAnimating = true;
        this._animationStartTime = performance.now();
        
        const stageHeight = Globals.STAGE_HEIGHT;
        const stageHOffset = Globals.STAGE_H_OFFSET;
        const spriteSize = Globals.SPRITE_SIZE;
        
        const stagePixelHeight = (stageHeight + stageHOffset * 2) * spriteSize;
        const stagePixelWidth = (Globals.STAGE_WIDTH + Globals.STAGE_W_OFFSET * 3) * spriteSize;
        
        this._startY = stagePixelHeight + 50;
        this._targetY = (stageHOffset + stageHeight / 2) * spriteSize;
        this._currentY = this._startY;
    }
    
    update() {
        if (!this._isAnimating) {
            return;
        }
        
        const elapsed = performance.now() - this._animationStartTime;
        const progress = Math.min(elapsed / this._animationDuration, 1);
        
        this._currentY = this._startY + (this._targetY - this._startY) * progress;
        
        if (progress >= 1) {
            this._isAnimating = false;
            this._currentY = this._targetY;
        }
    }
    
    draw(ctx) {
        const spriteSize = Globals.SPRITE_SIZE;
        const centerX = (Globals.STAGE_W_OFFSET + Globals.STAGE_WIDTH / 2) * spriteSize;
        const startX = centerX - Math.floor(this._totalWidth / 2);
        const y = this._currentY - Math.floor(this._font.letterHeight / 2);

        const upper = this._text.toUpperCase();
        const sprite = Globals.spriteSheet;

        for (let i = 0; i < upper.length; i++) {
            const ch = upper[i];
            if (ch === ' ') continue;

            const x = startX + this._letterPositions[i];
            let srcX, srcY, w, h;

            if (this._font.letters[ch]) {
                srcX = this._font.letters[ch].x;
                srcY = this._font.letterY;
                w    = this._font.letters[ch].w;
                h    = this._font.letterHeight;
            } else if (this._font.digits[ch]) {
                srcX = this._font.digits[ch].x;
                srcY = this._font.digitY;
                w    = this._font.digits[ch].w;
                h    = this._font.digitHeight;
            } else {
                continue;
            }

            // Tint white sprite red via offscreen canvas
            this._offCtx.clearRect(0, 0, 16, 16);
            this._offCtx.drawImage(sprite, srcX, srcY, w, h, 0, 0, w, h);
            this._offCtx.globalCompositeOperation = 'source-in';
            this._offCtx.fillStyle = '#FF0000';
            this._offCtx.fillRect(0, 0, 16, 16);
            this._offCtx.globalCompositeOperation = 'source-over';
            ctx.drawImage(this._offscreen, 0, 0, w, h, x, y, w, h);
        }
    }
    
    isAnimating() {
        return this._isAnimating;
    }
    
    isComplete() {
        return !this._isAnimating;
    }
}