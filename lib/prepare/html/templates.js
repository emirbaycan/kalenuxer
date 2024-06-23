import fs from "fs";

import { onceProcessed } from '../../general/oncer.js';
import { runForFile } from '../../general/for_eachs.js';
import { getSubData } from '../../general/data_handler.js';

import { releaseFile, backUpFile, getFilePath } from '../general/file.js';

import { obfuscateHTML } from './obfuscate.js';
import { setIncludes, setVals, getTemplaters } from './setters.js';
import { versionizer } from './versionizer.js';
import { htmlJSCSS } from './add_jss_css.js';
import { minifyHTML } from './process.js';
import { setLinks } from './set_links.js';

export async function prepareTemplates() {
    var time = 'html';

    async function setHTML(file_content, file_path) {
        var data, new_file_content,
            new_file_path, indexer, new_indexer, templaters, language, page_name, subs;
        indexer = getFilePath(file_path, time).split('/');
        for (var language in languages) {

            new_file_content = file_content;

            new_file_content = minifyHTML(new_file_content);

            language = languages[language];

            new_indexer = [];
            if(!global.mono_lang){
                new_indexer.push(language);
            }
            new_indexer.push('main');
            new_indexer.push('pages');
            new_indexer.push(indexer[3]);

            templaters = getTemplaters(new_indexer, templates);
            if (templaters) {
                new_file_content = setIncludes(new_file_content, templaters);
            }

            if (obfuscate) {
                new_file_content = obfuscateHTML(new_file_content);
            }


            data = current_datas[language];
            subs = data.subs;

            data = getSubData(indexer, data);
            page_name = '';

            new_indexer = [];
            new_indexer.push('main');
            new_indexer.push('pages');
            new_indexer.push(indexer[3]);

            if (file_path.indexOf('.html') !== -1 || file_path.indexOf('.php') !== -1) {
                new_file_content = htmlJSCSS(new_file_content, new_indexer, language);
            }

            new_file_content = versionizer(new_file_content);

            if (data) {
                if (data.page) {
                    if (data.page.text) {
                        page_name = data.page.text;
                    } else {
                        page_name = data.page;
                    }
                }
                new_file_content = setVals(new_file_content, data);
            }

            new_file_content = setLinks(current_datas, new_file_content, language, subs);
            
            if (mono_lang) {
                language = ''
            } else {
                language = '/' + language;
            }

            if (data.index && file_path.indexOf(data.index) !== -1) {
                new_file_path = file_path.replace(data.index, base + '/' + page_name);
            } else {
                new_file_path = file_path.replace(new RegExp('(html/main/templates)', 'g'), base + language);
            }

            if (page_name) {
                new_file_path = new_file_path.replace(/\/[\w\-]+\.kalenux\.(php)/g, '/' + page_name + '.php');
            } else {
                new_file_path = new_file_path.replace('.kalenux.php', '.php');
            }

            new_file_path = new_file_path.replace('/site/', '/dist/');

            releaseFile(new_file_path, new_file_content);
            backUpFile(new_file_path, true);
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

    if (!fs.existsSync(project_dir + '/site/html/main/templates')) {
        return;
    }
    await runForFile('html/main/templates', prepareHTML);
}