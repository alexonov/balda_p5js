class HeaderButton {
    constructor(x, y, size, symbol, color, strokeColor, textAlign = CENTER) {
        this.x = x;
        this.y = y;
        this.height = size;
        this.color = color;
        this.strokeColor = strokeColor;
        this.rectMode = CORNER;
        this.textAlign = textAlign;

        this.symbol = symbol;
        textSize(this.height);
        this.width = textWidth(symbol);
    }

    setText(t) {
        this.symbol = t;
        textSize(this.height);
        this.width = textWidth(t);
    }

    render() {
        rectMode(this.rectMode);

        // fill('white');
        // stroke(this.color);
        // rect(this.x, this.y, this.width, this.height * 0.8);

        stroke(this.strokeColor);
        fill(this.color);
        textSize(this.height);
        textFont('Helvetica');
        textStyle(NORMAL);
        textAlign(LEFT, TOP);
        text(this.symbol, this.x, this.y)
    }

    isClicked() {
        return (mouseX > this.x &
            mouseX < this.x + this.width &
            mouseY > this.y &
            mouseY < this.y + this.height * 0.8)

    }
}