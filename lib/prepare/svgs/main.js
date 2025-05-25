import fs from "fs";

import { onceProcessed } from '../../general/oncer.js';
import { createReplacements } from '../../general/replacements.js';
import { mergeJSONs, mergeTwoJSON } from '../../general/merge_jsons.js';

import { getClassesIdsFromCSS, getClassesIdsFromHtml } from './gets.js';
import { setHTMLClasses, setHTMLIds, setCSSClasses, setCSSIds } from './sets.js';

export async function prepareSvgs() {
    var folderPath = project_dir + '/svgs/';
    if (!fs.existsSync(folderPath)) {
        return;
    }

    var filesArray = fs.readdirSync(folderPath);
    all_properties = [];

    var property, properties, replacements, sub_property, sub_properties, property_count, i, all_properties, filepaths = [],
        filepath, prefix;

    for (var fileNumber in filesArray) {
        var file = filesArray[fileNumber];
        filepath = folderPath + file;

        if (!onceProcessed('svgs', file, filepath)) {
            continue;
        }

        filepaths.push([filepath, file]);

        var file_text = fs.readFileSync(filepath, 'utf8');

        properties = mergeTwoJSON(getClassesIdsFromHtml(file_text), getClassesIdsFromCSS(file_text));
        all_properties.push(properties);
    }
    if (!all_properties.length) {
        return;
    }
    properties = mergeJSONs(all_properties);

    property_count = 0;
    for (property in properties) {
        sub_properties = properties[property];
        property_count += Object.keys(sub_properties).length;
    }

    replacements = createReplacements(property_count, '_svg_');
    i = 0;

    for (property in properties) {
        sub_properties = properties[property];
        for (sub_property in sub_properties) {
            properties[property][sub_property] = replacements[i];
            i += 1;
        }
    }

    for (filepath in filepaths) {
        filepath = filepaths[filepath];
        prefix = filepath[1].split('.')[0];

        var file_text = fs.readFileSync(filepath[0], 'utf8');

        file_text = setHTMLClasses(file_text, properties.classes, prefix);
        file_text = setHTMLIds(file_text, properties.ids, prefix);
        file_text = setCSSClasses(file_text, properties.classes, prefix);
        file_text = setCSSIds(file_text, properties.ids, prefix);

        if (!fs.existsSync(project_dir + '/site/css/lib/svgs/')) {
            fs.mkdirSync(project_dir + '/site/css/lib/svgs/', { recursive: true });
        }
        fs.writeFileSync(project_dir + '/site/css/lib/svgs/' + filepath[1], file_text);
    }
}