import uglify from "uglify-js";
import htmlFunctions from '../../general/html_functions.js';

function setForVal(file_text, data) {
    var matches, match, cmd, match_name, new_data, new_text;
    matches = file_text.match(/\![\w_.]+\!/g);
    for (match in matches) {
        match = matches[match];
        match = match.replace(/\!/g, '');
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
        file_text = file_text.replace('!' + match + '!', new_text);
    }
    return file_text;
}

function setFors(file_text, data) {
    var matches, match, for_name, for_data, for_text, for_mem, for_d, op_mem, for_start, for_end, seps, check_for_start;
    while (matches = file_text.match(/__[\w_]+=[{\[]/g)) {
        if (!matches[0]) {
            continue;
        }
        match = matches[0];
        op_mem = file_text.indexOf(match);
        for_name = match.replace(/[={\[]/g, '').substring(2, match.length);
        for_data = data[for_name];
        if (!for_data) {
            file_text = file_text.replace(match, match.substring(1, match.length));
            continue;
        }
        for_data = for_data.data;
        if (!for_data) {
            file_text = file_text.replace(match, match.substring(1, match.length));
            continue;
        }
        for_start = file_text.indexOf('{', op_mem);
        check_for_start = file_text.indexOf('[', op_mem);
        if (for_start === -1 || (check_for_start !== -1 && check_for_start < for_start)) {
            if (check_for_start === -1) {
                file_text = file_text.replace(match, match.substring(1, match.length - 2));
                continue;
            }
            for_start = check_for_start;
            for_end = file_text.indexOf(']', check_for_start);
            seps = ['[', ']'];
        } else {
            for_end = file_text.indexOf('}', for_start);
            if (file_text.indexOf('}', for_end + 1) === for_end + 1) {
                for_end = for_end + 1;
            }
            seps = ['{', '}'];
        }
        if (for_end === -1) {
            file_text = file_text.replace(match, match.substring(1, match.length));
            continue;
        }
        for_text = file_text.substring(for_start + 1, for_end);
        if (!for_text) {
            file_text = file_text.replace(match, match.substring(1, match.length));
            continue;
        }
        for_mem = [];
        for (for_d in for_data) {
            for_d = for_data[for_d];
            for_mem.push(setForVal(for_text, for_d));
        }
        for_mem = for_mem.join(',');

        file_text = file_text.substring(0, op_mem) + for_name + '=' + seps[0] + for_mem + file_text.substring(for_end, file_text.length);
    }

    return file_text;
}

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
            if (eval('htmlFunctions.' + cmd[1])) {
                new_text = eval('htmlFunctions.' + cmd[1] + '("' + new_text + '")');
            }
        }
        file_text = file_text.replace('@' + match + '@', new_text);
    }
    return file_text;
}

export function setJSVals(new_file_text, data) {
    if (!data) {
        return new_file_text;
    }

    if (!new_file_text) {
        return '';
    }

    new_file_text = uglify.minify(new_file_text);
    new_file_text = new_file_text.code;

    if (!new_file_text) {
        return '';
    }

    new_file_text = setFors(new_file_text, data);
    new_file_text = setVal(new_file_text, data);

    return new_file_text;
}