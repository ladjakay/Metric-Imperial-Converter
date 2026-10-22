function ConvertHandler() {
  
  this.getNum = function(input) {
    if (typeof input !== 'string') {
      return 1;
    }

    const numberMatch = input.match(/^[+-]?[\d./]+/);
    if (!numberMatch) {
      return 1;
    }

    const numberString = numberMatch[0];
    const numberPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\/(?:\d+(?:\.\d*)?|\.\d+))?$/;
    if (!numberPattern.test(numberString)) {
      return 'invalid number';
    }

    const values = numberString.split('/').map(Number);
    const result = values.length === 2 ? values[0] / values[1] : values[0];
    return Number.isFinite(result) ? result : 'invalid number';
  };
  
  this.getUnit = function(input) {
    if (typeof input !== 'string') {
      return 'invalid unit';
    }

    const unitMatch = input.match(/[a-z]+/i);
    if (!unitMatch) {
      return 'invalid unit';
    }

    const unit = unitMatch[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unit)) {
      return 'invalid unit';
    }

    return unit === 'l' ? 'L' : unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const returnUnits = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    return returnUnits[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    return unitNames[unit] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return 'invalid unit';
    }

    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
