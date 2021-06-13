const Koa = require('koa');
const compose = require('koa-compose');
const config = require('../config');
const MD = require('../middlewares');
const utils = require('../common/utils');
require('../utils/schedule');

const { port, host } = config;

const app = new Koa();

app.context.config = config;
app.context.utils = utils;

app.use(compose(MD));

app.on('error', (err, ctx) => {
    if (ctx) {
        ctx.body = {
            code: 9999,
            message: `程序运行时报错：${err.message}`,
        };
    }
});

app.listen(port, host, () => {
    console.log('server listening on port', port);
});
console.log(132)
