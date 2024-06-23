function getClassesIdsFromCSS(file_text) {
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

    matches = file_text.match(/(\w|,| |}|\])#[\w\-_]+(,| |{|\.|#|\[|:)/g);
    for (match in matches) {
        match = matches[match];
        match = match.substring(1, match.length).replace(/[,| |{|\.|#|\[|:]/g, '');
        if (match[0] > -1) {
            continue;
        }
        ids[match] = 1;
    }

    return {
        classes: Object.keys(classes),
        ids: Object.keys(ids),
    }
}

function setCSSClasses(file_text, properties) {
    var property;
    for (property in properties) {
        file_text = file_text.replace(new RegExp("\\." + property + "(,| |{|\\.|#|\\[|:)", 'g'), '.' + properties[property] + '$1');
    }
    return file_text;
}

function setCSSIds(file_text, properties) {
    var property;
    for (property in properties) {
        file_text = file_text.replace(new RegExp("(\\w|,| |}|\\])#" + property + "(,| |{|\\.|#|\\[|:)", 'g'), '$1#' + properties[property] + '$2');
    }
    return file_text;
}

function setCSSProperties(file_text, properties) {

    if (properties.classes) {
        file_text = setCSSClasses(file_text, properties.classes);
    }

    if (properties.ids) {
        file_text = setCSSIds(file_text, properties.ids);
    }

    return file_text;
}

function processCSSProperties(properties_json) {
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

export function obfuscateCSS(file_text) {
    var file_properties;
    file_properties = getClassesIdsFromCSS(file_text);
    file_properties = processCSSProperties(file_properties);
    file_text = setCSSProperties(file_text, file_properties);
    return file_text;
}