export function setLinks(current_datas, file_text, language, subs) {
    var matches, match, match_index, new_text, path_mem, new_text, match_parts, match_part, new_text_name, data, sub;
    data = current_datas[language];
    matches = [...file_text.matchAll(/href="(\/main|\/users)[\w_\/\-.]+"/g)];

    if (!matches) {
        return file_text;
    }

    for (match in matches) {
        match = matches[match];
        match_index = match.index;
        match = match[0];
        if (match.indexOf('http') !== -1 || file_text.match('<link ' + match)) {
            continue;
        }
        match_parts = match.split('/');
        path_mem = '';
        match_parts = match_parts.slice(1, match_parts.length);

        while (match_part = match_parts[0]) {
            if (match_part.indexOf('"') != -1) {
                match_part = match_part.replace('"', '');
            }
            path_mem += '["' + match_part + '"]';
            new_text = eval('data' + path_mem);
            if (typeof new_text !== 'undefined' && typeof new_text.page !== 'undefined') {
                if (new_text.page.text) {
                    new_text_name = new_text.page.text;
                } else {
                    new_text_name = new_text.page;
                }
                new_text = match.split('/');
                new_text = new_text.slice(0, new_text.length - 1);
                new_text = new_text.join('/') + '/' + new_text_name;
                break;
            } else if (typeof new_text === 'undefined') {
                new_text = match;
                break;
            }
            match_parts = match_parts.slice(1);
        }
        if (typeof new_text !== 'string') {
            new_text = match;
        }

        if (global.mono_lang) {
            for (sub in subs) {
                sub = subs[sub];
                new_text = new_text.replace(new RegExp('/main/products/' + sub.key + '/', 'g'), '/' + sub.value + '/');
            }
        } else {
            for (sub in subs) {
                sub = subs[sub];
                new_text = new_text.replace(new RegExp('/main/products/' + sub.key + '/', 'g'), '/' + language + '/' + sub.value + '/');
            }
        }
        if (global.mono_lang) {
            new_text = new_text.replace(new RegExp('(/users/|/main/pages/|/main/products/)', 'g'), '/');
        } else {
            new_text = new_text.replace(new RegExp('(/users/|/main/pages/|/main/products/)', 'g'), '/' + language + '/');
        }

        if (new_text[new_text.length - 1] != '"') {
            new_text = new_text += '"';
        }
        file_text = file_text.replaceAll(match, new_text);
    }

    return file_text;
}