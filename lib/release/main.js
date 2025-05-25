import fs from 'fs';
import gulp from 'gulp';
import gutil from "gulp-util";
import ftp from "vinyl-ftp";

import { runForEachFile } from '../general/for_eachs.js';
import { onceReleased, updateTimes } from '../general/oncer.js';
import { setTimes } from '../general/data_handler.js';

import { getTimer } from '../general/timers.js';

export function releaseKalenuxer() {
    var time = method;

    global.start_time = new Date().getTime();
    global.last_operation = start_time;

    console.log('test started', getTimer());
    console.log('getting datas', getTimer());

    setTimes(['api', 'css', 'js', 'html', 'font', 'handler', 'functions', 'vendor', 'img', 'plugins', 'templates', 'statics', 'base'].concat(languages));

    async function uploadFile(file_path) {
        var con, con_file_base, oncer, type, time, ftp;

        con_file_base = file_path.split('/' + base + '/');
        type = con_file_base[1].split('/')[0];

        if (type.indexOf('.') !== -1 || type === 'base') {
            time = 'handler';
            type = '.'
        } else {
            time = type;
        }

        if (!times[time]) {
            time = 'handler';
        }

        con_file_base = con_file_base[0] + '/' + base + '/';
        if (file_path.indexOf('base') !== -1) {
            con_file_base += 'base/'
        }

        oncer = file_path.split('test/');
        if (oncer[1]) {
            oncer = oncer[1];
        } else {
            oncer = oncer[0];
        }

        oncer = oncer.split('release/');
        if (oncer[1]) {
            oncer = oncer[1];
        } else {
            oncer = oncer[0];
        }

        if (!onceReleased(time, oncer, file_path)) {
            return false;
        }

        gulp.src(file_path, { base: con_file_base, buffer: false })
            .pipe(connection.dest(''))
            .pipe(connection.mode('', '0755'))
            .on('end', updateTimes.bind(null, time));
    }

    console.log('uploading started', getTimer());
    var arcs, ftp_infos, ftp_host, ftp_accounts, ftp_info, connection;

    arcs = options.systems;
    ftp_infos = options.infos.ftp;
    ftp_host = ftp_infos.host;
    ftp_accounts = ftp_infos.dirs;
    ftp_info = ftp_accounts[base];
<<<<<<< HEAD

=======
    console.log(ftp_infos);
>>>>>>> f9fdf38e588e5d479d000ce70e02cb910c3f5850
    connection = ftp.create({
        host: ftp_host,
        user: ftp_info.user,
        password: ftp_info.pass,
        parallel: false,
<<<<<<< HEAD
        secure: false,
=======
        secure: true,
>>>>>>> f9fdf38e588e5d479d000ce70e02cb910c3f5850
        secureOptions: {
            rejectUnauthorized: false
        },
        log: gutil.log
    });
    runForEachFile(project_dir + 'dist/' + base + '/', uploadFile);

    console.log('upload commands sent', getTimer());
}