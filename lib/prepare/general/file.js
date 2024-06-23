import fs from "fs";

export function getFilePath(file_path, time) {
    return file_path.split('/' + time + '/')[1];
}

export async function releaseFile(new_file_path, new_file_content) {
    var new_file_parent, new_file_content;
    new_file_parent = new_file_path.split('/')
    new_file_parent = new_file_parent.slice(0, new_file_parent.length - 1).join('/');

    if (!fs.existsSync(new_file_parent)) { fs.mkdirSync(new_file_parent, { recursive: true }) }
    fs.writeFileSync(new_file_path, new_file_content);
}

export function backUpFile(file_path, is_new_file) {
    var new_file_paths, new_file_path, last_item_index, new_file_folder;

    if (!file_path) {
        return;
    }

    is_new_file = is_new_file ? 'new' : 'old';

    new_file_path = file_path.replace('websites', 'backups/' + project + '/' + global.version + '/' + is_new_file);
    new_file_paths = new_file_path.split('/');

    last_item_index = new_file_paths.length - 1;

    delete new_file_paths[last_item_index];
    new_file_folder = new_file_paths.join('/');

    if (!fs.existsSync(new_file_folder)) {
        fs.mkdirSync(new_file_folder, { recursive: true });
    }

    fs.copyFileSync(file_path, new_file_path);
}