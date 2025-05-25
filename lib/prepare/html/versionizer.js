import { onceProcessed, updateTimes, encodeTime } from '../../general/oncer.js';

export function versionizer(file_text) {
    var versionize, versionizers, file_base, file_type, match_regex, matches, match, file_time, new_text, charset;
    versionizers = options.versionizers;
    for (versionize in versionizers) {
        versionize = versionizers[versionize];
        file_base = versionize.base;
        file_type = versionize.type;
        match_regex = new RegExp('\"\/' + file_base + '\/[\\w\\-{}/\.]+\.' + file_type + '"', 'g');
        matches = file_text.match(match_regex);
        for (match in matches) {
            match = matches[match];
            if (file_type === 'js') {
                charset = 'charset="UTF-8"';
            } else {
                charset = '';
            }
            match = match.replace('.{language}.', '.lang.');
            if (!obfuscate) {
                if (!global.times[file_base][match] || !global.times[file_base][match].processed_at) {
                    onceProcessed(file_base, match, project_dir + 'dist/' + method + '/' + match.replace(/"|'/g, ''));
                    updateTimes(file_base);
                    if (!global.times[file_base][match]) {
                        continue;
                    }
                }
                file_time = global.times[file_base][match].processed_at;
            } else {
                file_time = encodeTime(global.version);
            }
            match = match.replace('.lang.', '.{language}.');
            if (file_time) {
                new_text = match.replace('.' + file_type + '"', '.' + file_type) + '?_t=' + file_time + '" ' + charset;
                file_text = file_text.replace(match, new_text);
            }
        }
    }
    return file_text;
}