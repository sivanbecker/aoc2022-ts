
import * as fs from 'fs';
import { solverArgs } from '../utils';

export class Solver {
    WIDTH = 3; // 3 for test input, 9 for Real input
    public readonly input_file_path: string;
    private input_arr: string[];
    private initSetup: Array<Array<string>> = [];
    private columnSetup: Array<Array<string>> = [];

    constructor(solverArgs: solverArgs) {
        this.input_file_path = solverArgs.input_file_path;
        this.readInputFile();
    }
    private readInputFile() {
        this.input_arr = fs.readFileSync(this.input_file_path, 'utf8').split('\n');
    }
    part1(ignore: boolean) {
        if (ignore) {return}
        const lastIndex = this.readInitialArrangement();
        // console.log(this.initSetup);
        this.translateInitSetupToColumns();
        console.log(this.columnSetup);
        this.readAndExecInstructions(lastIndex);
        console.log(this.getTopValues());
    }
    readInitialArrangement(): number {
        console.log("Read Initial Setup");
        let lineNum = 0;
        while (!this.input_arr[lineNum].startsWith(' 1')) {
            this.initSetup.push(this.lineInterpreter(this.input_arr[lineNum]));
            lineNum += 1;
        }
        return lineNum;
    }
    lineInterpreter(line: string): Array<string> {
        let start = 0;
        const lineArr: Array<string> = [];
        const re = /[A-Z]/g;
        for ( let i = 0; i < this.WIDTH; i++) {
            const m = line.slice(start, start+4).match(re);
            if (m !== null) {
                lineArr.push(m[0]);
            } else {
                lineArr.push(null);
            }
            start += 4;
        }
        return lineArr;
    }
    private translateInitSetupToColumns(): void {
        for (let col = 0; col < this.WIDTH; col++) {
            this.columnSetup[col] = [];
            for (let i = 0; i < this.initSetup.length; i++) {
                this.columnSetup[col].push(this.initSetup[i][col])
            }
        }
    }
    readAndExecInstructions(lastIndex: number, allAtOnce: boolean=false): void {
        console.log("Read Instructions");
        for (let i = lastIndex + 2; i < this.input_arr.length; i++) {
            const re = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/;
            const m = this.input_arr[i].match(re);
            this.execInstruction(parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), allAtOnce);
        }
    }
    private execInstruction(howMany: number, from: number, to: number, allAtOnce: boolean=false): void {
        console.log("EXECUTE INSTRUCTION");
        console.log(howMany, from, to);
        console.log("BEFORE:", this.columnSetup);
        from--; // translate to array native indexes starting from 0
        to--; // same
        if (allAtOnce) {
            this.moveMany(howMany, from, to);
        } else {
            for (let i = 0; i < howMany; i++) {
                this.move(from, to);
            }
        }
        console.log("AFTER:", this.columnSetup);
    }
    private move(fromInd: number, toInd: number): void {
        // console.log("MOVE FROM", fromInd, "TO", toInd);
        const topFrom = this.getTop(fromInd);
        // console.log(`MOVING ${this.columnSetup[fromInd][topFrom]}`)
        this.columnSetup[toInd].unshift(this.columnSetup[fromInd][topFrom])
        this.columnSetup[fromInd][topFrom] = null;
    }
    private moveMany(howMany: number, fromInd: number, toInd: number): void {
        const topItemsToMove = this.getTopXItems(fromInd, howMany)
        for (let i=topItemsToMove.length; i > 0; i--) {
            this.columnSetup[toInd].unshift(topItemsToMove[i])
        }

    }
    private getTop(ind: number): number {
        console.log(`GET TOP OF COL ${ind}`);
        for (let i = 0; i < this.columnSetup[ind].length; i++) {
            if (this.columnSetup[ind][i]) {return i}
        }
    }
    private getTopXItems(fromInd: number, howMany:number) {
        console.log(`GET TOP ${howMany} items OF COL ${fromInd}`);
        const topItems = [];
        for (let i = 0; i < this.columnSetup[fromInd].length; i++) {
            if (this.columnSetup[fromInd][i]) {
                topItems.unshift(this.columnSetup[fromInd][i]);
            }
        }
        console.log("GOING TO MOVE MANY ITEMS", topItems );
        return topItems;
    }
    getTopValues(): string {
        console.log("GETTING TOP VALUES");
        let topValues = "";
        for (let i = 0; i < this.columnSetup.length; i++) {
            // console.log(`COL: ${i} ${this.columnSetup[i]} -  TOP: ${this.getTop(i)}`)
            topValues += this.columnSetup[i][this.getTop(i)]
        }
        return topValues;
    }
    part2(ignore: boolean) {
        if (ignore) {return}
        const lastIndex = this.readInitialArrangement();
        // console.log(this.initSetup);
        this.translateInitSetupToColumns();
        console.log(this.columnSetup);
        this.readAndExecInstructions(lastIndex, true);
        console.log(this.getTopValues());
    }


}


export function daySolver(solver: Solver): void {
    console.log("Solving Day 5");
    solver.part1(true);
    solver.part2(false)
}