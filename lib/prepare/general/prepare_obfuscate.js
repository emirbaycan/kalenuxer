import fs from 'fs';

import { createReplacements } from '../../general/replacements.js';
import { mergeJSONs } from '../../general/merge_jsons.js';
import { prepareForEach } from '../../general/for_eachs.js';

function updatePropertyStore(file_path, property_infos) {
    var property_mem = JSON.parse(fs.readFileSync(project_dir + '/temp/properties/store.json', 'utf8'));
    property_mem[file_path] = property_infos;
    fs.writeFileSync(project_dir + '/temp/properties/store.json', JSON.stringify(property_mem));
}

function getPropertyMem(file_path) {
    return JSON.parse(fs.readFileSync(project_dir + '/temp/properties/store.json', 'utf8'))[file_path];
}

async function getPropertiesFromFiles() {

    function getProperty(file_path, func) {
        var file_text, properties, file_stats, file_time, properties, property_infos;

        property_infos = getPropertyMem(file_path);

        file_stats = fs.statSync(file_path);

        file_time = file_stats.mtimeMs.toString();

        if (property_infos) {
            if (file_time === property_infos.mtimeMs) {
                return property_infos.properties;
            }
        } else {
            property_infos = {};
        }

        file_text = fs.readFileSync(file_path, 'utf8');
        properties = func(file_text);

        property_infos.properties = properties;
        property_infos.mtimeMs = file_time;

        updatePropertyStore(file_path, property_infos);
        return properties;
    }

    async function getHTMLProperties() {

        var getClassesIdsFunctionsFromHTML = function(file_text) {
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

            return {
                classes: classes,
                ids: ids,
                functions: functions
            }
        }

        function getHTMLProperty(file_path) {
            return getProperty(file_path, getClassesIdsFunctionsFromHTML);
        }

        return (await Promise.all(prepareForEach(project_dir + '/site/html', getHTMLProperty).concat(prepareForEach(project_dir + '/site/template', getHTMLProperty))));

        //return mergeJSONs(runForEachFileSync(project_dir + 'html/', getHTMLProperty).concat(runForEachFileSync(project_dir + 'template/', getHTMLProperty)));
    }

    async function getJSProperties() {

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

            matches = file_text.match(/\.id="[_\w \-]+"/g);
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

            matches = file_text.match(/get(Value|V|Checked|Inner)\("[_\w\-]+"\)/g);
            for (match in matches) {
                match = matches[match];
                match = match.split('"')[1];
                ids[match] = 1;
            }

            matches = file_text.match(/(set|clear)(Status|Open)\("[_\w\-]+"\)/g);
            for (match in matches) {
                match = matches[match];
                match = match.split('"')[1];
                ids[match] = 1;
            }

            matches = file_text.match(/set(Value|Src|Inner)\("[_\w\-]+"/g);
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
                classes: classes,
                ids: ids,
                functions: functions
            }
        }

        function getJSProperty(file_path) {
            return getProperty(file_path, getClassesIdsFunctionsFromJS);
        }

        return (await Promise.all(prepareForEach(project_dir + '/site/js', getJSProperty)));
    }

    async function getCSSProperties() {

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

        function getCSSProperty(file_path) {
            return getProperty(file_path, getClassesIdsFromCSS);
        }

        return (await Promise.all(prepareForEach(project_dir + '/site/css', getCSSProperty)));
    }

    return (await Promise.all([getHTMLProperties(), getCSSProperties(), getJSProperties()]));
}

export async function prepareObfuscate() {

    if (!fs.existsSync(project_dir + '/temp/properties/store.json')) {
        if (!fs.existsSync(project_dir + '/temp/properties')) {
            fs.mkdirSync(project_dir + '/temp/properties');
        }
        fs.writeFileSync(project_dir + '/temp/properties/store.json', '{}');
    }

    await getPropertiesFromFiles();

    var old_properties = JSON.parse(fs.readFileSync(project_dir + '/temp/properties/store.json'));

    var properties = [];
    for (property in old_properties) {
        properties.push(old_properties[property].properties);
    }
    properties = mergeJSONs(properties);

    var property_count, i, property, sub_properties, sub_property, replacement;

    property_count = 0;
    for (property in properties) {
        sub_properties = properties[property];
        property_count += Object.keys(sub_properties).length;
    }
    replacement = createReplacements(property_count);
    i = 0;
    for (property in properties) {
        sub_properties = properties[property];
        for (sub_property in sub_properties) {
            properties[property][sub_property] = replacement[i];
            i += 1;
        }
    }

    fs.writeFileSync(project_dir + '/temp/properties/classes.json', JSON.stringify(properties.classes));
    fs.writeFileSync(project_dir + '/temp/properties/ids.json', JSON.stringify(properties.ids));
    fs.writeFileSync(project_dir + '/temp/properties/functions.json', JSON.stringify(properties.functions));

    return properties;
}