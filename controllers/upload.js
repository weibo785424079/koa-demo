const Formidable = require('formidable');

const { tempFilePath } = require('../config');

module.exports = async function (ctx, next) {
    const form = new Formidable({
      multiples: true, 
      //  上传的临时文件保存路径
      uploadDir: `${process.cwd()}/${tempFilePath}`
    });

    // eslint-disable-next-line promise/param-names
    await new Promise((reslove, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          ctx.body = {
              fields,
              files
            };
          reslove();
        }
      });
    });

    await next();
}
