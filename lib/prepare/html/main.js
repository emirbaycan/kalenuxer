import fs from "fs";

import { onceProcessed } from '../../general/oncer.js';
import { runForFile } from '../../general/for_eachs.js';
import { setData, getSubData } from '../../general/data_handler.js';
import { mergeJSONs, mergeTwoJSON } from '../../general/merge_jsons.js';

import { releaseFile, backUpFile, getFilePath } from '../general/file.js';

import { obfuscateHTML } from './obfuscate.js';
import { setIncludes, setVals, getTemplaters } from './setters.js';
import { getSchemes } from './schemes.js';
import { prepareTemplates } from './templates.js';
import { prepareHTMLTemplates } from './html_templates.js';
import { versionizer } from './versionizer.js';
import { setLinks } from './set_links.js';
import { htmlJSCSS } from './add_jss_css.js';
import { minifyHTML } from './process.js';

export async function prepareHTMLs() {
    var data_base, data_type = 'html';
    var languages = global.languages;
    var language;
    var obfuscate = global.obfuscate;
    var data_dir = global.data_dir;

    for (language in languages) {
        language = languages[language];
        if (!global.json_datas[data_type]) {
            global.json_datas[data_type] = {};
        }
        var data_base = data_dir + '/' + data_type;

        if (!fs.existsSync(data_base + '/general.json') || !fs.existsSync(data_base + '/' + language + '.json')) {
            if (!fs.existsSync(data_base)) {
                fs.mkdirSync(data_base, { recursive: true });
            }
            fs.writeFileSync(data_base + '/general.json', '{}');
            fs.writeFileSync(data_base + '/' + language + '.json', '{"general":{}}');
        }
        global.json_datas[data_type][language] = mergeJSONs([JSON.parse(fs.readFileSync(data_base + '/' + language + '.json')), JSON.parse(fs.readFileSync(data_base + '/general.json'))]);

        var filePath = project_dir + '/site/css/lib/svgs/';
        if (fs.existsSync(filePath)) {
            var filesArray = fs.readdirSync(filePath);
            var filesDict = {};
            for (var file in filesArray) {
                file = filesArray[file];
                var fileVal = fs.readFileSync(filePath + file, 'utf8');
                file = file.split('.');
                file = 'svg_' + file[0];
                filesDict[file] = fileVal;
            }
            global.json_datas[data_type][language].general = mergeTwoJSON(global.json_datas[data_type][language].general, filesDict);
        }
    }

    getSchemes();
    global.current_datas = json_datas['html'];
    setData(current_datas)

    function getTableFunction(func_template) {
        return global.json_datas['html'][language]['functions']['table'][func_template];
    }

    async function prepareHTMLs() {
        var time = 'html';

        async function setHTML(file_content, file_path) {
            var data, new_file_content, new_file_path, just_file_path, language_templates, templaters, language, page_name, subs;

            just_file_path = getFilePath(file_path, time).split('/');

            for (var language in global.languages) {

                new_file_content = file_content;
                new_file_path = file_path;

                new_file_content = minifyHTML(new_file_content);

                language = global.languages[language];

                if (!global.mono_lang) {
                    language_templates = templates[language];
                } else {
                    language_templates = templates;
                }

                templaters = getTemplaters(just_file_path, language_templates);

                if (templaters) {
                    new_file_content = setIncludes(new_file_content, templaters);
                }

                if (global.obfuscate) {
                    new_file_content = obfuscateHTML(new_file_content);
                }

                data = current_datas[language];

                data = getSubData(just_file_path, data);
                subs = data.subs;
                if (subs) {
                    subs = subs.data;
                }

                page_name = null;

                if (data) {

                    if (data.page) {
                        if (data.page.text) {
                            page_name = data.page.text;
                        } else {
                            page_name = data.page;
                        }
                    }

                    new_file_content = setVals(new_file_content, data);
                    new_file_content = setVals(new_file_content, data);
                }

                new_file_content = setLinks(current_datas, new_file_content, language, subs);

                if (file_path.indexOf('.html') !== -1 && file_path.indexOf('/template/') === -1) {
                    new_file_content = htmlJSCSS(new_file_content, just_file_path, language);
                }

                new_file_content = versionizer(new_file_content);

                if (global.mono_lang) {
                    language = ''
                } else {
                    language = '/' + language;
                }

                new_file_path = new_file_path.replace(new RegExp('(html/main/pages)|(html/main/products)|(html/users)', 'g'), global.base + language); 

                if (page_name) {
                    new_file_path = new_file_path.replace(/\/[\w\-]+\.kalenux\.(html)/g, '/' + page_name + '.html');
                } else {
                    new_file_path = new_file_path.replace('.kalenux.html', '.html');
                }

                for (var sub_key in subs) {
                    var sub = subs[sub_key];
                    new_file_path = new_file_path.replace('/' + sub.key + '/', '/' + sub.value + '/');
                }

                new_file_path = new_file_path.replace('/site/', '/dist/');
                releaseFile(new_file_path, new_file_content);
                backUpFile(new_file_path, true);
                /*
                if (data.index && new_file_path.indexOf(data.index) !== -1) {
                    new_file_path = new_file_path.replace(data.index, global.base + '/' + page_name);
                }
                */
            }
        }

        function prepareHTML(file_path) {
            var real_file_path, file_content;
            real_file_path = getFilePath(file_path, time);

            if (!obfuscate && !onceProcessed(time, real_file_path, file_path)) {
                return false;
            }

            backUpFile(file_path, false);

            file_content = fs.readFileSync(file_path, 'utf8');

            setHTML(file_content, file_path);
        }

        await runForFile('html', prepareHTML);
    }

    console.log('preparing html template files');
    await prepareHTMLTemplates();

    console.log('preparing template files');
    await prepareTemplates();

    console.log('preparing html files');
    await prepareHTMLs();
}