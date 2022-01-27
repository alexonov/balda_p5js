var State = {
        INACTIVE: 0,
        SELECTED: 1,
        EDITED: 2,
        ANIMATED: 3
    },
    statessDict = {
        [State.INACTIVE]: {
            color: '#b5c3d1',
            strokeWeight: 2
        },
        [State.SELECTED]: {
            color: '#5d86a0',
            strokeWeight: 4
        },
        [State.EDITED]: {
            color: '#00264c',
            strokeWeight: 2
        },
        [State.ANIMATED]: {
            color: '#b5c3d1',
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

        this.animationCounter = 0;
        this.animationAdder = 3;
        this.animationColor = 'white';

        this.startColor = {
            red: Math.floor(Math.random() * 200) + 50,
            green: Math.floor(Math.random() * 200) + 50,
            blue: Math.floor(Math.random() * 200) + 50,
        }
    }

    animate() {
        this.animationCounter += this.animationAdder;

        let red = this.startColor.red + this.animationCounter;
        let green = this.startColor.green + this.animationCounter;
        let blue = this.startColor.blue + this.animationCounter;
        this.animationColor = color(red, green, blue);

        if (Math.min(red, green, blue) > 200) {
            this.animationAdder *= -1;
        } else if (this.animationCounter < 0) {
            this.animationAdder *= -1;
        }
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

        let strokeColor = 'white';
        let fillColor = 'white';

        if (this.isAnimated()) {
            this.animate();
            strokeColor = this.animationColor;
            fillColor = this.animationColor;
        } else {
            strokeColor = statessDict[this.state]['color'];
            fillColor = statessDict[this.state]['color'];
        }

        stroke(strokeColor);
        strokeWeight(statessDict[this.state]['strokeWeight']);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.width);
        textSize(this.width * 0.8);
        fill(fillColor);
        textAlign(CENTER, CENTER);
        textFont('Helvetica');
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

    setAnimatedState() {
        this.state = State.ANIMATED;
    }

    isEmpty() {
        return this.letter === '';
    }

    isSelected() {
        return this.state === State.SELECTED;
    }

    isEdited() {
        return this.state === State.EDITED;
    }

    isInactive() {
        return this.state === State.INACTIVE;
    }

    isAnimated() {
        return this.state === State.ANIMATED;
    }

    getLetter() {
        return this.letter;
    }

    setLetter(letter) {
        if (letter.length == 1) {
            this.letter = letter.toUpperCase()
        }
    }

    eraseLetter() {
        this.letter = '';
    }

    markEditable(state) {
        this.isEditable = state
    }

    hasSavedLetter() {
        return !this.isEditable & this.letter !== '';
    }

    hasLetter() {
        return this.letter !== '';
    }
}