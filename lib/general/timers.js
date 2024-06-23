export function timeToSecond(current_time) {
    return current_time / 1000 + 's';
}

export function getTimer() {
    var new_last_operation = new Date().getTime();
    var m = 'Last operation : ' + timeToSecond(new_last_operation - global.last_operation) + ' Totally : ' + timeToSecond(new_last_operation - global.start_time) + "\n";
    global.last_operation = new_last_operation;
    return m;
}