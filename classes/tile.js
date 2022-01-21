var State = {
        INACTIVE: 0,
        SELECTED: 1,
        EDITED: 2
    },
    statessDict = {
        [State.INACTIVE]: {
            color: '#b0e0e6',
            strokeWeight: 4
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
    constructor(x, y, width, ind_x, ind_y) {
        // center points
        this.x = x;
        this.y = y;

        // indexes on the board
        this.ind_x = ind_x;
        this.ind_y = ind_y;

        // size
        this.width = width;

        // state
        this.state = State.INACTIVE;

        // letter
        this.letter = '';

        // inner color - this is to show that it belongs to a word
        this.innerColor = '#97bec4';
    }

    clicked() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.diameter / 2) {
            this.color = color(255, 0, 200)
        }
    }

    render() {
        fill(this.innerColor);
        stroke(statessDict[this.state]['color']);
        strokeWeight(statessDict[this.state]['strokeWeight']);
        rect(this.x - this.width / 2, this.y - this.width / 2, this.x + this.width / 2, this.y + this.width / 2);
    }
}