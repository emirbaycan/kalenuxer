import fs from 'fs'
import { mergeTwoJSON } from './merge_jsons.js'

export function setData(a) {
    var c;

    function sumGenerals(b) {
        for (c in b) {
            if (c === 'general' || b[c].type || typeof b[c] !== 'object') {
                continue;
            }
            if (b.general) {
                if (b[c].general) {
                    b[c].general = mergeTwoJSON(b[c].general, b.general);
                } else {
                    b[c].general = b.general;
                }
            }
            sumGenerals(b[c]);
        }
    }

    function mergeWithGenerals(b) {
        for (c in b) {
            if (c === 'general' || b[c].type || typeof b[c] !== 'object') {
                continue;
            }
            if (typeof b[c] === 'object' && typeof b[c].general === 'object') {
                b[c] = mergeTwoJSON(b[c], b[c].general)
            } else {
                mergeWithGenerals(b[c])
            }
        }
    }

    sumGenerals(a);
    mergeWithGenerals(a);
}

export function getSubData(data_path, data) {
    var mem_data = data,
        path,
        mem_path = '';
    while (path = data_path[0]) {
        if (path.indexOf('.') !== -1) {
            path = path.split('.')[0];
        }
        if (!mem_data[path]) {
            if (mem_data.general) {
                return mergeTwoJSON(mem_data, mem_data.general);
            } else {
                return mem_data;
            }
        }
        mem_path += '["' + path + '"]';
        mem_data = eval('data' + mem_path);

        data_path = data_path.slice(1);
    }
    if (mem_data.general) {
        return mergeTwoJSON(mem_data, mem_data.general);
    } else {
        return mem_data;
    }
}

export function setTimes(the_times) {
    function getJSON(dir) {
        if (!fs.existsSync(dir)) {
            var file_parent;
            file_parent = dir.split('/');
            file_parent = file_parent.slice(0, file_parent.length - 1).join('/');
            if (!fs.existsSync(file_parent)) {
                fs.mkdirSync(file_parent, { recursive: true })
            }
            fs.writeFileSync(dir, '{}');
            return {};
        }
        return JSON.parse(fs.readFileSync(dir,'utf8'));
    }

    function setJSONs(data, jsons) {
        var data_project_dir, json, json_dir;

        data_project_dir = global.project_dir.split('\\').join('/') + 'store/' + data + '/' + base + '/';

        eval('global.times = {}');
        eval('global.times_dir = {}');
        for (json in jsons) {
            json = jsons[json];
            
            json_dir = data_project_dir + json + '.json';

            eval('global.times.' + json + '=' + JSON.stringify(getJSON(json_dir)));
            eval('global.times_dir.' + json + '="' + json_dir + '"');
        }
    }
    setJSONs('times', the_times);
}