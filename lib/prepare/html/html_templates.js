import fs from "fs";

import { onceProcessed } from '../../general/oncer.js';
import { runForFile, runForEachFileSync } from '../../general/for_eachs.js';
import { getSubData } from '../../general/data_handler.js';

import { setVals } from './setters.js';
import { minifyHTML } from './process.js';

export async function prepareHTMLTemplates() {
    var time = 'template';

    function isFile(file_path) {
        return file_path.indexOf('.') !== -1;
    }

    function hasFolder(a) {
        var b;
        for (b in a) {
            if (a[b].indexOf('.') === -1) {
                return true;
            }
        }
        return false;
    }

    function getFunctionFile(func_type) {
        var path;
        path = project_dir + '/site/template/functions/' + func_type + '.kalenux.html';
        if (!fs.existsSync(path)) {
            return false;
        }
        return fs.readFileSync(project_dir + '/site/template/functions/' + func_type + '.kalenux.html', 'utf8')
    }

    function getTemplateBasePath(file_path) {
        return file_path.split('template/')[1];
    }

    function setTemplate(file_content, file_path) {
        var data, new_file_parent, indexer;

        for (var language in global.languages) {

            language = global.languages[language];

            var new_file_content = file_content;

            new_file_content = minifyHTML(new_file_content);

            data = getSubData(getTemplateBasePath(file_path).split('/'), json_datas['html'][language]);
            if (data) {
                new_file_content = setVals(new_file_content, data);
            }

            if (global.mono_lang) {
                language = '';
            } else {
                language = '/' + language;
            }

            var new_file_path = file_path.replace('site/template', '/store/temp/templates' + language);
            new_file_parent = new_file_path.split('/');
            new_file_parent = new_file_parent.slice(0, new_file_parent.length - 1).join('/');

            if (!fs.existsSync(new_file_parent)) { fs.mkdirSync(new_file_parent, { recursive: true }) }
            fs.writeFileSync(new_file_path, new_file_content);
        }
    }

    function setSubTemplate(mem_parent_dir, template_name, file_content) {
        var sub_dirs, sub_dir, new_file_path;
        sub_dirs = fs.readdirSync(mem_parent_dir);
        for (sub_dir in sub_dirs) {
            sub_dir = sub_dirs[sub_dir];

            new_file_path = mem_parent_dir;

            if (sub_dir === 'general') {

            } else {
                if (!isFile(sub_dir)) {
                    new_file_path = mem_parent_dir + '/' + sub_dir;
                }
                if (!isFile(sub_dir) && hasFolder(fs.readdirSync(new_file_path))) {
                    setSubTemplate(new_file_path, template_name, file_content);
                }
            }
            setTemplate(file_content, new_file_path + '/' + template_name);
        }
    }

    function setToSubTemplate(file_content, file_path) {
        var file_paths, parent_folder, template_name, parent_dir, general_dists, general_dist, mem_parent_dir;
        file_paths = file_path.split('/');
        parent_folder = file_paths[file_paths.length - 2];
        template_name = file_paths[file_paths.length - 1];
        parent_dir = file_path.split(parent_folder)[0];
        if (!parent_dir) {
            return false;
        }
        general_dists = fs.readdirSync(parent_dir);
        for (general_dist in general_dists) {
            general_dist = general_dists[general_dist];
            if (isFile(general_dist)) {
                continue;
            }

            mem_parent_dir = parent_dir + general_dist;
            setSubTemplate(mem_parent_dir, template_name, file_content);
        }
    }

    function prepareTemplate(file_path) {
        var real_file_path, file_paths, parent_folder, file_content;

        real_file_path = getTemplateBasePath(file_path);

        if (!onceProcessed(time, real_file_path, file_path)) {
            return false;
        }

        file_paths = file_path.split('/');
        parent_folder = file_paths[file_paths.length - 2];
        file_content = fs.readFileSync(file_path, 'utf8');
        if (parent_folder === 'general') {
            setToSubTemplate(file_content, file_path);
        } else {
            setTemplate(file_content, file_path);
        }
    }

    async function setTemplatePaths() {

        function getTemplatesPath(file_path) {
            return file_path.split('templates/')[1];
        }

        function setTemplatePath(file_path) {
            return getTemplatesPath(file_path);
        }

        function pathsToJSON(paths) {
            var paths_json, path_index, path, path_paths, path_mem, path_path_index, current_path_path;
            paths_json = {};
            for (path_index in paths) {
                path = paths[path_index];
                path_paths = path.split('/');
                path_mem = '';
                for (path_path_index in path_paths) {
                    current_path_path = path_paths[path_path_index];
                    if (current_path_path.indexOf('.') !== -1) {
                        eval('paths_json' + path_mem + '["' + current_path_path.split('.')[0] + '"] = "' + path + '"');
                    } else {
                        path_mem += '["' + current_path_path + '"]';
                        if (!eval('paths_json' + path_mem)) {
                            eval('paths_json' + path_mem + '={}');
                        }
                    }
                }
            }
            return paths_json;
        }

        global.templates = runForEachFileSync(project_dir + '/store/temp/templates/', setTemplatePath);
        global.templates = pathsToJSON(global.templates);
    }

    var start_time = new Date();
    await runForFile('template', prepareTemplate);
    await setTemplatePaths();
}