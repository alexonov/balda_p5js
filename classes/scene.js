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

let buttonColor = '#b5c3d1';
let scoreColor = '#5d86a0';

let notificationTimeout = 5;

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

        this.score = startingWord.length - startingWord.length ** 2;
        this.startingScore = this.score;

        this.headerButtons = [{
                name: 'paste',
                button: new HeaderButton(x + headerHeight * 0.2, 0, headerHeight * 0.8, '⎙', buttonColor, buttonColor),
            },
            // {
            //     name: 'paste',
            //     button: new HeaderButton(x + headerHeight * 1.2, 0, headerHeight * 0.8, '⎀', buttonColor, buttonColor),
            // },
            {
                name: 'copy',
                button: new HeaderButton(x + this.board.width - headerHeight * 0.8, 0, headerHeight * 0.8, '⎘', buttonColor, buttonColor),
            },
            {
                name: 'score',
                button: new HeaderButton(x + headerHeight * 1.2, headerHeight * 0.8 / 2, headerHeight * 0.5, this.score, buttonColor, 'white'),
            },


        ]

        this.isScoreVisible = false;

    }

    headerCallback(buttonName) {
        switch (buttonName) {
            case 'restart':
                this.restart();
                break;
            case 'score':
                this.isScoreVisible = true;
                break;
            case 'copy':
                this.copyState();
                break;
            case 'paste':
                this.pasteState();
                break;

            default:
                break;
        }
    }

    reset() {
        this.words = [];
        this.score = this.startingScore;
    }

    restart() {
        console.log('restarting...')
        this.reset();

        let newWord = '';
        do {
            newWord = this.vocab[Math.floor(Math.random() * this.vocab.length)];
        } while (newWord.length != this.board.numLetters);
        this.board.setStartingWord(newWord);
    }

    showScore() {

        let cardWidth = this.board.width - this.board.tileWidth;

        rectMode(CORNER);
        stroke(scoreColor);
        fill(255, 255, 255, 150);
        rect(this.board.tiles[0].x, this.board.tiles[0].y, cardWidth, this.board.width);

        fill(scoreColor);
        stroke('white');
        textSize(this.board.tileWidth * 0.20);
        let words = this.words.map(w => w + ` (${w.length - 2})`).join('\n');
        textAlign(CENTER, TOP);
        text(words, this.board.tiles[0].x, this.board.tiles[0].y, cardWidth, this.board.width);
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
        // textSize(60);
        // textStyle(NORMAL);
        // stroke('white');
        // fill('#5d86a0');
        // textAlign(CENTER, BOTTOM);
        // text('⎘ ⎀ ↺', this.board.x + this.board.width / 2, this.board.tileWidth / 2);
        this.headerButtons.forEach((e) => {
            if (e.name === 'score') {
                e.button.setText('Счёт: ' + this.score);
            }
            e.button.render();
        });

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

        // show score
        if (this.isScoreVisible) {
            this.showScore();
        }
    }

    clicked() {
        // if showing score - hide and do nothing
        if (this.isScoreVisible) {
            this.isScoreVisible = false;
            return;
        }

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
                this.score += word.length - 2;
                this.board.saveSelectedLetter();
                this.board.resetToSavedState();

                console.log(this.words);

                if (this.board.isFull()) {
                    this.board.animate();
                }
            }

        }

        this.headerButtons.forEach((button) => {
            if (button.button.isClicked()) {
                console.log(`${button.name} is clicked!`);
                this.headerCallback(button.name);
            }
        })

    }

    quitInputer() {
        this.board.editedTile.letter = this.inputer.value();
        this.inputer.hide();
        this.board.setAllInactive();
    }

    readInputer() {
        this.board.editedTile.letter = this.inputer.value();
    }

    asString() {
        let encoded = this.board.asString();

        // add already composed words
        for (const word of this.words) {
            encoded += '.' + word;
        }

        return encoded;
    }

    copyState() {
        let encodedState = encodeString(this.asString());
        let zippedState = zip(encodedState);

        // switching off while i'm fixing it in telegram
        if (false) {
        // if (navigator.share) {
            navigator.share({
                    title: 'Balda share',
                    text: zippedState,
                    url: '',
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            // copy to clipboard
            // Create a dummy input to copy the string array inside it
            var dummy = document.createElement("input");

            // Add it to the document
            document.body.appendChild(dummy);

            // Set its ID
            dummy.setAttribute("id", "dummy_id");

            // Output the array into it
            document.getElementById("dummy_id").value = zippedState;

            // Select it
            dummy.select();

            // Copy its contents
            document.execCommand("copy");

            // Remove it as its not needed anymore
            document.body.removeChild(dummy);

            // TODO: add message

            console.log('Share not supported on this browser, copied to clipboard.');
        }

        console.log(encodedState);
        console.log(zippedState);

    }

    pasteState() {
        let zippedState = prompt("Вставьте строку из буффера мол");
        console.log(zippedState);

        if (zippedState === null) {
            return;
        }

        let unzippedState = unzip(zippedState);
        let decodedState = decodeString(unzippedState).split('.');

        this.board.restoreState(decodedState[0]);

        this.reset();
        for (const word of decodedState.slice(1)) {
            this.words.push(word);
            this.score += word.length - 2;
        }
    }
}