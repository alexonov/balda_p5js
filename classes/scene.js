const maxBoardWidth = 500;
const headerHeight = 70;

var wordState = {
        INCORRECT: 0,
        CORRECT: 1
    },
    wordStateStyle = {
        [wordState.INCORRECT]: {
            strokeColor: '#d7e2e9',
            backColor: 'white'
        },
        [wordState.CORRECT]: {
            strokeColor: '#d7e2e9',
            backColor: '#5d86a0'
        }
    }

class Scene {
    constructor(width, startingWord, vocab) {
        // calculate center point and board width
        this.centerPointX = Math.floor(width / 2);

        let boardWidth = Math.min(maxBoardWidth, width);

        // top left corner for board
        let x = this.centerPointX - Math.floor(boardWidth / 2);

        this.board = new Board(x, headerHeight, boardWidth, startingWord.length);
        this.board.setStartingWord(startingWord);

        this.vocab = vocab;

        this.words = [];
    }

    setInputer(inputer) {
        this.inputer = inputer;
    }

    getSelectedWord() {
        return this.board.selectedTiles.map(a => a.letter).join('');
    }

    isCurrentCurrentWordOK() {
        let word = this.getSelectedWord();
        let isInVocab = this.vocab.includes(word.toLowerCase());
        let notAlreadyPlayed = !this.words.includes(word);
        let hasNewLetter = this.board.selectedTiles.some((t) => t.isSelected());
        return isInVocab & notAlreadyPlayed & hasNewLetter
    }

    wordRectCoordinates(word) {
        let width = textWidth(word)
        let margin = 20

        return {
            x: this.centerPointX - width / 2 - margin,
            y: this.board.width + headerHeight,
            width: width + margin * 2,
            height: this.board.tileWidth
        }
    }

    render() {
        // header
        // textSize(this.board.tileWidth);
        // fill('#5d86a0');
        // textAlign(CENTER, BOTTOM);
        // text('бʌлда́', this.board.x + this.board.width / 2, this.board.tileWidth);

        strokeWeight(0.5);
        stroke('#5d86a0');
        line(this.board.x + 10, headerHeight * 0.9, this.board.x + this.board.width - 10, headerHeight * 0.9);

        this.board.render();

        // display selected word
        if (this.board.selectedTiles.length != 0) {

            let word = this.getSelectedWord();
            let state = this.isCurrentCurrentWordOK() ? wordState.CORRECT : wordState.INCORRECT;

            let coords = this.wordRectCoordinates(word);

            rectMode(CORNER);
            stroke(wordStateStyle[state].backColor);
            fill(wordStateStyle[state].backColor);

            rect(coords.x, coords.y, coords.width, coords.height, 20);

            textAlign(CENTER, CENTER);
            rectMode(CENTER);
            stroke(wordStateStyle[state].strokeColor);
            fill(wordStateStyle[state].strokeColor);
            text(word,
                this.centerPointX,
                this.board.width + headerHeight + this.board.tileWidth / 2);

        }
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

        // check if the word was clicked only if word is OK

        if (this.isCurrentCurrentWordOK()) {
            let word = this.getSelectedWord();
            let coords = this.wordRectCoordinates(word)
            if (mouseX > coords.x &
                mouseX < coords.x + coords.width &
                mouseY > coords.y &
                mouseY < coords.y + coords.height) {

                this.words.push(word);
                this.board.saveSelectedLetter();
                this.board.resetToSavedState();

                console.log(this.words);
            }

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