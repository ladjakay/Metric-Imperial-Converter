const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('12mi'), 12);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('12.5mi'), 12.5);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('3/2mi'), 1.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('3.5/2mi'), 1.75);
  });

  test('convertHandler should correctly return an error on a double-fraction', function() {
    assert.equal(convertHandler.getNum('3/2/3mi'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    units.forEach(function(unit) {
      assert.equal(convertHandler.getUnit(`1${unit}`), unit);
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    const unitPairs = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    Object.keys(unitPairs).forEach(function(unit) {
      assert.equal(convertHandler.getReturnUnit(unit), unitPairs[unit]);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const unitNames = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    Object.keys(unitNames).forEach(function(unit) {
      assert.equal(convertHandler.spellOutUnit(unit), unitNames[unit]);
    });
  });

  test('convertHandler should correctly convert gal to L', function() {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
  });

  test('convertHandler should correctly convert L to gal', function() {
    assert.equal(convertHandler.convert(1, 'L'), 0.26417);
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
  });

  test('convertHandler should correctly convert km to mi', function() {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
  });

});