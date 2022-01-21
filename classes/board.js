class Board {
    constructor(x, y, width, numLetters) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.numLetters = numLetters;

        let margin = 8;

        let tileWidth = Math.floor((width - margin) / numLetters) - margin;
        console.log(width);
        console.log(tileWidth);

        this.tiles = [];

        for (let index = 0; index < numLetters ** 2; index++) {
            let j = index % numLetters;
            let i = Math.floor(index / numLetters);
            console.log(i, j);
            let tileX = this.x + (i + 1) * (margin + tileWidth) - Math.floor(tileWidth / 2);
            let tileY = this.y + (j + 1) * (margin + tileWidth) - Math.floor(tileWidth / 2);
            console.log(tileX, tileY, tileWidth);
            this.tiles.push(new Tile(tileX, tileY, tileWidth, i, j));
        }
    }

    render() {
        this.tiles.forEach(element => {
            // console.log(element);
            element.render();
        });
    }
}