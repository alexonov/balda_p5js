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

        let margin = 4;

        let tileWidth = Math.floor((width - margin) / numLetters) - margin;

        this.tiles = [];

        for (let index = 0; index < numLetters ** 2; index++) {
            let j = index % numLetters;
            let i = Math.floor(index / numLetters);

            let tileX = this.x + (j + 1) * (margin + tileWidth) - Math.floor(tileWidth / 2);
            let tileY = this.y + (i + 1) * (margin + tileWidth) - Math.floor(tileWidth / 2);

            this.tiles.push(new Tile(tileX, tileY, tileWidth, i, j));
        }

        this.tileWidth = tileWidth;

        this.editedTile = null;
        this.selectedTiles = [];
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
            let centerI = Math.floor(this.numLetters / 2);
            for (var j = 0; j < word.length; j++) {
                let tile = this.getTile(centerI, j);
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

    setAllInactive() {
        this.tiles.forEach(t => {
            t.setInactiveState();
        });
        this.editedTile = null;
        this.selectedTiles = [];
    }

    clicked() {
        if (mouseX > this.x &
            mouseX < this.x + this.width &
            mouseY > this.y &
            mouseY < this.y + this.width) {

            for (const tile of this.tiles) {
        
                if (tile.isClicked()) {

                    console.log(`clicked ${tile.i}, ${tile.j}`);
                    console.log(this.editedTile);

                    // if clicked tile is beinng edited - do nothing
                    if (tile.isEdited()) {
                        console.log('break');
                        break;
                    }

                    // if some other tile is edited - stop editing and set all inactive
                    else if (this.editedTile != null) {
                        this.setAllInactive();
                    }

                    // if the tile is empty: we want to put letter there
                    else if (tile.isEmpty()) {
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
                        this.editedTile = tile;

                        // 4. reset selected word
                        this.selectedTiles = [];

                    }

                    // if tile is not empty but editable
                    // we may either select it as part of word
                    // or edit the letter
                    else if (tile.isEditable) {
                        // if already selected - second click starts editing
                        if (tile.isSelected()) {
                            tile.setEditedState();
                            this.editedTile = tile;
                            tile.letter = '';
                        } else {
                            // if not selected - select to be part of word
                            tile.setSelectedState();
                            if (!this.selectedTiles.includes(tile)) {
                                this.selectedTiles.push(tile);
                            }
                        }
                    } else {
                        // TODO: add logic to only allow valid selection
                        // that can be trated as a word (no crossing, no diagonal)
                        tile.setSelectedState();
                        if (!this.selectedTiles.includes(tile)) {
                            this.selectedTiles.push(tile);
                        }
                    }
                    console.log(this.editedTile);
                    break;

                }
            }
        }
    }
}