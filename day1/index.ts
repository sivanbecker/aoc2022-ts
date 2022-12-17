
import * as fs from 'fs';
import { Elf } from '../entities';

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
    public dataToElfs(): Array<Elf> {
        const elfs_arr: Array<Elf> = [new Elf];
        this.input_arr.forEach((e: string) => {
            if (e === '') { 
                // console.log(`Done with Elf ${elfs_arr[elfs_arr.length - 1].total_calories()}`);
                elfs_arr.push(new Elf);
            } else {
                elfs_arr[elfs_arr.length - 1].add_calories(parseInt(e));
            }
        });
        return elfs_arr;
    }
    
    public findElfWithMaxCalories(elfs_arr: Array<Elf>): number {
        let maxCalories: number = 0;
        elfs_arr.forEach(e => {
            if (e.total_calories() > maxCalories) {
                maxCalories = e.total_calories();
            }
        });
        return maxCalories;
    }
    private sortTotals(totalsArray: Array<number>): Array<number> {
        return totalsArray.sort(function(a, b) {
            return a - b;
          });
    }

    public collectTotals(elfs_arr: Array<Elf>): Array<number> {
        const totalsArray: Array<number> = [];
        elfs_arr.forEach(e => {
            totalsArray.push(e.total_calories());
        }); 

        return this.sortTotals(totalsArray);
    }
}

export function daySolver(solver: Solver): void {
    const elfsData = solver.dataToElfs();
    // const maxCalories = solver.findElfWithMaxCalories(elfsData);
    const totalsSortedArray = solver.collectTotals(elfsData);
    const totalsArrayLen = totalsSortedArray.length;
    console.log(totalsSortedArray[totalsArrayLen - 1] + totalsSortedArray[totalsArrayLen - 2] + totalsSortedArray[totalsArrayLen - 3]);
}