export function getClassesIdsFromCSS(file_text) {
    var classes, ids, match, matches;
    classes = {};
    ids = {};

    matches = file_text.match(/\.[\w\-]+/g);
    for (match in matches) {
        match = matches[match];
        match = match.replace('.', '');
        if (match[0] > -1) {
            continue;
        }
        if (match.indexOf('icon-') !== -1 || match.indexOf('owl-') !== -1) {
            continue;
        }
        classes[match] = 1;
    }

    matches = file_text.match(/#[\w\-]+[{\[ :\.]/g);
    for (match in matches) {
        match = matches[match];
        match = match.replace(/[#{\[ :\.]/g, '');
        if (match[0] > -1) {
            continue;
        }
        ids[match] = 1;
    }

    return {
        classes: classes,
        ids: ids
    }
}

export function getClassesIdsFromHtml(file_text) {
    var classes, ids, functions, matches, match, mem;
    classes = {};
    ids = {};
    functions = {};

    matches = file_text.match(/class="[\w \-]+"/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('"')[1];
        match = match.split(' ');
        for (mem in match) {
            mem = match[mem];
            if (mem.indexOf('icon-') !== -1 || mem.indexOf('owl-') !== -1) {
                continue;
            }
            classes[mem] = 1;
        }
    }

    matches = file_text.match(/(data-the|data-to|id)="[\w_]+"/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('"')[1];
        ids[match] = 1;
    }

    return {
        classes: classes,
        ids: ids,
    }
}