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

    myUtils.buildElement = function(ele, str) {
        return "<"+ele+">"+str+"</"+ele+">";
    };

    // myUtils.toDollarAmount;

    // (12.971) -> 12.97
    myUtils.toDollarAmount = function(num) {
        return parseFloat(Math.round(num * 100) / 100).toFixed(2);
    };

    // myUtils.toCurrencyString;
    //(12.971, "$") -> $12.97
    myUtils.toCurrencyString = function(num, symbol) {
        return symbol+toDollarAmount(num);
    };

    exports.myUtils = myUtils;

}.call(this));
