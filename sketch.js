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

var boardColor = '#97bec4';


function setup() {
  let canvas;

  if (windowWidth < windowHeight) {
    canvas = createCanvas(windowWidth, windowHeight);
  } else {
    canvas = createCanvas((windowHeight / 1.3) * 0.5625, windowHeight / 1.38);
  }

  canvas.parent("game");

  background(boardColor);

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

  tile = new Tile(100, 100, tileWidth, 0, 0)

}

// function onPressedVvod() {
//   if (isHidden) {
//     inputLetter.show();
//   } else {
//     inputLetter.hide();
//   }
//   isHidden = !isHidden;
// }

function windowResized() {
  // keep a 16:9 portrait format
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowHeight);
  } else {
    resizeCanvas((windowHeight / 1.3) * 0.5625, windowHeight / 1.38);
  }

  console.log(windowWidth)
  console.log(windowHeight)
}

function draw() {
  // background(255);
  tile.render()
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