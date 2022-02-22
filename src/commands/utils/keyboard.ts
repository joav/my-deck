import { exec as execCallback } from "child_process";
import {promisify} from "util";
import os from "os";
const ks = require('node-key-sender');
const exec = promisify(execCallback);

export async function hitHotkey(key: string, modifier1?: string, modifier2?: string, modifier3?: string) {
    try {
        if (os.type() === 'Darwin') {
            if (modifier1 && modifier2 && modifier3) {
                await exec(`Script="tell app \\"System Events\\" to key code ${key} using {${modifier1} down, ${modifier2} down, ${modifier3} down}" osascript -e "$Script"`);
            } else if (modifier1 && modifier2) {
                await exec(`Script="tell app \\"System Events\\" to key code ${key} using {${modifier1} down, ${modifier2} down}" osascript -e "$Script"`);
            } else if (modifier1) {
                await exec(`Script="tell app \\"System Events\\" to key code ${key} using ${modifier1} down" osascript -e "$Script"`);
            } else {
                await exec(`Script="tell app \\"System Events\\" to key code ${key}" osascript -e "$Script"`);
            }
        } else {
            if (modifier1 && modifier2 && modifier3) {
                await ks.sendCombination([modifier1, modifier2, modifier3, key]);
            } else if (modifier1 && modifier2) {
                await ks.sendCombination([modifier1, modifier2, key]);
            } else if (modifier1) {
                await ks.sendCombination([modifier1, key]);
            } else {
                await ks.sendKey(key);
            }
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export function getMacKeys() {
    return [{"name":"0","id":"29"},{"name":"1","id":"18"},{"name":"2","id":"19"},{"name":"3","id":"20"},{"name":"4","id":"21"},{"name":"5","id":"23"},{"name":"6","id":"22"},{"name":"7","id":"26"},{"name":"8","id":"28"},{"name":"9","id":"25"},{"name":"A","id":"0"},{"name":"B","id":"11"},{"name":"C","id":"8"},{"name":"D","id":"2"},{"name":"E","id":"14"},{"name":"F","id":"3"},{"name":"G","id":"5"},{"name":"H","id":"4"},{"name":"I","id":"34"},{"name":"J","id":"38"},{"name":"K","id":"40"},{"name":"L","id":"37"},{"name":"M","id":"46"},{"name":"N","id":"45"},{"name":"O","id":"31"},{"name":"P","id":"35"},{"name":"Q","id":"12"},{"name":"R","id":"15"},{"name":"S","id":"1"},{"name":"T","id":"17"},{"name":"U","id":"32"},{"name":"V","id":"9"},{"name":"W","id":"13"},{"name":"X","id":"7"},{"name":"Y","id":"16"},{"name":"Z","id":"6"},{"name":"`","id":"50"},{"name":"-","id":"27"},{"name":"=","id":"24"},{"name":"[","id":"33"},{"name":"]","id":"30"},{"name":";","id":"41"},{"name":"'","id":"39"},{"name":",","id":"43"},{"name":".","id":"47"},{"name":"/","id":"44"},{"name":"\\","id":"42"},{"name":"Espacio","id":"49"},{"name":"Enter","id":"76"},{"name":"Return","id":"36"},{"name":"Tab","id":"48"},{"name":"Borrar","id":"51"},{"name":"Suprimir","id":"117"},{"name":"Escape","id":"53"},{"name":"Mayúsculas","id":"57"},{"name":"Function","id":"63"},{"name":"F1","id":"122"},{"name":"F2","id":"120"},{"name":"F3","id":"99"},{"name":"F4","id":"118"},{"name":"F5","id":"96"},{"name":"F6","id":"97"},{"name":"F7","id":"98"},{"name":"F8","id":"100"},{"name":"F9","id":"101"},{"name":"F10","id":"109"},{"name":"F11","id":"103"},{"name":"F12","id":"111"},{"name":"F13","id":"105"},{"name":"F14","id":"107"},{"name":"F15","id":"113"},{"name":"F16","id":"106"},{"name":"F17","id":"64"},{"name":"F18","id":"79"},{"name":"F19","id":"80"},{"name":"F20","id":"90"},{"name":"Inicio","id":"115"},{"name":"Fin","id":"119"},{"name":"Page Up","id":"116"},{"name":"Page Down","id":"121"},{"name":"Izquierda","id":"123"},{"name":"Derecha","id":"124"},{"name":"Abajo","id":"125"},{"name":"Arriba","id":"126"}];
}

export function getWindowsKeys() {
    const keysMap: Record<string, string> = {
        "Enter": "enter",
        "Borrar": "backspace",
        "Suprimir": "backspace",
        "Tab": "tab",
        "Mayúsculas": "caps_lock",
        "Escape": "escape",
        "Espacio": "space",
        "Page Up": "page_up",
        "Page Down": "page_down",
        "Inicio": "home",
        "Fin": "end",
        "Izquierda": "left",
        "Arriba": "up",
        "Derecha": "right",
        "Abajo": "down",
        "F1": "f1",
        "F2": "f2",
        "F3": "f3",
        "F4": "f4",
        "F5": "f5",
        "F6": "f6",
        "F7": "f7",
        "F8": "f8",
        "F9": "f9",
        "F10": "f10",
        "F11": "f11",
        "F12": "f12",
    };

    const keys = Array.from(Object.entries(keysMap), v => ({id: v[1], name: v[0]}));

    const letters = Array.from<number, typeof keys[0]>(
        {length: 94},
        (_, i) => (
            i + 33 > 64 && i + 33 < 91
            ? ({id: "NNN", name: "NNN"})
            : ({id: String.fromCharCode(i+33), name: String.fromCharCode(i+33).toUpperCase()})
        )
    ).filter(l => l.id !== "NNN" && isNaN(+l.id));
    const numbers  = Array.from<number, typeof keys[0]>({length: 10}, (_, i) => ({id: ""+i, name: ""+i}));

    keys.unshift(...letters);
    keys.unshift(...numbers);

    return keys;
}
