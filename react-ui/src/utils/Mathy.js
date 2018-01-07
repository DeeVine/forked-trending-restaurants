import numjs from 'numjs';
import Round from './Round.js'
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

      let percentChange = Round(val, -5)

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

    const checkinsMean = Round(checkins.mean(), -6)
    const ratingsMean = Round(ratings.mean(), -6)
    const reviewsMean = Round(reviews.mean(), -6)

    obj.checkinsMean = checkinsMean
    obj.ratingsMean = ratingsMean
    obj.reviewsMean = reviewsMean

    return obj;
  },

  // finds the mean of the rounded difference
  findRoundedDiffMean: (arr, name) => {
    const diff = this.findDifference(arr, name)
    const mean = this.getMean(diff)
    return Round(mean, -2)
  },

  findDifference: (arr, name, days) => {
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

  getMean: arr => {
    let sum = arr.reduce((previous, current) => current += previous);
    let avg = sum / arr.length;
    return avg
  }

}
