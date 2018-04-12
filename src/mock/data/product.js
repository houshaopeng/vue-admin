import Mock from 'mockjs';

const Products = [];

for (let j = 0; j < 10; j++) {
    Products.push(Mock.mock({
        proid: Mock.Random.guid(),
        proname: Mock.Random.cword(3, 5),
    }))
};
export { Products }