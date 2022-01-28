// const robot = require("robotjs");
var ks = require('node-key-sender');

const TIMES = 3;
let steps = 0;

const interval = setInterval(() => {
    if (steps < TIMES) {
        // robot.keyTap('fn', 'f5');
        ks.sendKeys([63, 'f5']);
        console.log('tapped');
        steps++;
    }
    if (steps === TIMES) {
        clearInterval(interval);
        console.log('finished');
        process.exit();
    }
}, 3000);
