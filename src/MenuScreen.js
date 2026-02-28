class MenuScreen {
    constructor(ctx) {
        this._ctx = ctx;
        this._selectedOption = 0; // 0=I PLAYER, 1=II PLAYERS, 2=CONSTRUCTION
        this._startGame = false;

        this._menu = Globals.objects.menu;
        this._font = Globals.objects.font;
        this._sprite = Globals.spriteSheet;

        // Horizontal center of the game area
        this._centerX = 256; // 512 / 2

        // Menu option Y positions
        this._optionY = [230, 264, 298];
        this._optionWidths = [
            this._menu.onePlayer.width,
            this._menu.twoPlayers.width,
            this._menu.construction.width
        ];
    }

    // Measure the pixel width of a string using the font atlas
    _measureText(text) {
        const upper = text.toUpperCase();
        let width = 0;
        for (let i = 0; i < upper.length; i++) {
            const ch = upper[i];
            if (ch === ' ') {
                width += 8;
            } else if (ch === '_') {
                width += 12;
            } else if (this._font.letters[ch]) {
                width += this._font.letters[ch].w + 2;
            } else if (this._font.digits[ch]) {
                width += this._font.digits[ch].w + 2;
            } else if (this._font.special[ch]) {
                width += this._font.special[ch].w + 2;
            }
        }
        return width;
    }

    // Draw a text string at (x, y) using the sprite font
    _drawText(text, x, y) {
        const ctx = this._ctx;
        const sprite = this._sprite;
        const font = this._font;
        const upper = text.toUpperCase();
        let curX = x;

        for (let i = 0; i < upper.length; i++) {
            const ch = upper[i];

            if (ch === ' ') {
                curX += 8;
                continue;
            }

            // Underscore: draw a white filled rectangle at the baseline
            if (ch === '_') {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(curX, y + font.letterHeight - 2, 10, 2);
                curX += 12;
                continue;
            }

            let srcX, srcY, w, h;

            if (font.letters[ch]) {
                srcX = font.letters[ch].x;
                srcY = font.letterY;
                w    = font.letters[ch].w;
                h    = font.letterHeight;
            } else if (font.digits[ch]) {
                srcX = font.digits[ch].x;
                srcY = font.digitY;
                w    = font.digits[ch].w;
                h    = font.digitHeight;
            } else if (font.special[ch]) {
                srcX = font.special[ch].x;
                srcY = font.special[ch].y;
                w    = font.special[ch].w;
                h    = font.special[ch].h;
            } else {
                curX += 8;
                continue;
            }

            ctx.drawImage(sprite, srcX, srcY, w, h, curX, y, w, h);
            curX += w + 2;
        }
    }

    // Draw a text string centered at the given X position
    _drawTextCentered(text, centerX, y) {
        const width = this._measureText(text);
        this._drawText(text, centerX - Math.floor(width / 2), y);
    }

    update() {
        const ctx = this._ctx;
        const sprite = this._sprite;
        const menu = this._menu;

        // Black background covering game area
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 512, 480);

        // --- BATTLE CITY title ---
        const battleX = this._centerX - Math.floor(menu.battleTitle.width / 2);
        ctx.drawImage(sprite,
            menu.battleTitle.frameX[0], menu.battleTitle.frameY[0],
            menu.battleTitle.width, menu.battleTitle.height,
            battleX, 50,
            menu.battleTitle.width, menu.battleTitle.height);

        const cityX = this._centerX - Math.floor(menu.cityTitle.width / 2);
        ctx.drawImage(sprite,
            menu.cityTitle.frameX[0], menu.cityTitle.frameY[0],
            menu.cityTitle.width, menu.cityTitle.height,
            cityX, 130,
            menu.cityTitle.width, menu.cityTitle.height);

        // --- Menu options ---
        const optionSprites = [menu.onePlayer, menu.twoPlayers, menu.construction];
        for (let i = 0; i < optionSprites.length; i++) {
            const opt = optionSprites[i];
            const optX = this._centerX - Math.floor(opt.width / 2);
            const optY = this._optionY[i];
            ctx.drawImage(sprite,
                opt.frameX[0], opt.frameY[0],
                opt.width, opt.height,
                optX, optY,
                opt.width, opt.height);
        }

        // --- Tank cursor (to the left of selected option) ---
        const cursor = menu.cursor;
        const selectedOpt = optionSprites[this._selectedOption];
        const selectedOptX = this._centerX - Math.floor(selectedOpt.width / 2);
        const cursorX = selectedOptX - cursor.width - 4;
        const cursorY = this._optionY[this._selectedOption] - Math.floor((cursor.height - selectedOpt.height) / 2);
        ctx.drawImage(sprite,
            cursor.frameX[0], cursor.frameY[0],
            cursor.width, cursor.height,
            cursorX, cursorY,
            cursor.width, cursor.height);

        // --- Copyright text ---
        this._drawTextCentered('1985 NAMCO LTD.', this._centerX, 380);

        // --- Custom credit ---
        this._drawTextCentered('2026 WOUNDERKID_', this._centerX, 400);
    }

    handleKeyPress(evt) {
        switch (evt.key) {
            case 'w':
            case 'W':
            case 'ArrowUp':
                this._selectedOption = Math.max(0, this._selectedOption - 1);
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                this._selectedOption = Math.min(2, this._selectedOption + 1);
                break;
            case ' ':
            case 'Enter':
                if (this._selectedOption === 0) {
                    this._startGame = true;
                }
                break;
        }
    }

    handleKeyRelease(evt) {
        // No-op — required for interface compatibility
    }

    isStartGame() {
        return this._startGame;
    }
}
