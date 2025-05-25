import fs from 'fs';

import { translateDatas } from './general/translate.js';
import { prepareObfuscate } from './general/prepare_obfuscate.js';
import { setTimes } from '../general/data_handler.js';

import { prepareVendor } from './vendor/main.js';
import { preparePlugins } from './plugins/main.js';
import { prepareIcons } from './icons/main.js';
import { prepareFonts } from './fonts/main.js';
import { prepareStaticTemplates } from './statics/main.js';
import { prepareSvgs } from './svgs/main.js';
import { prepareCSSs } from './css/main.js';
import { prepareJSs } from './js/main.js';
import { prepareImgs } from './img/main.js';
import { prepareApi } from './api/main.js';
import { prepareHTMLs } from './html/main.js';
import { prepareHandlerFiles } from './handler/main.js';

function prepareProcessKalenuxer() {
    var options = global.options;

    if (languages.length > 1) {
        global.mono_lang = false;
    } else {
        global.mono_lang = true;
    }

    global.data_dir = project_dir + 'datas/';
    global.version = options.version;
    var icons_option;
    if (options.icons == undefined || options.icons == true) {
        icons_option = true
    } else {
        icons_option = false
    }
    global.icons_option = icons_option;
}

export async function processKalenuxer() {
    prepareProcessKalenuxer();

    global.kalenuxer_start_time = new Date().getTime();
    global.version = version + 1;
    global.options.version = version;

    var array_times = ['html', 'css', 'js', 'img', 'template', 'api', 'schemes', 'vendor', 'plugins', 'general', 'handler','icons', 'font', 'svgs', 'statics'];
 
    setTimes(array_times);

    if (obfuscate) {
        global.property_data = (await prepareObfuscate());
    }

    global.json_datas = {};

    if (options.translate) {
        await translateDatas();
    }

    //await checkTextChanges();

    if (fs.existsSync(project_dir + '/site/vendor/')) {
        await prepareVendor();
    }

    if (fs.existsSync(project_dir + '/site/plugins/')) {
        await preparePlugins();
    }

    if (fs.existsSync(project_dir + '/site/icons/')) {
        await prepareIcons();
    }

    if (fs.existsSync(project_dir + '/site/font/')) {
        await prepareFonts()
    }

    if (fs.existsSync(project_dir + '/site/statics/')) {
        await prepareStaticTemplates();
    }

    if (fs.existsSync(project_dir + '/site/svg/')) {
        await prepareSvgs();
    }

    if (fs.existsSync(project_dir + '/site/css/')) {
        await prepareCSSs();
    }

    if (fs.existsSync(project_dir + '/site/js/')) {
        await prepareJSs();
    }

    if (fs.existsSync(project_dir + '/site/img/')) {
        await prepareImgs();
    }

    if (fs.existsSync(project_dir + '/site/html/')) {
        await prepareHTMLs();
    }

    if (fs.existsSync(project_dir + '/site/api/')) {
        await prepareApi();
    }

    if (fs.existsSync(project_dir + '/site/handler/')) {
        await prepareHandlerFiles();
    }

    fs.writeFileSync(options_dir, JSON.stringify(options));
}