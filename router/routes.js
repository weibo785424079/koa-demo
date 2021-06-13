const { test, upload } = require('../controllers');

const routes = [
    {
    //  测试
        method: 'post',
        path: '/a',
        controller: test.list,
    },
    {
    //  测试
        method: 'post',
        path: '/upload',
        controller: upload,
    },
];

module.exports = routes;
