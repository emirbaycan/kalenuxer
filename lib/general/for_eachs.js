import fs from "fs";

export function runForEachFileSync(dir, command) {
    var data = [];

    function findDir() {
        var files = fs.readdirSync(dir);
        if (!files) {
            return false;
        }
        files.forEach((file) => {
            findFiles(dir + file);
        });
    }

    function findFiles(mem_file_path) {
        if (fs.lstatSync(mem_file_path).isDirectory()) {
            var files = fs.readdirSync(mem_file_path);
            if (!files) {
                return false;
            }
            files.forEach((file) => {
                findFiles(mem_file_path + "/" + file);
            });
        } else {
            data.push(command(mem_file_path));
        }
    }
    findDir();
    return data;
}

export async function runForEachFile(dir, command) {

    function findDir() {
        fs.readdir(dir, (err, files) => {
            if (!files) {
                return false;
            }
            files.forEach((file) => {
                findFiles(dir + file);
            });
        });
    }

    async function findFiles(mem_file_path) {
        if (fs.lstatSync(mem_file_path).isDirectory()) {
            fs.readdir(mem_file_path, (err, files) => {
                if (!files) {
                    return false;
                }
                files.forEach((file) => {
                    findFiles(mem_file_path + "/" + file);
                });
            });
        } else {
            command(mem_file_path);
        }
    }
    findDir();
}

export async function runForFile(dir, command) {
    var start_time = new Date();
    return (await Promise.all(prepareForEach(project_dir + '/site/' + dir, command)).then(function() { console.log(dir + ' prepared in', ((new Date() - start_time) / 1000) + 's , Total Time', ((new Date() - global.kalenuxer_start_time) / 1000)) }));
}

export async function runForFolder(dir, command) {
    var start_time = new Date();
    return (await Promise.all(prepareForFolder(project_dir + '/site/' + dir, command)).then(function() { console.log(dir + ' prepared in', ((new Date() - start_time) / 1000) + 's , Total Time', ((new Date() - global.kalenuxer_start_time) / 1000)) }));
}

export function prepareForEach(dir, command) {

    var commands = [];

    function prepareForEachFile(file_path, command) {

        if (fs.lstatSync(file_path).isDirectory()) {
            var files = fs.readdirSync(file_path);
            if (files) {
                files.forEach((file) => {
                    prepareForEachFile(file_path + "/" + file, command);
                });
            }
        } else {
            commands.push(command.bind(null, file_path)());
        }
    }

    prepareForEachFile(dir, command);
    return commands;
}

export function prepareForFolder(dir, command) {

    var commands = [];

    function prepareForEachFolder(file_path, command) {
        if (fs.lstatSync(file_path).isDirectory()) {
            var files = fs.readdirSync(file_path);
            if (files) {
                files.forEach((file) => {
                    commands.push(command.bind(null, file_path + "/" + file)());
                });
            }
        }
    }

    prepareForEachFolder(dir, command);
    return commands;
}