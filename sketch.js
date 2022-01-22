var inputLetter;
var btnVvod;
var inputState;
var btnInputState;
var btnCopyState;

var clickCounter = 0;
var isHidden = false;

var tiles = [];
var tileWidth = 50;

var tile;

var boardColor = 'white';

var board;

const numLetters = 5


function setup() {
  let canvas;
  pixelDensity(1);
  // canvas = createCanvas((windowHeight / 1.3) * 0.5625, windowHeight / 1.38);
  canvas = createCanvas((windowHeight / 1.3) * 0.5625, windowHeight / 1.38)

  canvas.parent("game");

  background(boardColor);

  board = new Board(0, 10, width, numLetters);
  board.setStartingWord('балда')

  // inputLetter = createInput();
  // inputLetter.position(0, 0);
  // inputLetter.size(20);
  // inputLetter.parent("game");
  // inputLetter.attribute('readOnly', 'true');

  // inputLetter.input(onInputLetter)
  // inputLetter.mousePressed(onInputLetterPressed);
  // inputLetter.changed(onInputLetterChanged);


  // btnVvod = createButton('Ввод');
  // btnVvod.position(inputLetter.x + inputLetter.width, 0);
  // btnVvod.mousePressed(onPressedVvod);
  // btnVvod.parent("game");

}

function mouseClicked() {
  board.clicked();
}


// function onPressedVvod() {
//   if (isHidden) {
//     inputLetter.show();
//   } else {
//     inputLetter.hide();
//   }
//   isHidden = !isHidden;
// }


function draw() {
  background(boardColor);
  board.render()
}

// function onInputLetterPressed() {
//   console.log(clickCounter)
//   console.log(inputLetter.attribute('readOnly'))
//   if (inputLetter.attribute('readOnly')) {
//     if (clickCounter == 0) {
//       clickCounter += 1;
//     } else {
//       inputLetter.removeAttribute('readOnly');
//     }
//   }
// }

// function onInputLetterChanged() {
//   inputLetter.attribute('readOnly', 'true');
//   clickCounter = 0;
// }

// function onInputLetter() {
//   let value = inputLetter.value();
//   let newValue;
//   let oldValue = '';
//   if (value.length > 1) {
//     newValue = value[1];
//     oldValue = value[0];
//   } else {
//     newValue = value;
//   }

//   // if russian letter - keep it
//   if (/[а-яА-ЯЁё]/.test(newValue)) {
//     inputLetter.value(newValue.toUpperCase());
//   } else {
//     inputLetter.value(oldValue.toUpperCase());
//   }

//   console.log(inputLetter.value())
// }