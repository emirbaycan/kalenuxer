export function createReplacements(data_len, text_before) {
    var i, mi, out, string, strings, strings_len, first_string, last_string, mi, string_len, last_string_index, di;
    i = 1;
    mi = 0;
    out = [];

    if (typeof text_before !== 'undefined') {
        string = text_before;
    } else {
        string = '';
    }

    strings = 'emirbaycn140598EMIRBAYCN';
    strings_len = strings.length;
    first_string = strings[0];
    last_string = strings[strings_len - 1];

    out.push('_t');
    while (i < data_len) {
        mi = i % strings_len;
        if (mi === 0) {
            string_len = string.length;
            last_string_index = string_len - 1;
            while (string[last_string_index] === last_string) {
                last_string_index -= 1;
            }
            if (last_string_index === -1) {
                di = string_len + 1;
                string = '';
                while (di > 0) {
                    string += first_string;
                    di -= 1;
                }
            } else {
                string = string.split('');
                if (string[last_string_index + 1]) {
                    string[last_string_index + 1] = first_string;
                }
                string[last_string_index] = strings[strings.indexOf(string[last_string_index]) + 1];
                string = string.join('');
            }
        }
        out.push(string + strings[mi]);
        i += 1;
    }
    return out;
}