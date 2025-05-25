export async function prepareVendorFiles() {
    var time = 'vendor';

    function getFilePath(file_path) {
        return file_path.split('/' + time + '/')[1];
    }

    function prepareFile(file_path) {
        var file_text, project_file_path;

        project_file_path = getFilePath(file_path);

        if (!onceProcessed(time, project_file_path, file_path)) {
            return false;
        }

        file_text = fs.readFileSync(file_path);

        file_path = file_path.replace('/vendor/', '/' + global.base + '/api/vendor/');

        releaseFile(file_path, file_text)
    }
    if (!fs.existsSync(project_dir + 'vendor')) {
        return;
    }
    await runForFile('vendor', prepareFile);
}