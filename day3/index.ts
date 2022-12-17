
import * as fs from 'fs';
import { solverArgs } from '../utils';

const LOW = 'abcdefghijklmnopqrstuvwxyz';
const HIGH = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()

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
    
    findCommon(): Array<string> {
        const common: Array<string> = [];
        this.input_arr.forEach(( e: string ) => {
            const [comp1, comp2] = [e.slice(0, e.length / 2), e.slice(e.length / 2, e.length)] 
            // console.log(`PART1: ${comp1} ; PART2: ${comp2}`);
            const comp1Arr = comp1.split('');
            for (let i in comp1Arr) {
                // console.log(comp1Arr[i]);
                if (comp2.includes(comp1Arr[i])) {
                    // console.log(`COMMON: ${comp1Arr[i]}`);
                    common.push(comp1Arr[i]);
                    break;
                }
            }
        });
        return common;
    }
    calculatePrioritySum(common: Array<string>| Set<string>) {
        console.log("Get priorities for array", common);
        const prioritiesArray: Array<number> = [];
        common.forEach(c => {
            const lowPrio = LOW.indexOf(c);
            if (lowPrio >= 0) {
                prioritiesArray.push(lowPrio + 1);
            } else {
                prioritiesArray.push(HIGH.indexOf(c) + 27); 
            }
        });
        return prioritiesArray;
    }
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
    breakToGroups(): Array<string[]> {
        const groups: Array<string[]> = [];
        let start = 0;
        let end = 3;
        while (end<= this.input_arr.length) {
            groups.push(this.input_arr.slice(start,end));
            start += 3;
            end += 3;
        }
        return groups;
    }
    findCommonInGroups(): Array<string> {
        const commonPerGroup = [];
        const groups = this.breakToGroups();
        groups.forEach((g: Array<string>) => {
            console.log("finding common in group", g);
            const firstArr = g[0].split('');
            firstArr.forEach((item: string) => {
                if (g[1].includes(item) && g[2].includes(item)) {
                    commonPerGroup.push(item);
                }
            })

        })
        return commonPerGroup;
    }
    findCommonInGroup(g: Array<string>): string {
        console.log("finding common in group", g);
        const firstArr = g[0].split('');
        let common: string = undefined;
        firstArr.forEach((item: string) => {
            if (g[1].includes(item) && g[2].includes(item)) {
                common = item;
            }
        })
        return common;
    }
}

export function daySolver(solver: Solver): void {
    const groups = solver.breakToGroups();
    const commons:Array<string> = [];
    groups.forEach((g: Array<string>) => {
        console.log(`Group ${g} - Common ${solver.findCommonInGroup(g)}`);
        commons.push(solver.findCommonInGroup(g));
    });
    // const commonInGroup = solver.findCommonInGroups();
    // const commonInGroupSet = new Set(commonInGroup);
    const prioritiesArray = solver.calculatePrioritySum(commons);
    // console.log(prioritiesArray);
    console.log(prioritiesArray.reduce((partialSum, a) => partialSum + a, 0));
    // const common: string[] = solver.findCommon();
    // console.log(common);
    // const prioritiesArray = solver.calculatePrioritySum(common);
    // console.log(prioritiesArray.reduce((partialSum, a) => partialSum + a, 0));
}