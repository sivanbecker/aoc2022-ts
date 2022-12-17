"use strict";
exports.__esModule = true;
exports.daySolver = exports.Solver = void 0;
var fs = require("fs");
var LOW = 'abcdefghijklmnopqrstuvwxyz';
var HIGH = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
var Solver = /** @class */ (function () {
    function Solver(solverArgs) {
        this.input_file_path = solverArgs.input_file_path;
        this.readInputFile();
    }
    Solver.prototype.readInputFile = function () {
        this.input_arr = fs.readFileSync(this.input_file_path, 'utf8').split('\n');
    };
    Solver.prototype.findCommon = function () {
        var common = [];
        this.input_arr.forEach(function (e) {
            var _a = [e.slice(0, e.length / 2), e.slice(e.length / 2, e.length)], comp1 = _a[0], comp2 = _a[1];
            // console.log(`PART1: ${comp1} ; PART2: ${comp2}`);
            var comp1Arr = comp1.split('');
            for (var i in comp1Arr) {
                // console.log(comp1Arr[i]);
                if (comp2.includes(comp1Arr[i])) {
                    // console.log(`COMMON: ${comp1Arr[i]}`);
                    common.push(comp1Arr[i]);
                    break;
                }
            }
        });
        return common;
    };
    Solver.prototype.calculatePrioritySum = function (common) {
        console.log("Get priorities for array", common);
        var prioritiesArray = [];
        common.forEach(function (c) {
            var lowPrio = LOW.indexOf(c);
            if (lowPrio >= 0) {
                prioritiesArray.push(lowPrio + 1);
            }
            else {
                prioritiesArray.push(HIGH.indexOf(c) + 27);
            }
        });
        return prioritiesArray;
    };
    // breakToGroups(): Array<string[]> {
    //     const groups: Array<string[]> = [];
    //     let countToThree = 0;
    //     let groupNumber = 0;
    //     groups[groupNumber] = [];
    //     this.input_arr.forEach(( e: string ) => {
    //         countToThree += 1;
    //         console.log(`countToThree ${countToThree}, groupNumber ${groupNumber}`)
    //         if (countToThree < 3) {
    //             groups[groupNumber].push(e);
    //         } else {
    //             groupNumber += 1;
    //             groups[groupNumber] = [e];
    //             countToThree = 0;
    //         }
    //     });
    //     console.log('Groups', groups);
    //     return groups;
    // }
    Solver.prototype.breakToGroups = function () {
        var groups = [];
        var start = 0;
        var end = 3;
        while (end <= this.input_arr.length) {
            groups.push(this.input_arr.slice(start, end));
            start += 3;
            end += 3;
        }
        return groups;
    };
    Solver.prototype.findCommonInGroups = function () {
        var commonPerGroup = [];
        var groups = this.breakToGroups();
        groups.forEach(function (g) {
            console.log("finding common in group", g);
            var firstArr = g[0].split('');
            firstArr.forEach(function (item) {
                if (g[1].includes(item) && g[2].includes(item)) {
                    commonPerGroup.push(item);
                }
            });
        });
        return commonPerGroup;
    };
    Solver.prototype.findCommonInGroup = function (g) {
        console.log("finding common in group", g);
        var firstArr = g[0].split('');
        var common = undefined;
        firstArr.forEach(function (item) {
            if (g[1].includes(item) && g[2].includes(item)) {
                common = item;
            }
        });
        return common;
    };
    return Solver;
}());
exports.Solver = Solver;
function daySolver(solver) {
    var groups = solver.breakToGroups();
    var commons = [];
    groups.forEach(function (g) {
        console.log("Group ".concat(g, " - Common ").concat(solver.findCommonInGroup(g)));
        commons.push(solver.findCommonInGroup(g));
    });
    // const commonInGroup = solver.findCommonInGroups();
    // const commonInGroupSet = new Set(commonInGroup);
    var prioritiesArray = solver.calculatePrioritySum(commons);
    // console.log(prioritiesArray);
    console.log(prioritiesArray.reduce(function (partialSum, a) { return partialSum + a; }, 0));
    // const common: string[] = solver.findCommon();
    // console.log(common);
    // const prioritiesArray = solver.calculatePrioritySum(common);
    // console.log(prioritiesArray.reduce((partialSum, a) => partialSum + a, 0));
}
exports.daySolver = daySolver;
