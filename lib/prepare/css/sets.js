import fs from 'fs';

export function getLib(lib) {
    var lib_path;
    lib_path = project_dir + '/site/css/' + lib + '.css';

    if (!fs.existsSync(lib_path)) {
        return '';
    }

    return fs.readFileSync(lib_path, 'utf8');
}

function setIncludes(file_text) {
    var matches, match;
    while (matches = file_text.match(/![\w_/]+!/g)) {
        match = matches[0];
        match = match.replace(/!/g, '');
        file_text = file_text.replace('!' + match + '!', getLib(match));
    }
    return file_text;
}

export function kalenuxCSS(file_text) {
    file_text = setIncludes(file_text);
    return file_text;
}