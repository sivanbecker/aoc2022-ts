export class Elf {
    public calories: Array<number> = [];

    public total_calories(): number {
        return this.calories.reduce((partialSum, a) => partialSum + a, 0);
    }

    public add_calories(cal: number): void {
        this.calories.push(cal);
    }
}
