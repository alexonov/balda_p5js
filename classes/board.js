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

    saveSelectedLetter() {
        for (const tile of this.selectedTiles) {
            tile.markEditable(false);
        }
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

    resetToSavedState() {
        this.tiles.forEach(t => {
            t.setInactiveState();
            if (t.isEditable) {
                t.eraseLetter();
            }
        });
        this.editedTile = null;
        this.selectedTiles = [];
    }

    isValidIndex(i) {
        return i >= 0 & i < this.numLetters;
    }

    getNeighbours(tile) {
        let i = tile.i;
        let j = tile.j;
        let neighbours = [];
        let sides = [-1, 1];
        for (const side of sides) {
            if (this.isValidIndex(i + side)) {
                neighbours.push({
                    i: i + side,
                    j: j
                });
            };
            if (this.isValidIndex(j + side)) {
                neighbours.push({
                    i: i,
                    j: j + side
                });
            }
        }
        return neighbours;
    }

    hasSavedLetterNeighbours(tile) {
        let neighbours = this.getNeighbours(tile);
        for (const n of neighbours) {
            let nTile = this.getTile(n.i, n.j);
            if (nTile.hasSavedLetter()) {
                return true;
            }
        }
        return false;
    }

    hasLetterNeighbours(tile) {
        let neighbours = this.getNeighbours(tile);
        for (const n of neighbours) {
            let nTile = this.getTile(n.i, n.j);
            if (nTile.hasLetter()) {
                return true;
            }
        }
        return false;
    }

    hasSelectedNeighbours(tile) {
        let neighbours = this.getNeighbours(tile);
        for (const n of neighbours) {
            let nTile = this.getTile(n.i, n.j);
            if (nTile.isSelected()) {
                return true;
            }
        }
        return false;
    }

    isNeighbourOfLastSelected(tile) {
        let neighbours = this.getNeighbours(tile);
        for (const n of neighbours) {
            let nTile = this.getTile(n.i, n.j);
            if (nTile === this.selectedTiles.at(-1)) {
                return true;
            }
        }
        return false;
    }

    selectTile(tile) {
        tile.setSelectedState();
        this.selectedTiles.push(tile);
    }

    unselectTile(tile) {
        // assumes tile is last in list of selected tiles
        tile.setInactiveState();
        this.selectedTiles.pop();
    }

    clicked() {
        // quit if missed
        if (!(mouseX > this.x &
                mouseX < this.x + this.width &
                mouseY > this.y &
                mouseY < this.y + this.width)) {
            return;
        }

        // either we click to edit or to select
        // if none of those is allowed - we reset
        for (const tile of this.tiles) {
            if (tile.isClicked()) {

                console.log(`clicked ${tile.i}, ${tile.j}`);

                // 1. if editing the tile - ignore the click
                if (tile.isEdited()) {
                    console.log('Edited tile was clicked - do nothing');
                    break;
                }

                // 2. if some other tile is edited - stop editing and set all inactive
                else if (this.editedTile != null) {
                    // this.setAllInactive();
                    console.log('Clicked on other tile while editing - stop editing');
                    break;
                }

                // 3. click to select can be if clicked tile has letter and not yet selected
                else if (tile.hasLetter() & !tile.isSelected()) {
                    console.log('Clicked on unselected letter');

                    // we can select it if 
                    // a. there are no other selected tiles
                    if (this.selectedTiles.length === 0) {
                        this.selectTile(tile);
                    }
                    // b. last selected tile is a neighbour of clicked tile - we can also select it
                    else if (this.isNeighbourOfLastSelected(tile)) {
                        this.selectTile(tile);
                    }
                }

                // 4. if click on selected - we can unselect it or edit it
                else if (tile.isSelected()) {
                    // a. tile is editable - we reset all and start editing
                    if (tile.isEditable) {
                        this.setAllInactive();
                        tile.setEditedState();
                        this.editedTile = tile;
                    }

                    // b. tile is last in selected list - we can unselect it
                    else if (this.selectedTiles.at(-1) === tile) {
                        this.unselectTile(tile);
                    }
                }

                // 5. if tile is editable and has a letter as a saved neighbour
                //    - reset all, clear all editable and start editing 
                else if (tile.isEditable & this.hasSavedLetterNeighbours(tile)) {
                    this.resetToSavedState();
                    tile.setEditedState();
                    this.editedTile = tile;
                }

                // 6. if no other special case - we reset all states to inactive
                else {
                    this.setAllInactive();
                }
                break;
            }
        }
    }
}