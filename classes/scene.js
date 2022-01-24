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

        this.selectedWord = {
            word: '',
            coords: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            state: wordState.INCORRECT
        };
    }

    setInputer(inputer) {
        this.inputer = inputer;
    }

    checkWord(word) {
        return this.vocab.includes(word.toLowerCase()) ? wordState.CORRECT : wordState.INCORRECT;
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
            let word = this.board.selectedTiles.map(a => a.letter).join('');
            let wordState = this.checkWord(word);

            rectMode(CORNER);
            let width = textWidth(word)
            stroke(wordStateStyle[wordState].backColor);
            fill(wordStateStyle[wordState].backColor);
            let margin = 20
            let wordRect = rect(this.centerPointX - width / 2 - margin, this.board.width + headerHeight, width + margin * 2, this.board.tileWidth, 20);
            console.log(wordRect);

            textAlign(CENTER, CENTER);
            rectMode(CENTER);
            stroke(wordStateStyle[wordState].strokeColor);
            fill(wordStateStyle[wordState].strokeColor);
            // text(word, this.board.x, this.board.width + headerHeight, this.board.width, this.board.tileWidth);
            text(word, this.centerPointX, this.board.width + headerHeight + this.board.tileWidth / 2);

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

        // check if the word was clicked

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