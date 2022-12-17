"use strict";
exports.__esModule = true;
exports.Solver = void 0;
var fs = require("fs");
var singleRoundScoreShape = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3
};
var singleRoundScoreOutcome = {
    LOST: 0,
    DRAW: 3,
    WON: 6
};
// A -> B -> C
var roundOutcome = {
    'A X': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.ROCK,
    'A Y': singleRoundScoreOutcome.WON + singleRoundScoreShape.PAPER,
    'A Z': singleRoundScoreOutcome.LOST + singleRoundScoreShape.SCISSORS,
    'B X': singleRoundScoreOutcome.LOST + singleRoundScoreShape.ROCK,
    'B Y': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.PAPER,
    'B Z': singleRoundScoreOutcome.WON + singleRoundScoreShape.SCISSORS,
    'C X': singleRoundScoreOutcome.WON + singleRoundScoreShape.ROCK,
    'C Y': singleRoundScoreOutcome.LOST + singleRoundScoreShape.PAPER,
    'C Z': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.SCISSORS
};
// this one is for part2
// X = LOSE
// Y = DRAW
// Z = WIN
var roundOutcome2 = {
    'A X': singleRoundScoreOutcome.LOST + singleRoundScoreShape.SCISSORS,
    'A Y': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.ROCK,
    'A Z': singleRoundScoreOutcome.WON + singleRoundScoreShape.PAPER,
    'B X': singleRoundScoreOutcome.LOST + singleRoundScoreShape.ROCK,
    'B Y': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.PAPER,
    'B Z': singleRoundScoreOutcome.WON + singleRoundScoreShape.SCISSORS,
    'C X': singleRoundScoreOutcome.LOST + singleRoundScoreShape.PAPER,
    'C Y': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.SCISSORS,
    'C Z': singleRoundScoreOutcome.WON + singleRoundScoreShape.ROCK
};
var Solver = /** @class */ (function () {
    function Solver(input_file_path) {
        this.input_file_path = input_file_path;
        this.readInputFile();
    }
    Solver.prototype.readInputFile = function () {
        this.input_arr = fs.readFileSync(this.input_file_path, 'utf8').split('\n');
    };
    Solver.prototype.followStrategyGuide = function () {
        var outcome = 0;
        this.input_arr.forEach(function (e) {
            console.log(e, roundOutcome[e]);
            outcome += roundOutcome[e];
        });
        return outcome;
    };
    Solver.prototype.followStrategyGuidePart2 = function () {
        var outcome = 0;
        this.input_arr.forEach(function (e) {
            console.log(e, roundOutcome2[e]);
            outcome += roundOutcome2[e];
        });
        return outcome;
    };
    return Solver;
}());
exports.Solver = Solver;
