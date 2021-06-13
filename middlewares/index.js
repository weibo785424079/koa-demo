const koaBody = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('../router');
const response = require('./response');
const error = require('./error');

/**
 * 跨域处理
 */
const mdCors = cors({
    origin: '*',
    credentials: true,
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
});

/**
 * 参数解析
 * https://github.com/koajs/bodyparser
 */
const mdKoaBody = koaBody({
    enableTypes: ['json', 'form', 'text', 'xml'],
    formLimit: '56kb',
    jsonLimit: '1mb',
    textLimit: '1mb',
    xmlLimit: '1mb',
    strict: true,
});

/**
 * 路由处理
 */
const mdRoute = router.routes();
const mdRouterAllowed = router.allowedMethods();
/**
 * 统一返回格式
 */
const mdResHandler = response();
/**
  * 错误处理
  */
const mdErrorHandler = error();
const log = require('./log');

/**
 * 记录请求日志
 */
const mdLogger = log();

module.exports = [
    mdKoaBody,
    mdCors,
    mdLogger,
    mdResHandler,
    mdErrorHandler,
    mdRoute,
    mdRouterAllowed,
];
