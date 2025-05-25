import fs from 'fs';
import fse from 'fs-extra';
import gulp from 'gulp';
import iconfont from "gulp-iconfont";

import { onceProcessed } from '../../general/oncer.js';
import { runForEachFileSync, runForFolder } from '../../general/for_eachs.js';

import { getFilePath } from '../general/file.js';

export async function prepareIcons() {
    console.log('preparing icons files');
    var time = 'icons';

    var users = options.subs;

    function prepareFile(file_path) {
        var project_file_path;

        project_file_path = getFilePath(file_path, time);

<<<<<<< HEAD
        if(global.icons_option == false && file_path == 'customer'){
            return;
        }

=======
>>>>>>> f9fdf38e588e5d479d000ce70e02cb910c3f5850
        if (!onceProcessed(time, project_file_path, file_path)) {
            return false;
        }

        if (project_file_path === '_general') {
            runForEachFileSync(file_path + '/', function(file_path) {
                var user;
                for (user in users) {
                    user = users[user];
<<<<<<< HEAD
                    if(!fse.existsSync(file_path.replace('_general', user))){
                        fse.copySync(file_path, file_path.replace('_general', user), { overwrite: true });
                    }
=======
                    fse.copySync(file_path, file_path.replace('_general', user), { overwrite: true });
>>>>>>> f9fdf38e588e5d479d000ce70e02cb910c3f5850
                }
            });
            return;
        }

        gulp.src([file_path + '/*.svg'])
            .pipe(iconfont({
                fontName: project_file_path,
                formats: ['ttf', 'eot', 'woff'],
                fontHeight: 1001,
                normalize: true,
            })).on('glyphs', function(glyphs, options) {
                var a, r;
                a = project_file_path + `/` + project_file_path;
                r = `@charset='UTF-8';@font-face {
                    font-family: '` + project_file_path + `';
                    src: url('/font/users/` + a + `.ttf') format('truetype'),
                    url('/font/users/` + a + `.eot') format('embedded-opentype'),
                    url('/font/users/` + a + `.woff') format('woff');
                    font-weight: normal;
                    font-style: normal;
                    font-display: block;
                }

                [class^="icon-"],
                [class*=" icon-"] {
                    /* use !important to prevent issues with browser extensions that change fonts */
                    font-family: '` + project_file_path + `' !important;
                    speak: never;
                    font-style: normal;
                    font-weight: normal;
                    font-variant: normal;
                    text-transform: none;
                    line-height: 1;
                    /* Better Font Rendering =========== */
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }`;
                for (a in glyphs) {
                    a = glyphs[a];
                    r += '.icon-' + a.name + ':before{content:\'\\' + a.unicode.toString().charCodeAt(0).toString(16) + '\'}';
                    //r += '.icon-' + a.name + ':before{content:\'\\' + a.unicode.toString().codePointAt(0).toString(16) + '\'}';
                }
                r = r.replace(/\n/g, '');
                r = r.replace(/ /g, '');
                r = r.replace(/ /g, '');
                r = r.replace(/ /g, '');
                r = r.replace(/ /g, '');
                fs.writeFileSync(project_dir + '/site/css/users/' + project_file_path + '/icons.css', r);
            })
            .pipe(gulp.dest(file_path.replace('/site/icons/', '/dist/' + base + '/font/users/')));
    }

    await runForFolder(time, prepareFile);
}