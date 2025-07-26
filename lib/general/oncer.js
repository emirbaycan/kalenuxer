import fs from "fs";

import { errorKalenuxer } from './adjustments.js';

export function encodeTime(time) {
    var time_encoder, char;
    time_encoder = 'emirbaycn140598EMIRBAYCN';
    time = time.toString().split('.').join('').split('');
    for (char in time) {
        time[char] = time_encoder[time[char]]
    }
    time = time.join('');
    return time;
}

export function onceProcessed(time, file_name, file_path) {
    var file_stats, file_time;

    if(global.times[time] == undefined){
        global.times[time] = {};
    }

    if (!fs.existsSync(file_path)) {
        return false;
    }
    
    file_stats = fs.statSync(file_path);
    file_time = encodeTime(file_stats.mtimeMs);

    if (!global.times[time][file_name]) {
        global.times[time][file_name] = {};
    }

    if (global.times[time][file_name].processed_at === file_time) {
        return false;
    }
 
    global.times[time][file_name].processed_at = file_time;

    updateTimes(time);
    return true;
}

export function onceTemplateProcessed(time, file_name, file_path) {
    var file_stats, file_time;

    if(global.times[time] == undefined){
        global.times[time] = {};
    }

    if (!fs.existsSync(file_path)) {
        return false;
    }
    
    file_stats = fs.statSync(file_path);
    file_time = encodeTime(file_stats.mtimeMs);

    if (!global.times[time][file_name]) {
        global.times[time][file_name] = {};
    }

    if (global.times[time][file_name].processed_at === file_time) {
        return false;
    }
 
    global.times[time][file_name].processed_at = file_time;

    if(file_name.indexOf('general')!==-1){
        var directory = file_name.split('/general');
        directory = directory[0];
    }else{
        var directory = file_name.split('/');
        directory = directory.slice(0, -1).join('/');      
    }

    var html_times = global.times['html'];
    var html_times_keys = Object.keys(html_times);
    for(var key in html_times_keys){
        var html_key = html_times_keys[key];
        if(html_key.indexOf(directory) === 0){
            if(!global.times[time][html_key]){
                global.times[time][html_key] = {};
            }
            global.times[time][html_key].processed_at = file_time;
        }            
    }

    updateTimes(time);
    return true;
}

export function onceReleased(time, file_name, file_path) {
    var file_stats, file_time, mem;
    if (file_name.indexOf(time) === 0) {
        mem = file_name.split(time + '/')[1];
        if (mem) {
            file_name = mem;
        }
    }
    if (!fs.existsSync(file_path)) {
        errorKalenuxer(time + ' ' + file_name + ' ' + file_path);
        return false;
    }

    file_stats = fs.statSync(file_path);
    file_time = encodeTime(file_stats.mtimeMs);

    if (!global.times[time][file_name]) {
        global.times[time][file_name] = {};
    }

    if (global.times[time][file_name].uploaded_at === file_time) {
        return false;
    }

    global.times[time][file_name].uploaded_at = file_time;
    updateTimes(time);
    return true;
}

export function updateTimes(time) {
    if(!global.times_dir[time]){
        return false;
    }
    fs.writeFileSync(global.times_dir[time], JSON.stringify(global.times[time]));
    return true;
}