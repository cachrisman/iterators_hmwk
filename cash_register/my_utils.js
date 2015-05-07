// THIS IS YOUR CUSTOM JAVASCRIPT UTILITY LIBRARY
// This file is already included in you project!
// Make use of your utility functions, and create some new ones!

(function() {

    this.myUtils = {};

    myUtils = {};

    myUtils.myEach = function myEach(arr, cb) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            cb(arr[i], i, arr);
        }
    };

    // myUtils.myMap

    myUtils.myMap = function(arr, cb) {
        var len = arr.length;
        var newArr = [];
        for (var i = 0; i < len; i++) {
            newArr[i] = cb(arr[i], i, arr);
        }
        return newArr;
    };

    // myUtils.myReduce

    myUtils.myReduce = function(arr, cb, val) {
        var len = arr.length;
        val = val || 0;
        for (var i = 0; i < len; i++) {
            val = cb(val, arr[i], i, arr);
        }
        return val;
    };


    // myUtils.buildElement

    // myUtils.toDollarAmount;

    // myUtils.toCurrencyString;

}.call(this));
