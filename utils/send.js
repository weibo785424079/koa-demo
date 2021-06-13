const send = require('./schedule')

;(async () => {
    await send()
    process.exit(0)
})();