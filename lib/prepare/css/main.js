import fs from "fs";
import { minify } from 'csso';

import { onceProcessed } from '../../general/oncer.js';
import { runForFile } from '../../general/for_eachs.js';
import { mergeJSONs } from '../../general/merge_jsons.js';

import { releaseFile, backUpFile, getFilePath } from '../general/file.js';

import { obfuscateCSS } from './obfuscate.js';
import { kalenuxCSS } from './sets.js';

export async function prepareCSSs() {
    console.log('preparing css files');
    var time = 'css';
    var data_base, data_type = 'css';

    for (var language in global.languages) {
        language = global.languages[language];
        if (!global.json_datas[data_type]) {
            global.json_datas[data_type] = {};
        }
        data_base = global.data_dir + '/' + data_type;

        if (!fs.existsSync(data_base + '/general.json') || !fs.existsSync(data_base + '/' + language + '.json')) {
            if (!fs.existsSync(data_base)) {
                fs.mkdirSync(data_base, { recursive: true });
            }
            fs.writeFileSync(data_base + '/general.json', '{}');
            fs.writeFileSync(data_base + '/' + language + '.json', '{}');
        }
        global.json_datas[data_type][language] = mergeJSONs([JSON.parse(fs.readFileSync(data_base + '/' + language + '.json')), JSON.parse(fs.readFileSync(data_base + '/general.json'))]);
    }

    async function prepareCSSFile(file_path) {
        var file_text, just_file_path

        just_file_path = getFilePath(file_path, time);
        if (!obfuscate && !onceProcessed(time, just_file_path, file_path)) {
            return false;
        }
        backUpFile(file_path, false);

        file_text = fs.readFileSync(file_path, 'utf8');

        file_text = kalenuxCSS(file_text);
        if (just_file_path.indexOf('.css') !== -1) {
            file_text = minify(file_text).css;
            if (obfuscate) {
                file_text = obfuscateCSS(file_text);
            }
        }

        file_path = file_path.replace('/site/css/', '/dist/' + global.base + '/css/');

        releaseFile(file_path, file_text);
        backUpFile(file_path, true);
    }

    await runForFile('css', prepareCSSFile);
}