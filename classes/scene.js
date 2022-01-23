class Scene {
    constructor(width, startingWord, vocab) {
        this.width = width;
        this.board = new Board(0, 90, width, startingWord.length);
        this.board.setStartingWord(startingWord);

        this.vocab = vocab;

    }

    setInputer(inputer) {
        this.inputer = inputer;
    }

    checkWord(word) {
        return this.vocab.includes(word.toLowerCase())
    }

    render() {
        // header
        strokeWeight(0.5);
        stroke('#5d86a0');
        line(10, this.board.tileWidth, this.width - 10, this.board.tileWidth);

        textSize(this.board.tileWidth);
        fill('#5d86a0');
        textAlign(CENTER, BOTTOM);
        text('бʌлда́', this.width / 2, this.board.tileWidth);

        this.board.render();
    }

    clicked() {
        this.board.clicked();

        // show inputer
        if (this.board.editedTile != null) {
            let tile = this.board.editedTile
            this.inputer.show();
            this.inputer.value(tile.letter);
            this.inputer.elt.setSelectionRange(0, this.inputer.value().length);
            this.inputer.elt.focus();
            this.inputer.position(tile.x - tile.width / 2, tile.y - tile.width / 2);
        }

        // hide inputer
        else {
            this.inputer.hide();
        }
    }

    quitInputer() {
        this.board.editedTile.letter = this.inputer.value();
        this.inputer.hide();
        this.board.setAllInactive();
    }

    readInputer() {
        this.board.editedTile.letter = this.inputer.value();
    }
}