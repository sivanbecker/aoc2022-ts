import { daySolver, Solver }  from './day5/';

const DAY_NUMBER = 5;
const DAY = `./day${DAY_NUMBER}`;
const envs = {
    REAL: 'real',
    TEST: 'test',
};
const inputs = {
    REAL: `${DAY}/input.txt`,
    TEST: `${DAY}/test_input.txt`,
}
// const ENV_PREF = envs.REAL;
const ENV_PREF = envs.TEST;
const INPUT_FILE_PATH = ENV_PREF === envs.REAL ? inputs.REAL : inputs.TEST;

daySolver(new Solver({input_file_path:INPUT_FILE_PATH}));