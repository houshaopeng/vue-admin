import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: '善林金融',
    password: '123456',
    avatar: '',
    name: '善林金融'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-90': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
};

export { LoginUsers, Users }
