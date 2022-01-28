'use strict';

// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
const expect = require('chai').expect;

const {encodeString, decodeString} = require('./classes/encoder.js');

describe('encodeString tests', function() {
  // Will hold the reference to the ColorIncreaser class
  // let colorIncreaser;

  // beforeEach is a special function that is similar to the setup function in
  // p5.js.  The major difference it that this function runs before each it()
  // test you create instead of running just once before the draw loop
  // beforeEach lets you setup the objects you want to test in an easy fashion.
  // beforeEach(function() {
  //     colorIncreaser = new ColorIncreaser();
  // });

  it('get 00 for A', function(done) {
    expect(encodeString('А')).to.equal('01');
    done();
  });

  it('test encoding long string', function(done) {
    let expected = '0106180318030117170000291701170103320117290117340101031734030117030117';
    expect(encodeString('аерврВАПп__ыпАПАвюапыап.аАВП.вапвап')).to.equal(expected);
    done();
  });

  it('test decoding long string', function(done) {
    let expected = 'аерврВАПп__ыпАПАвюапыап.аАВП.вапвап';
    expect(decodeString('0106180318030117170000291701170103320117290117340101031734030117030117')).to.equal(expected.toUpperCase());
    done();
  });

});
