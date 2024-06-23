import fs from 'fs';
import htmlFunctions from '../../general/html_functions.js';

export function getTemplaters(data_path, datas) {
    var mem_path = '',
        mem_data, path;
    if (!datas) {
        return null;
    }
    while (path = data_path[0]) {
        if (path.indexOf('.') !== -1) {
            if (mem_data) {
                return mem_data;
            }
            break;
        }
        mem_path += '["' + path + '"]';
        mem_data = eval('datas' + mem_path);
        if (!mem_data) {
            return null;
        }
        data_path = data_path.slice(1);
    }
    return null;
}

function getTemplate(template_name, packages) {
    var file_path;
    if (packages[template_name]) {
        file_path = packages[template_name];
    } else {
        return '';
    }
    return fs.readFileSync(project_dir + '/store/temp/templates/' + file_path, 'utf8');
}

function getSetVal(data, match) {
    var sub_data;
    sub_data = data[match];
    if (typeof sub_data === 'undefined') {
        return '';
    }
    if (typeof sub_data === 'string') {
        return sub_data;
    }
    var type = sub_data.type;
    if (typeof type === 'undefined') {
        return '';
    }
    switch (type) {
        case 'text':
            return sub_data.text;
        case 'image':
            return '/img/' + sub_data.text;
        case 'icon':
            return '<span class="icon-' + sub_data.text + '"></span>';
        case 'svg':
            return '{svg_' + sub_data.text + '}';
        default:
            return '';
    }
}

function setForVal(file_text, data) {
    var matches, match, cmd, new_text;
    matches = file_text.match(/@[\w_.]+@/g);
    for (match in matches) {
        match = matches[match];
        match = match.replace(/[@]/g, '');
        cmd = match.split('.');
        new_text = getSetVal(data, cmd[0]);

        if (cmd.length === 2) {
            if (eval('htmlFunctions.' + cmd[1])) {
                new_text = eval('htmlFunctions.' + cmd[1] + '("' + new_text + '")');
            }
        }
        file_text = file_text.replace('@' + match + '@', new_text);
    }
    return file_text;
}

function setFors(file_text, data) {
    var matches, match, for_name, for_data, file_texts, for_text, for_mem, for_d, mem, file_texts_length, i;
    while (matches = file_text.match(/\[[\w_]{3,99}\]/)) {
        match = matches[0];
        for_name = match.replace(/[\[\]]/g, '');
        for_data = data[for_name];
        if (!for_data) {
            return file_text;
        }
        for_data = for_data.data;
        if (!for_data) {
            return file_text;
        }
        file_texts = file_text.split(match);
        if (file_texts.length > 3) {
            file_texts_length = file_texts.length;
            mem = [];
            for (i = 2; i < file_texts_length; i++) {
                mem.push(file_texts[i]);
            }
            file_texts = [file_texts[0], file_texts[1], mem.join(match)];
        }
        for_text = file_texts[1];
        for_mem = '';
        for (for_d in for_data) {
            for_d = for_data[for_d];
            for_mem += setForVal(for_text, for_d);
        }
        file_texts[1] = for_mem;
        file_text = file_texts.join('');
    }
    return file_text;
}

function setVal(file_text, data) {
    var matches, match, cmd, match_name, new_data, new_text;
    matches = file_text.match(/{[\w_.]+}/g);
    for (match in matches) {
        match = matches[match];
        match = match.replace(/[{}]/g, '');
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
            if (eval('htmlFunctions.' + cmd[1])) {
                new_text = eval('htmlFunctions.' + cmd[1] + '("' + new_text + '")');
            }
        }
        if (typeof new_text !== 'string' && typeof new_text !== 'number' && typeof new_text !== 'icon' && typeof new_text !== 'image') {
            new_text = '';
        }
        file_text = file_text.replace('{' + match + '}', new_text);
    }
    return file_text;
}

export function setIncludes(file_text, packages) {
    var matches, match;
    while (matches = file_text.match(/![\w_]+!/g)) {
        match = matches[0];
        match = match.replace(/!/g, '');
        file_text = file_text.replace('!' + match + '!', getTemplate(match, packages));
    }
    return file_text;
}

export function setVals(file_text, data) {
    if (!data) {
        return file_text;
    }
    file_text = setFors(file_text, data);
    file_text = setVal(file_text, data);

    return file_text;
}