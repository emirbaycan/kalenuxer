function getClassesIdsFunctionsFromJS(file_text) {
    var classes, ids, functions, matches, match, mem;
    classes = {};
    ids = {};
    functions = {};

    matches = file_text.match(/\.className="[\w \-]+"/g);
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

    matches = file_text.match(/\.classList\.(add|remove)\("[\w \-]+"\)/g);
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

    matches = file_text.match(/\.getElementsByClassName\("[\w \-]+"\)/g);
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

    matches = file_text.match(/setEvent\("[\w_]+","[\w \-]+"/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('"')[3];
        match = match.split(' ');
        for (mem in match) {
            mem = match[mem];
            if (mem.indexOf('icon-') !== -1 || mem.indexOf('owl-') !== -1) {
                continue;
            }
            classes[mem] = 1;
        }
    }

    matches = file_text.match(/setElems\("[\w_]+"/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('"')[3];
        match = match.split(' ');
        for (mem in match) {
            mem = match[mem];
            if (mem.indexOf('icon-') !== -1 || mem.indexOf('owl-') !== -1) {
                continue;
            }
            classes[mem] = 1;
        }
    }

    matches = file_text.match(/\.id="[\w \-]+"/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('"')[1];
        match = match.split(' ');
        for (mem in match) {
            mem = match[mem];
            ids[mem] = 1;
        }
    }

    matches = file_text.match(/\.getElementById\("[_\w]+"\)/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('"')[1];
        ids[match] = 1;
    }

    matches = file_text.match(/get(Value|V|Checked|Inner)\("[_\w]+"\)/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('"')[1];
        ids[match] = 1;
    }

    matches = file_text.match(/(set|clear)(Status|Open)\("[_\w]+"\)/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('"')[1];
        ids[match] = 1;
    }

    matches = file_text.match(/set(Value|Src|Inner)\("[_\w]+"/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('"')[1];
        ids[match] = 1;
    }

    matches = file_text.match(/setE\([\w_]+,[\w_]+,"[\w_]+"/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('"')[1];
        ids[match] = 1;
    }

    matches = file_text.match(/setEvent\("[\w_]+","[\w \-]+",[\w_]+[\)]/g);
    for (match in matches) {
        match = matches[match];
        match = match.split(',')[2].split(')')[0];
        functions[match] = 1;
    }

    matches = file_text.match(/setE\(([\w_]+),/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('(')[1].split(',')[0];
        functions[match] = 1;
    }

    matches = file_text.match(/function [_\w]+/g);
    for (match in matches) {
        match = matches[match];
        match = match.replace('function ', '');
        functions[match] = 1;
    }

    matches = file_text.match(/[\+{, \|\&=;{}\!]+[_\w]+[\(]+/g);
    for (match in matches) {
        match = matches[match];
        match = match.replace(/[\+{, \|\&=;{}\!\(]*/g, '');
        if (match === 'switch' || match === 'function' ||
            match === 'if' || match === 'for' || match === 'in' ||
            match === 'document' || match === 'window' || match === 'return' ||
            match === 'URLSearchParams' || match === 'RegExp' || match === 'eval' ||
            match === 'setTimeout' || match === 'setInterval' || match === 'clearInterval' ||
            match === 'parseInt' || match === 'parseFloat' || match === 'Date' ||
            match === 'XMLHttpRequest') {
            continue;
        }
        functions[match] = 1;
    }

    matches = file_text.match(/[\w_]+[\.]+on[\w_]+=[\w_]+/g);
    for (match in matches) {
        match = matches[match];
        match = match.split('=')[1];
        if (match === 'function') {
            continue;
        }
        functions[match] = 1;
    }

    return {
        classes: Object.keys(classes),
        ids: Object.keys(ids),
        functions: Object.keys(functions)
    }
}

function setJSClasses(file_text, properties) {
    var replacement, property;
    for (property in properties) {
        replacement = properties[property];
        if (!replacement) {
            continue;
        }
        file_text = file_text.replace(new RegExp('\\.className="' + property + '"', 'g'), '.className="' + replacement + '"');
        file_text = file_text.replace(new RegExp('\\.className="([\\w -]+) ' + property + ' ([\\w -]+)"', 'g'), '.className="$1 ' + replacement + ' $2"');
        file_text = file_text.replace(new RegExp('\\.className="([\\w -]+) ' + property + '"', 'g'), '.className="$1 ' + replacement + '"');
        file_text = file_text.replace(new RegExp('\\.className="' + property + ' ([\\w -]+)"', 'g'), '.className="' + replacement + ' $1"');
        file_text = file_text.replace(new RegExp('\\.getElementsByClassName[\\(]"' + property + '"[\)]', 'g'), '.getElementsByClassName("' + replacement + '")');
        file_text = file_text.replace(new RegExp('\\.getElementsByClassName[\\(]"([\\w -]+) ' + property + ' ([\\w -]+)"[\)]', 'g'), '.getElementsByClassName("$1 ' + replacement + ' $2")');
        file_text = file_text.replace(new RegExp('\\.getElementsByClassName[\\(]"([\\w -]+) ' + property + '"[\)]', 'g'), '.getElementsByClassName("$1 ' + replacement + '")');
        file_text = file_text.replace(new RegExp('\\.getElementsByClassName[\\(]"' + property + ' ([\\w -]+)"[\)]', 'g'), '.getElementsByClassName("' + replacement + ' $1")');
        file_text = file_text.replace(new RegExp('setEvent[\\(]"([\\w_]+)","' + property + '"', 'g'), 'setEvent("$1","' + replacement + '"');
        file_text = file_text.replace(new RegExp('setElems[\\(]"' + property + '",', 'g'), 'setElems("' + replacement + '",');
        file_text = file_text.replace(new RegExp('\\.classList\\.(add|remove)\\("' + property + '"\\)', 'g'), '.classList.$1("' + replacement + '")');
    }
    return file_text;
}

function setJSIds(file_text, properties) {
    var replacement, property;
    for (property in properties) {
        replacement = properties[property];
        if (!replacement) {
            continue;
        }
        file_text = file_text.replace(new RegExp('\.id = "' + property + '"', 'g'), '.id = "' + replacement + '"');
        file_text = file_text.replace(new RegExp('\.getElementById[\(]"' + property + '"[\)]', 'g'), '.getElementById("' + replacement + '")');
        file_text = file_text.replace(new RegExp('get(Value|V|Checked|Inner)[\(]"' + property + '"[\)]', 'g'), 'get$1("' + replacement + '")');
        file_text = file_text.replace(new RegExp('(set|clear)(Status|Open)[\(]"' + property + '"[\)]', 'g'), '$1$2("' + replacement + '")');
        file_text = file_text.replace(new RegExp('set(Value|Src|Inner)[\(]"' + property, 'g'), 'set$1("' + replacement);
        file_text = file_text.replace(new RegExp('setE[\\(]([\\w_]+),([\\w_]+),"' + property + '"', 'g'), 'setE($1,$2,"' + replacement + '"');
        file_text = file_text.replace(new RegExp('\\$\\("#' + property + '"\\)', 'g'), '$("#' + replacement + '")');
    }
    return file_text;
}

function setJSFunctions(file_text, properties) {
    var replacement, property;
    for (property in properties) {
        replacement = properties[property];
        if (!replacement) {
            continue;
        }
        file_text = file_text.replace(new RegExp('setEvent[\\(]"([\\w_]+)","([\\w_]+)",' + property + '[\)]', 'g'), 'setEvent("$1","$2",' + replacement + ')');
        file_text = file_text.replace(new RegExp('setE[\\(]' + property + ',', 'g'), 'setE(' + replacement + ',');
    }
    for (property in properties) {
        replacement = properties[property];
        if (!replacement) {
            continue;
        }
        file_text = file_text.replace(new RegExp("(\\+|=| |{|;|,|\\?|:|\\!|\\(|\\)|}|\\||\\&)" + property + "[\(]", 'g'), '$1' + replacement + '(');
        file_text = file_text.replace(new RegExp('=' + property + "(\\+| |{|;|,|\\?|:|\\!|\\(|\\)|}|\\||\\&)", 'g'), '=' + replacement + '$1');
        file_text = file_text.replace(new RegExp("(\\+| |{|;|,|\\?|:|\\!|\\(|}|\\||\\&)" + property + "(\\+| |{|;|,|\\?|}|\\))", 'g'), '$1' + replacement + '$2');
        file_text = file_text.replace(new RegExp("(\\+|=| |{|;|,|\\?|:|\\!|\\(|\\)|}|\\||\\&)" + property + "[\.]", 'g'), '$1' + replacement + '.');
        file_text = file_text.replace(new RegExp("(\\+|=| |{|;|,|\\?|:|\\!|\\(|\\)|}|\\||\\&)" + property + "=", 'g'), '$1' + replacement + '=');
    }
    return file_text;
}

function setJSProperties(file_text, properties) {

    if (properties.classes) {
        file_text = setJSClasses(file_text, properties.classes);
    }

    if (properties.ids) {
        file_text = setJSIds(file_text, properties.ids);
    }

    if (properties.functions) {
        file_text = setJSFunctions(file_text, properties.functions);
    }

    return file_text;
}

function processJSProperties(properties_json) {
    var property, sub_properties, sub_property, out_properties, mem_property;
    out_properties = {};
    for (property in properties_json) {
        sub_properties = properties_json[property];
        if (!out_properties[property]) {
            out_properties[property] = {};
        }
        for (sub_property in sub_properties) {
            sub_property = sub_properties[sub_property];
            out_properties[property][sub_property] = property_data[property][sub_property];
        }
    }
    return out_properties;
}

export function obfuscateJS(file_text) {
    var file_properties;

    file_properties = getClassesIdsFunctionsFromJS(file_text);

    file_properties = processJSProperties(file_properties);

    file_text = setJSProperties(file_text, file_properties);
    return file_text;
}