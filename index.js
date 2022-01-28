// const robot = require("robotjs");
var os = require('os');
var ks = require('node-key-sender');

const TIMES = 3;
let steps = 0;

function hitHotkey(key, modifier) {
    if (os.type() === 'Darwin') {
        if (modifier) {
            return exec(`Script="tell app \\"System Events\\" to keystroke ${key} using ${modifier} down"
        osascript -e "$Script"`)
        } else {
            return exec(`Script="tell app \\"System Events\\" to keystroke ${key}"
        osascript -e "$Script"`)
        }
    } else {
        if (modifier) {
            return ks.sendCombination([modifier, key])
        } else {
            return ks.sendKey(key)
        }
    }
}

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
