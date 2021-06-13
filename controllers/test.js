const list = async (ctx) => {
    ctx.body = ctx.request.body;
};

module.exports = {
    list,
};
