export let config;
import * as utils from "./utils"

config = JSON.parse(localStorage.getItem('config')) || {
    'clearInfoAfterSearch': true,
    'showSec': false,
    'engine': 'https://www.bing.com/search?q='
}

config = utils.jsonSort(config);

if (!localStorage.getItem('config')) {
    localStorage.setItem('config', JSON.stringify(config));
}

export function changeConfig(configIn, value) {
    if (typeof configIn == 'object') {
        localStorage.setItem('config', JSON.stringify(configIn));
        return;
    }
    config[configIn] = value;
    localStorage.setItem('config', JSON.stringify(config));
}

export function renewConfig() {
    return JSON.parse(localStorage.getItem('config')) || {
        'clearInfoAfterSearch': true,
        'showSec': false,
        'engine': 'https://www.bing.com/search?q='
    }
}