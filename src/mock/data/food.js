/**
 * Created by ok on 2017/4/13.
 */
import Mock from 'mockjs';

const Foods = [];

for (let j = 0; j < 180; j++) {
    Foods.push(Mock.mock({
        Fid: Mock.Random.guid(),
        Fname: Mock.Random.cword(3, 5),
        Ftype: Mock.Random.natural(60, 100),
        Fprice: Mock.Random.natural(5, 10),
        Fbuy: Mock.Random.natural(1, 5),
        Fstore: Mock.Random.natural(100,1000),
        Fcode: Mock.Random.integer(10000),
    }))
};
export { Foods }