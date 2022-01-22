var State = {
        INACTIVE: 0,
        SELECTED: 1,
        EDITED: 2
    },
    statessDict = {
        [State.INACTIVE]: {
            color: '#bcbcbc',
            strokeWeight: 2
        },
        [State.SELECTED]: {
            color: '#f68c20',
            strokeWeight: 4
        },
        [State.EDITED]: {
            color: '#f68c20',
            strokeWeight: 2
        },
    };


function randHex() {
    return (Math.floor(Math.random() * 56) + 200).toString(16);
}

function randColor() {
    return '#' + randHex() + '' + randHex() + '' + randHex();
}



class Tile {
    constructor(x, y, width, i, j, letter = '', isEditable = true) {
        // center points
        this.x = x;
        this.y = y;

        // indexes on the board
        this.i = i;
        this.j = j;

        // size
        this.width = width;

        // state
        this.state = State.INACTIVE;

        // letter
        this.letter = letter;

        // if tile can be edited
        this.isEditable = isEditable;

        // inner color - this is to show that it belongs to a word
        this.innerColor = 'white';
    }

    isClicked() {
        if (dist(mouseX, 0, this.x, 0) < this.width / 2 &
            dist(0, mouseY, 0, this.y) < this.width / 2) {

            return true;
        } else {
            return false;
        }

    }

    render() {
        fill(this.innerColor);
        stroke(statessDict[this.state]['color']);
        strokeWeight(statessDict[this.state]['strokeWeight']);
        rect(this.x - this.width / 2, this.y - this.width / 2, this.width, this.width);
        text(this.letter, this.x, this.y);
    }

    setInactiveState() {
        this.state = State.INACTIVE;
    }

    setSelectedState() {
        this.state = State.SELECTED;
    }

    setEditedState() {
        this.state = State.EDITED;
    }

    isEmpty() {
        return this.letter === '';
    }

    getLetter() {
        return this.letter;
    }

    setLetter(letter) {
        if (letter.length == 1) {
            this.letter = letter
        }
    }

    eraseLetter() {
        this.letter = '';
    }

    markEditable(state) {
        this.isEditable = state
    }
}