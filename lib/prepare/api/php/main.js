import fs from "fs";

import { onceProcessed } from '../../../general/oncer.js';
import { runForFile } from '../../../general/for_eachs.js';
import { setData } from '../../../general/data_handler.js';

import { releaseFile, backUpFile, getFilePath } from '../../general/file.js';


function setVal(file_text, data) {
    var matches, match, cmd, match_name, new_text, new_data;
    matches = file_text.match(/@[\w_.]+@/g);
    for (match in matches) {
        match = matches[match];
        match = match.replace(/@/g, '');
        cmd = match.split('.');
        match_name = cmd[0];
        new_data = data[match_name];
        if (!new_data) {
            continue;
        }
        if (new_data.type) {
            new_text = new_data[new_data.type];
        } else {
            new_text = new_data;
        }
        if (cmd.length === 2) {
            new_text = eval(cmd[1] + '("' + new_text + '")');
        }
        file_text = file_text.replace('@' + match + '@', new_text);
    }
    return file_text;
}

function setPHPVals(new_file_text, data) {

    if (!data) {
        return new_file_text;
    }

    if (!new_file_text) {
        return '';
    }
    new_file_text = setVal(new_file_text, data);

    return new_file_text;
}

function processPHP(file_text, data) {
    var mem_file_text;
    mem_file_text = setPHPVals(file_text, data);
    return mem_file_text;
}

export async function preparePHPs() {
    var data_base, time, data_type;
    data_type = 'php';
    time = 'api';

    if (!global.json_datas[data_type]) {
        global.json_datas[data_type] = {};
    }
    data_base = global.data_dir + '/' + data_type;

    if (!fs.existsSync(data_base + '/general.json')) {
        if (!fs.existsSync(data_base)) {
            fs.mkdirSync(data_base, { recursive: true });
        }
        fs.writeFileSync(data_base + '/general.json', '{}');
    }
    global.json_datas[data_type] = JSON.parse(fs.readFileSync(data_base + '/general.json'));

    var current_datas = global.json_datas[data_type];
    setData(current_datas);
    current_datas = current_datas['general'];

    function preparePHP(file_path) {
        var file_text, just_file_path;

        just_file_path = getFilePath(file_path, time);

        if (!onceProcessed(time, just_file_path, file_path)) {
            return false;
        }

        backUpFile(file_path, false);
        file_text = fs.readFileSync(file_path, 'utf8');
        file_text = processPHP(file_text, current_datas);

        file_path = file_path.replace('/site/api/', '/dist/' + base + '/api/');

        releaseFile(file_path, file_text);
        backUpFile(file_path, true);
    }
    await runForFile('api', preparePHP);
}