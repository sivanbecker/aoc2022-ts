
import * as fs from 'fs';


const singleRoundScoreShape = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3
}
const singleRoundScoreOutcome = {
    LOST: 0,
    DRAW: 3,
    WON: 6
}
// A -> B -> C

const roundOutcome = {
    'A X': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.ROCK,
    'A Y': singleRoundScoreOutcome.WON + singleRoundScoreShape.PAPER,
    'A Z': singleRoundScoreOutcome.LOST + singleRoundScoreShape.SCISSORS,
    'B X': singleRoundScoreOutcome.LOST + singleRoundScoreShape.ROCK,
    'B Y': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.PAPER,
    'B Z': singleRoundScoreOutcome.WON + singleRoundScoreShape.SCISSORS,
    'C X': singleRoundScoreOutcome.WON + singleRoundScoreShape.ROCK,
    'C Y': singleRoundScoreOutcome.LOST + singleRoundScoreShape.PAPER,
    'C Z': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.SCISSORS,
}
// this one is for part2
// X = LOSE
// Y = DRAW
// Z = WIN
const roundOutcome2 = {
    'A X': singleRoundScoreOutcome.LOST + singleRoundScoreShape.SCISSORS,
    'A Y': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.ROCK,
    'A Z': singleRoundScoreOutcome.WON + singleRoundScoreShape.PAPER,
    'B X': singleRoundScoreOutcome.LOST + singleRoundScoreShape.ROCK,
    'B Y': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.PAPER,
    'B Z': singleRoundScoreOutcome.WON + singleRoundScoreShape.SCISSORS,
    'C X': singleRoundScoreOutcome.LOST + singleRoundScoreShape.PAPER,
    'C Y': singleRoundScoreOutcome.DRAW + singleRoundScoreShape.SCISSORS,
    'C Z': singleRoundScoreOutcome.WON + singleRoundScoreShape.ROCK,
}
export class Solver {
    input_file_path: string;
    input_arr: string[];

    constructor(input_file_path: string) {
        this.input_file_path = input_file_path;
        this.readInputFile();
    }

    private readInputFile() {
        this.input_arr = fs.readFileSync(this.input_file_path, 'utf8').split('\n');
    }
    public followStrategyGuide() {
        let outcome: number = 0;
        this.input_arr.forEach(e => {
            console.log(e, roundOutcome[e]);
            outcome += roundOutcome[e];
        });
        return outcome;
    }
    public followStrategyGuidePart2() {
        let outcome: number = 0;
        this.input_arr.forEach(e => {
            console.log(e, roundOutcome2[e]);
            outcome += roundOutcome2[e];
        });
        return outcome;
    }
}

export function daySolver(solver: Solver): void {
    // const finalScore1 = solver.followStrategyGuide()
    const finalScore2 = solver.followStrategyGuidePart2()
    console.log(finalScore2);
}