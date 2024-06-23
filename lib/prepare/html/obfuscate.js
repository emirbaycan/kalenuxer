function getClassesIdsFunctionsFromHTML(file_text) {
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

    matches = file_text.match(/[" ;,]+[\w_]+\(/g);
    for (match in matches) {
        match = matches[match];
        match = match.replace(/[" \(;,]/g, '');
        if (match === 'url') {
            continue;
        }
        functions[match] = 1;
    }

    matches = file_text.match(/\+[\w_,=]+\.[\w_]+\+/g);
    for (match in matches) {
        match = matches[match];
        match = match.replace(/\+/g, '');
        match = match.split('.')[1];
        functions[match] = 1;
    }

    return {
        classes: Object.keys(classes),
        ids: Object.keys(ids),
        functions: Object.keys(functions)
    }
}

function processProperties(properties_json) {
    var property, sub_properties, sub_property, out_properties, update = false;
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

function setProperties(file_text, properties) {
    var setHTMLClasses = function(file_text, properties) {
        for (property in properties) {
            file_text = file_text.replace(new RegExp("class=\"([\\w -]*) " + property + " ([\\w -]*)\"", 'g'), 'class="$1 ' + properties[property] + ' $2"');
            file_text = file_text.replace(new RegExp("class=\"" + property + " ([\\w -]*)\"", 'g'), 'class="' + properties[property] + ' $1"');
            file_text = file_text.replace(new RegExp("class=\"([\\w -]*) " + property + "\"", 'g'), 'class="$1 ' + properties[property] + '"');
            file_text = file_text.replace(new RegExp("class=\"" + property + "\"", 'g'), 'class="' + properties[property] + '"');
        }
        return file_text;
    }

    var setHTMLIds = function(file_text, properties) {
        for (property in properties) {
            file_text = file_text.replace(new RegExp('(data-the|data-to|id)="' + property + '"', 'g'), '$1="' + properties[property] + '"');
        }
        return file_text;
    }

    var setHTMLFunctions = function(file_text, properties) {
        for (property in properties) {
            file_text = file_text.replace(new RegExp('( |"|;)' + property + "[\(]", 'g'), '$1' + properties[property] + '(');
            file_text = file_text.replace(new RegExp('\\+([\\w_,=]+)\\.' + property + "\\+", 'g'), '+$1.' + properties[property] + '+');
        }
        return file_text;
    }

    if (properties.classes) {
        file_text = setHTMLClasses(file_text, properties.classes);
    }

    if (properties.ids) {
        file_text = setHTMLIds(file_text, properties.ids);
    }

    if (properties.functions) {
        file_text = setHTMLFunctions(file_text, properties.functions);
    }

    return file_text;
}

export function obfuscateHTML(file_text) {
    var file_properties;
    file_properties = getClassesIdsFunctionsFromHTML(file_text);
    file_properties = processProperties(file_properties);
    file_text = setProperties(file_text, file_properties);
    return file_text;
}