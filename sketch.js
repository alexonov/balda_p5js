// var input;
// var button;

var scene;

var vocab;

const boardColor = 'white';

function preload() {
  vocab = loadStrings('https://alexonov.github.io/balda/assets/vocab.txt');
}

function windowResized() {
  // redraw board in the center
}

function setup() {

  let canvas;
  canvas = createCanvas(windowWidth, windowHeight);

  // canvas.parent("game");

  background(boardColor);

  scene = new Scene(width, 'балда', vocab);

  // create inputer
  let inputer = createInput();
  inputer.attribute('id', 'inputer');
  // inputer.parent('game');
  inputer.size(scene.board.tileWidth);
  // inputer.style('font-size', `${scene.board.tileWidth*0.8}px`,
  //   'color', '#00264c',
  //   'text-align', 'right',
  // );
  // inputer.position(0, 0);
  inputer.hide();


  // setting callbacks
  inputer.input(onInputerInput);
  inputer.changed(onInputerChanged);
  inputer.mouseClicked(onInputerClicked);

  scene.setInputer(inputer);

  // input = createInput();
  // input.position(0,0);
  // button = createButton('check');
  // button.position(0,20);
  // button.mousePressed(btnCheck);

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

function onInputerInput() {
  let value = scene.inputer.value();
  let newValue;
  let oldValue = '';
  if (value.length > 1) {
    newValue = value[1];
    oldValue = value[0];
  } else {
    newValue = value;
  }
  // if russian letter - keep it
  if (/[а-яА-ЯЁё]/.test(newValue)) {
    scene.inputer.value(newValue.toUpperCase());
  } else {
    scene.inputer.value(oldValue.toUpperCase());
  }

  scene.readInputer();
}

function onInputerChanged() {
  console.log(scene.inputer.value());
  scene.inputer.elt.blur();
  scene.quitInputer();
}

function onInputerClicked() {
  scene.inputer.elt.setSelectionRange(0, scene.inputer.value().length);
}

function mouseClicked() {
  scene.clicked();
}

function btnCheck() {
  console.log(scene.checkWord(input.value()));
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
  scene.render()
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

let down;
let timeTaken

function mousePressed() {
  down = Date.now();
}

function mouseReleased() {
  timeTaken = Date.now() - down;
}

// function touchStarted(){
  // mouseClicked();
  // return false;
// }

// function touchMoved(){
//   return false;
// }

// function touchEnded(){
//   return false;
// }