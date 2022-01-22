var boardState = {
    INACTIVE: 0,
    SELECTED: 1,
    EDITED: 2
}

class Board {
    constructor(x, y, width, numLetters) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.numLetters = numLetters;

        let margin = 8;

        let tileWidth = Math.floor((width - margin) / numLetters) - margin;

        this.tiles = [];

        for (let index = 0; index < numLetters ** 2; index++) {
            let j = index % numLetters;
            let i = Math.floor(index / numLetters);

            let tileX = this.x + (i + 1) * (margin + tileWidth) - Math.floor(tileWidth / 2);
            let tileY = this.y + (j + 1) * (margin + tileWidth) - Math.floor(tileWidth / 2);

            this.tiles.push(new Tile(tileX, tileY, tileWidth, j, i));
        }

        this
    }

    getTile(i, j) {
        return this.tiles[i * this.numLetters + j];
    }

    placeLetter(i, j, letter) {
        tile = this.getTile(i, j);
        tile.setLetter(letter);
        tile.markEditable(false);
    }

    setStartingWord(word) {
        if (word.length == this.numLetters) {
            // center i
            let centerI = Math.floor(this.numLetters / 2) + 1;
            for (var j = 0; j < word.length; j++) {
                tile = this.getTile(centerI, j);
                tile.setLetter(word[j]);
                tile.markEditable(false);
            }
        }
    }

    render() {
        this.tiles.forEach(element => {
            element.render();
        });
    }

    clicked() {
        if (mouseX > this.x &
            mouseX < this.x + this.width &
            mouseY > this.y &
            mouseY < this.y + this.width) {

            this.tiles.forEach(tile => {
                if (tile.isClicked()) {

                    console.log(`clicked ${tile.i}, ${tile.j}`);

                    // if the tile is empty: we want to put letter there
                    if (tile.isEmpty()) {
                        this.tiles.forEach(t => {
                            // 1. set all other tiles to inactive
                            t.setInactiveState();

                            // 2. empty all editable tiles (there can be only one new letter)
                            if (t.isEditable) {
                                t.eraseLetter();
                            }
                        });
                        // 3. set selected tile as edited
                        tile.setEditedState();

                    }

                }
            });
        }
    }
}