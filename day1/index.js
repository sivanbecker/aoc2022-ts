"use strict";
exports.__esModule = true;
exports.Solver = void 0;
var fs = require("fs");
var entities_1 = require("../entities");
var Solver = /** @class */ (function () {
    function Solver(input_file_path) {
        this.input_file_path = input_file_path;
        this.readInputFile();
    }
    Solver.prototype.readInputFile = function () {
        this.input_arr = fs.readFileSync(this.input_file_path, 'utf8').split('\n');
    };
    Solver.prototype.dataToElfs = function () {
        var elfs_arr = [new entities_1.Elf];
        this.input_arr.forEach(function (e) {
            if (e === '') {
                // console.log(`Done with Elf ${elfs_arr[elfs_arr.length - 1].total_calories()}`);
                elfs_arr.push(new entities_1.Elf);
            }
            else {
                elfs_arr[elfs_arr.length - 1].add_calories(parseInt(e));
            }
        });
        return elfs_arr;
    };
    Solver.prototype.findElfWithMaxCalories = function (elfs_arr) {
        var maxCalories = 0;
        elfs_arr.forEach(function (e) {
            if (e.total_calories() > maxCalories) {
                maxCalories = e.total_calories();
            }
        });
        return maxCalories;
    };
    Solver.prototype.sortTotals = function (totalsArray) {
        return totalsArray.sort(function (a, b) {
            return a - b;
        });
    };
    Solver.prototype.collectTotals = function (elfs_arr) {
        var totalsArray = [];
        elfs_arr.forEach(function (e) {
            totalsArray.push(e.total_calories());
        });
        return this.sortTotals(totalsArray);
    };
    return Solver;
}());
exports.Solver = Solver;
