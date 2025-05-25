export function minifyHTML(file_text) {
    file_text = file_text.replace(/\n/g, '');
    file_text = file_text.replace(/  /g, ' ');
    file_text = file_text.replace(/  /g, ' ');
    file_text = file_text.replace(/  /g, ' ');
    file_text = file_text.replace(/> </g, '><');
    return file_text;
}