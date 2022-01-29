const numLetters = 5;

var scene;

var vocab;

var startTouchX = 0;
var startTouchY = 0;

const boardColor = 'white';

function seedRandGenerator(a) {
  console.log('here');

  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function preload() {
  vocab = loadStrings('https://alexonov.github.io/balda/assets/vocab.txt');
}

function windowResized() {
  // redraw board in the center
}

function setup() {

  let canvas;
  canvas = createCanvas(windowWidth, windowHeight);

  background(boardColor);

  // chose starting word
  let date = new Date();
  let seed = [date.getYear(), date.getMonth(), date.getDate()].join('');
  let rand = seedRandGenerator(parseInt(seed));
  let newWord = '';
  do {
    newWord = vocab[Math.floor(rand() * vocab.length)];
    console.log(newWord);
    console.log(newWord.length != numLetters);
  } while (newWord.length != numLetters);

  scene = new Scene(width, newWord, vocab);

  // create inputer
  let inputer = createInput();
  inputer.attribute('id', 'inputer');

  inputer.size(scene.board.tileWidth);

  inputer.hide();


  // setting callbacks
  inputer.input(onInputerInput);
  inputer.changed(onInputerChanged);
  inputer.mouseClicked(onInputerClicked);

  scene.setInputer(inputer);

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

function draw() {
  background(boardColor);
  scene.render()
}

function mousePressed() {

}

function mouseReleased() {
  timeTaken = Date.now() - down;
}

function touchStarted() {
  startTouchX = mouseX;
  startTouchY = mouseY;
  return false;
}

// function touchMoved(){
//   return false;
// }

function touchEnded() {
  if (startTouchX === mouseX & startTouchY === mouseY) {
    mouseClicked();
  }

  return false;
}