import fs from "fs";

import { onceProcessed } from '../../general/oncer.js';
import { runForFile } from '../../general/for_eachs.js';

import { releaseFile, getFilePath } from '../general/file.js';

export async function prepareHandlerFiles() {
    console.log('preparing handler files');
    var time = 'handler';

    function prepareFile(file_path) {
        var file_text, just_file_path;

        just_file_path = getFilePath(file_path, time);

        if (!onceProcessed(time, just_file_path, file_path)) {
            return false;
        }

        file_text = fs.readFileSync(file_path);

        file_path = file_path.replace('/site/' + time + '/', '/dist/' + global.base + '/');

        releaseFile(file_path, file_text)
    }

    await runForFile('handler', prepareFile);
}