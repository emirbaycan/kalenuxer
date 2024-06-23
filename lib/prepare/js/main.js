import fs from 'fs';

import { onceProcessed } from '../../general/oncer.js';
import { runForFile } from '../../general/for_eachs.js';
import { setData, getSubData } from '../../general/data_handler.js';
import { mergeJSONs } from '../../general/merge_jsons.js';

import { releaseFile, backUpFile, getFilePath } from '../general/file.js';

import { obfuscateJS } from './obfuscate.js';
import { setJSVals } from './sets.js';

export async function prepareJSs() {
    console.log('preparing js files');
    var time = 'js';
    var data_base, data_type = 'js';
    var obfuscate = global.obfuscate;

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

    var current_datas = global.json_datas['js'];
    setData(current_datas);

    async function prepareJSFile(file_path) {
        var file_text, base_path, file_parent, parent_folders, folder, sub_file_path, language, mem_file_text, new_file_text, new_file_path, data;

        base_path = getFilePath(file_path, time);
        if (!obfuscate && !onceProcessed(time, base_path, file_path) || !base_path) {
            return false;
        }
        backUpFile(file_path, false);
        var indexer = base_path.split('/');

        mem_file_text = fs.readFileSync(file_path, 'utf-8')

        if (typeof mem_file_text !== 'undefined') {
            file_text = mem_file_text;
        }

        if (file_path.indexOf('.sub.') !== -1) {
            file_parent = file_path.split('/');
            file_parent = file_parent.slice(0, file_parent.length - 1).join('/');
            parent_folders = fs.readdirSync(file_parent);
            for (folder in parent_folders) {
                folder = parent_folders[folder];
                if (folder.indexOf('.') !== -1) {
                    continue;
                }
                sub_file_path = file_path.split('/');
                sub_file_path = file_parent + '/' + folder + '/' + sub_file_path[sub_file_path.length - 1].replace('.sub', '');
                if (sub_file_path.indexOf('.lang.') !== -1) {
                    for (var language in global.languages) {
                        language = global.languages[language];
                        new_file_text = file_text;
                        new_file_path = sub_file_path;
                        data = current_datas[language];
                        if (data) {
                            data = getSubData(getFilePath(sub_file_path, time).split('/'), data);
                            mem_file_text = setJSVals(new_file_text, data);
                        }
                        if (mem_file_text) {
                            new_file_text = mem_file_text;
                        }
                        if (obfuscate) {
                            new_file_text = obfuscateJS(new_file_text);
                        }
                        new_file_path = new_file_path.replace('.top', '');
                        new_file_path = new_file_path.replace('.bot', '');
                        new_file_path = new_file_path.replace('.lang', '.' + language + '');
                        new_file_path = new_file_path.replace('/site/js/', '/dist/' + global.base + '/js/');
                        releaseFile(new_file_path, new_file_text);
                        backUpFile(new_file_path, true);
                    }
                } else {
                    new_file_text = file_text;
                    new_file_path = sub_file_path;
                    data = current_datas['tr'];
                    if (data) {
                        data = getSubData(getFilePath(sub_file_path, time).split('/'), data)
                    }
                    mem_file_text = setJSVals(new_file_text, data);
                    if (mem_file_text) {
                        new_file_text = mem_file_text;
                    }
                    if (obfuscate) {
                        new_file_text = obfuscateJS(new_file_text);
                    }
                    new_file_path = new_file_path.replace('.top', '');
                    new_file_path = new_file_path.replace('.bot', '');
                    new_file_path = new_file_path.replace('/site/js/', '/dist/' + global.base + '/js/');
                    releaseFile(new_file_path, new_file_text);
                    backUpFile(new_file_path, true);
                }
            }
        } else {
            if (file_path.indexOf('.lang.') !== -1) {
                for (var language in global.languages) {
                    language = global.languages[language];
                    new_file_text = file_text;
                    new_file_path = file_path;
                    data = current_datas[language];
                    if (data) {
                        data = getSubData(indexer, data)
                    }
                    mem_file_text = setJSVals(new_file_text, data);
                    if (mem_file_text) {
                        new_file_text = mem_file_text;
                    }
                    if (obfuscate) {
                        new_file_text = obfuscateJS(new_file_text);
                    }
                    new_file_path = new_file_path.replace('.top', '');
                    new_file_path = new_file_path.replace('.bot', '');
                    new_file_path = new_file_path.replace('.lang', '.' + language + '');
                    new_file_path = new_file_path.replace('/site/js/', '/dist/' + global.base + '/js/');
                    releaseFile(new_file_path, new_file_text);
                    backUpFile(new_file_path, true);
                }
            } else {
                new_file_text = file_text;
                new_file_path = file_path;
                data = current_datas['tr'];
                if (data) {
                    data = getSubData(indexer, data);
                }
                mem_file_text = setJSVals(new_file_text, data);
                if (mem_file_text) {
                    new_file_text = mem_file_text;
                }
                if (obfuscate) {
                    new_file_text = obfuscateJS(new_file_text);
                }
                new_file_path = new_file_path.replace('.top', '');
                new_file_path = new_file_path.replace('.bot', '');
                new_file_path = new_file_path.replace('/site/js/', '/dist/' + global.base + '/js/');
                releaseFile(new_file_path, new_file_text);
                backUpFile(new_file_path, true);
            }
        }
    }

    await runForFile('js', prepareJSFile);
}