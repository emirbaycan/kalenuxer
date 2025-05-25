export function setHTMLClasses(file_text, properties, prefix) {
    for (property in properties) {
        file_text = file_text.replace(new RegExp("class=\"([\\w -]*) " + property + " ([\\w -]*)\"", 'g'), 'class="$1 ' + prefix + '_' + properties[property] + ' $2"');
        file_text = file_text.replace(new RegExp("class=\"" + property + " ([\\w -]*)\"", 'g'), 'class="' + prefix + '_' + properties[property] + ' $1"');
        file_text = file_text.replace(new RegExp("class=\"([\\w -]*) " + property + "\"", 'g'), 'class="$1 ' + prefix + '_' + properties[property] + '"');
        file_text = file_text.replace(new RegExp("class=\"" + property + "\"", 'g'), 'class="' + prefix + '_' + properties[property] + '"');
    }
    return file_text;
}

export function setHTMLIds(file_text, properties, prefix) {
    for (property in properties) {
        file_text = file_text.replace(new RegExp('(data-the|data-to|id)="' + property + '"', 'g'), '$1="' + prefix + '_' + properties[property] + '"');
    }
    return file_text;
}

export function setCSSClasses(file_text, properties, prefix) {
    var property;
    for (property in properties) {
        file_text = file_text.replace(new RegExp("\\." + property + "(,| |{|\\.|#|\\[|:)", 'g'), '.' + prefix + '_' + properties[property] + '$1');
    }
    return file_text;
}

export function setCSSIds(file_text, properties, prefix) {
    var property;
    for (property in properties) {
        file_text = file_text.replace(new RegExp("(\\w|,| |}|\\]|\\()#" + property + "(,| |{|\\.|#|\\[|:|\\))", 'g'), '$1#' + prefix + '_' + properties[property] + '$2');
    }
    return file_text;
}