
import * as fs from 'fs';
import { solverArgs } from '../utils';

export class Solver {
    public readonly input_file_path: string;
    private input_arr: string[];

    constructor(solverArgs: solverArgs) {
        this.input_file_path = solverArgs.input_file_path;
        this.readInputFile();
    }
    private readInputFile() {
        this.input_arr = fs.readFileSync(this.input_file_path, 'utf8').split('\n');
    }
}

export function daySolver(solver: Solver): void {
    console.log("Solving Day 4", solver);
}