import numjs from 'numjs';

export default {
  findDifference: function(arr, name, days) {
    const values = []
    for (var i = 0; i < arr.length; i++) {
      values.push(arr[i][name])
    }
    const diff = []
    for (var i = 0; i < values.length - 1; i++) {
      let difference = values[i+1] - values[i]
      diff.push(difference)
    }

    return diff
  },

  roundValue: function(value, exp) {
    let type = 'round'
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (value === null || isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // If the value is negative...
    if (value < 0) {
      return -this.roundValue(-value, exp);
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  },

  getMean: function(arr) {
    const valArray = numjs.array(arr)
    const mean = valArray.mean()
    return mean
  }

}
