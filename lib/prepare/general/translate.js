import { v2 } from '@google-cloud/translate';
import { onceProcessed } from '../../general/oncer.js';
import fs from 'fs';

const translate = new v2.Translate({
    projectId: 'research-360304',
    keyFilename: './datas/info/research-360304-935d7ae573eb.json',
    //credentials: './datas/info/client_secret_62672948536-389do6p6ce9g50p6i7i1101ugrb4e4ga.apps.googleusercontent.com.json'
});

async function translateText(texts, targetLanguage) {
    let [translations] = await translate.translate(texts, targetLanguage);
    translations = Array.isArray(translations) ? translations : [translations];
    return translations;
}

async function translateData(data, targetLanguage) {
    var texts, text_count, new_data;

    texts = [];

    var searchTexts = function(dict) {
        var item;
        for (item in dict) {
            item = dict[item];
            if (typeof item === 'object') {
                searchTexts(item);
            } else {
                texts.push(item);
            }
        }
    }

    searchTexts(data);

    text_count = texts.length;

    if (text_count) {
        if (text_count > 128) {
            text_holder = [];
            text_sub_holder = [];
            for (i = 0; i < text_count; i++) {
                text_sub_holder.push(texts[i]);
                if (i % 127 === 0) {
                    text_holder.push(text_sub_holder);
                    text_sub_holder = [];
                }
            }
            if (i % 127 !== 0) {
                text_holder.push(text_sub_holder);
            }
            new_text_holder = [];
            for (text_holded in text_holder) {
                text_holded = text_holder[text_holded];
                new_text_holder.push(await translateText(text_holded, targetLanguage));
            }

            var mergeArrays = function(arrays) {
                var new_array, array, item;
                new_array = [];
                for (array in arrays) {
                    array = arrays[array];
                    for (item in array) {
                        item = array[item];
                        new_array.push(item);
                    }
                }
                return new_array;
            }

            texts = mergeArrays(new_text_holder);
        } else {
            texts = await translateText(texts, targetLanguage);
        }
    }

    new_data = data;

    var i = 0;
    var replaceTexts = function(dict) {
        var item, new_item;
        for (item in dict) {
            new_item = dict[item];
            if (typeof new_item === 'object') {
                replaceTexts(new_item);
            } else {
                dict[item] = texts[i];
                i++;
            }
        }
    }

    replaceTexts(new_data);

    return new_data;
}

export async function translateDatas() {
    var language, languages = options.translate,
        main_language = options.language,
        data_types, data_type, data_path, data;

    data_types = fs.readdirSync(data_dir);
    for (data_type in data_types) {
        data_type = data_types[data_type];
        data_path = data_dir + '/' + data_type + '/' + main_language + '.json';
        if (!fs.existsSync(data_path)) {
            continue;
        }

        if (!onceProcessed('general', data_type + '_translation', data_path)) {
            continue;
        }

        data = JSON.parse(fs.readFileSync(data_path));

        for (language in languages) {
            language = languages[language];
            data = await translateData(data, language);
            fs.writeFileSync(data_dir + '/' + data_type + '/' + language + '.json', JSON.stringify(data));
        }
    }
}