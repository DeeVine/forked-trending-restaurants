import numjs from 'numjs';

export default {
  getDiffwithDate: (arr, name) => {
    // returns an arry of obj with date and count
    const values = []
    for (var i = 0; i < arr.length; i++) {
      values.push({
        count: arr[i][name],
        query_date: arr[i]['query_date'],
      })
    }

    const diff = []
    for (var i = 0; i < values.length - 1; i++) {
      let difference = values[i+1]['count'] - values[i]['count']

      let val = difference / values[i]['count']
      let percentChange = this.roundValue(val, -5)

      let query_date = values[i+1]['query_date']
      diff.push({
        difference: difference,
        percentChange: percentChange,
        query_date: query_date
      })
    }   
    return diff
  },

  findTotalStats: (arr) => {
    var checkins = [];
    var ratings = [];
    var reviews = [];
    const obj = {}
    for (var i = 0; i < arr.length; i++) {
      checkins.push(this.findRoundedDiffMean(arr[i].checkins, 'checkins'))
      ratings.push(this.findRoundedDiffMean(arr[i].rating_count, 'rating_count'))
      reviews.push(this.findRoundedDiffMean(arr[i].reviews, 'review_count'))
    }

    checkins = numjs.array(checkins);
    ratings = numjs.array(ratings);
    reviews = numjs.array(reviews);

    const checkinsMean = this.roundValue(checkins.mean(), -6)
    const ratingsMean = this.roundValue(ratings.mean(), -6)
    const reviewsMean = this.roundValue(reviews.mean(), -6)

    obj.checkinsMean = checkinsMean
    obj.ratingsMean = ratingsMean
    obj.reviewsMean = reviewsMean

    return obj;
  },

  // finds the mean of the rounded difference
  findRoundedDiffMean: (arr, name) => {
    const diff = this.findDifference(arr, name)
    const mean = this.getMean(diff)
    return this.roundValue(mean, -2)
  },

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
