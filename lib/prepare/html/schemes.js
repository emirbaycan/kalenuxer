import fs from "fs";

import { runForEachFileSync } from '../../general/for_eachs.js';
import { onceProcessed, updateTimes, encodeTime } from '../../general/oncer.js';

export function updateScheme(file_type) {
    var data = {};

    function setScheme(file_path) {
        var mem_path = '',
            mem_data, path, data_path;
        if(global.icons_option == false && file_path == 'css/users/general/icons.css'){
            return;
        }
        file_path = file_path.split(file_type + '/')[1];
        data_path = file_path.split('/');
        if (file_type === 'html' || file_type === 'php') {
            file_path = file_path.replace('users/', '/').replace('main/products', '').replace('main/pages', '').replace('main/templates', '').replace('.kalenux.html', '').replace('.kalenux.php', '.php');
        } else {
            file_path = file_type + '/' + file_path;
        }
        for (path in data_path) {
            path = data_path[path];
            if (!path) {
                continue;
            }
            mem_path += '["' + path + '"]';
            if (path.indexOf('.') === -1 && !eval('data' + mem_path)) {
                eval('data' + mem_path + ' = {}');
            }
            if (path.indexOf('.') !== -1) {
                mem_path = mem_path.split('.')[0] + '"]';
                eval('data' + mem_path + ' = "' + file_path + '"');
                break;
            }
        }
    }

    runForEachFileSync(project_dir + 'site/' + file_type + '/', setScheme);
    global.json_datas['schemes'][file_type] = data;

    if (!fs.existsSync(data_dir + 'html.json')) {
        fs.writeFileSync(data_dir + 'html.json', '{}');
    }

    var schemes = fs.readFileSync(data_dir + 'html.json', 'utf8');
    schemes = JSON.parse(schemes);

    schemes[file_type] = data;
    fs.writeFileSync(data_dir + 'html.json', JSON.stringify(schemes).replace(/\\/g, ''));

    global.times['schemes'][file_type].processed_at = encodeTime(fs.statSync(project_dir + '/site/' + file_type + '/').mtimeMs);
}

export function getSchemes() {
    var scheme, schemes, update_schemes;
    schemes = ['js', 'css'];
    global.json_datas['schemes'] = {};
    for (scheme in schemes) {
        scheme = schemes[scheme];
        if (onceProcessed('schemes', scheme, project_dir + '/site/' + scheme + '/')) {
            updateScheme(scheme);
            update_schemes = true;
        }
    }
    if (update_schemes) {
        updateTimes('schemes');
    }
    if (!fs.existsSync(data_dir + 'html.json')) {
        fs.writeFileSync(data_dir + 'html.json', '{}');
    }
    global.json_datas['schemes'] = JSON.parse(fs.readFileSync(data_dir + 'html.json', 'utf8'));
}