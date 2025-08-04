const { startBot } = require('./bot');
require('./server');

async function main() {
    await startBot();
}

main();
