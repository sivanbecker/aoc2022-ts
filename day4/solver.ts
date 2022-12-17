
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
    part2(ignore: boolean) {
        if (ignore) {return}
        console.log("Part2...")
    }
    part1(ignore: boolean): number {
        if (ignore) {return}
        console.log("Part1...")
        let overlapping_sections = 0;
        this.input_arr.forEach((l: string) => {
            const sections = this.sections_splitter(l);
            if (this.find_overlapping(sections)) {
                overlapping_sections += 1;
            }
        })
        console.log(overlapping_sections);
        return overlapping_sections;
    }
    private sections_splitter(input_line: string): [string, string, string, string] {
        const [elf1, elf2] = input_line.split(",");
        const [elf1_start, elf1_end] = elf1.split("-");
        const [elf2_start, elf2_end] = elf2.split("-");
        return [elf1_start, elf1_end, elf2_start, elf2_end];
    }
    find_overlapping(sections: Array<string>): Boolean {
        if (parseInt(sections[0])<= parseInt(sections[2]) &&
            parseInt(sections[1])>=parseInt(sections[3])) {
            return true;
        }
        return parseInt(sections[2]) <= parseInt(sections[0]) &&
            parseInt(sections[3]) >= parseInt(sections[1]);

}

}

export function daySolver(solver: Solver): void {
    console.log("Solving Day 4");
    solver.part1(true);
    solver.part2(false)
}