import {DRIVER, EATS, BERKELEY, SAN_FRANCISCO} from './constants';

const jobs = [
    {
        id: 1,
        name: BERKELEY,
        type: DRIVER,
        items: 5,
        profit: 100,
        waitTime: 15,
        itemObjs: ['yellow', 'green', 'red', 'red', 'green']
    },
    {
        id: 2,
        name: SAN_FRANCISCO,
        type: EATS,
        items: 5,
        profit: 100,
        waitTime: 15
    },
]

export default jobs;