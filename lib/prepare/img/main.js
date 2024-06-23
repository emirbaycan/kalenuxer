import fs from "fs";

import { onceProcessed } from '../../general/oncer.js';
import { runForFile } from '../../general/for_eachs.js';

import { releaseFile, getFilePath } from '../general/file.js';

export async function prepareImgs() {
    console.log('preparing api files');
    var time = 'img';

    function prepareImgFile(file_path) {
        var file_text, project_file_path, new_file_parent;

        project_file_path = getFilePath(file_path, time);

        if (!onceProcessed(time, project_file_path, file_path)) {
            return false;
        }

        file_text = fs.readFileSync(file_path);

        file_path = file_path.replace('/site/' + time + '/', '/dist/' + global.base + '/' + time + '/');

        releaseFile(file_path, file_text)
    }

    await runForFile(time, prepareImgFile);
}