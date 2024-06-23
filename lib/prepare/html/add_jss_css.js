function addJSs(file_content, data_mem) {
    var path, mem, degree, data_place, new_data_place, tag, type, tags;

    for (mem in data_mem) {
        mem = data_mem[mem];
        path = '"/' + mem.path + '"';
        degree = mem.degree;

        if (file_content.indexOf(path) !== -1) {
            continue;
        }
        if (path.indexOf('bot') !== -1) {
            path = path.split('.bot').join('');
            data_place = file_content.indexOf('</body>');
            if (data_place === -1) {
                data_place = file_content.indexOf('<body>');
                data_place = file_content.indexOf('</script>', data_place) + 9;
            }
            new_data_place = data_place;

        } else if (path.indexOf('top') !== -1) {
            data_place = file_content.indexOf('</head>');
            if (data_place === -1) {
                data_place = file_content.indexOf('<head>');
                if (data_place === -1) {
                    data_place = file_content.indexOf('</script>') + 9;
                }
            }
            new_data_place = data_place;
            path = path.split('.top').join('');
        } else {
            data_place = file_content.indexOf('</head');
            new_data_place = data_place;
            data_place = file_content.indexOf('</script>', data_place) + 9;
            if (data_place === -1) {
                data_place = new_data_place;
            }
            new_data_place = data_place;
        }
        while (degree > 0) {
            data_place = file_content.indexOf('</script>', data_place + 1) + 9;
            if (data_place === 8) {
                data_place = new_data_place
                break;
            }
            new_data_place = data_place;
            degree -= 1;
        }
        if (data_place === -1) {
            data_place = file_content.indexOf('</body>');
            if (data_place === -1) {
                continue;
            }
        }
        tags = '';
        type = mem.type;
        for (tag in type) {
            tag = type[tag];
            if (tag == 'async' || tag == 'defer') {
                tags += ' ' + tag;
            }
        }

        file_content = file_content.substring(0, data_place) + '<script ' + tags + ' src=' + path + ' ></script>' + file_content.substring(data_place, file_content.length);
    }
    return file_content;
}

function addCSSs(file_content, data_mem) {
    var path, mem, data_place, new_data_place, degree, type;
    if (file_content.indexOf('</head') == -1 || file_content.indexOf('</body') == -1) {
        return file_content;
    }
    for (var i = 0; i < data_mem.length; i++) {
        mem = data_mem[i];;
        path = '"/' + mem.path + '"';
        degree = mem.degree;

        if (file_content.indexOf(path) !== -1) {
            continue;
        }
        if (path.indexOf('bot') !== -1) {
            degree = 99;
        } else if (path.indexOf('top') !== -1) {
            degree = -99;
        }

        data_place = file_content.indexOf('<link');;
        while (degree >= 0) {
            data_place = file_content.indexOf('<link', data_place + 1);
            if (data_place === -1) {
                data_place = file_content.indexOf('</body');
                if (data_place === -1) {
                    data_place = file_content.indexOf('<body');
                }
                if (data_place === -1) {
                    data_place = file_content.indexOf('</head');
                }
            }
            if (data_place === -1) {
                data_place = new_data_place;
                break;
            }
            new_data_place = data_place;
            degree -= 1;
        };
        while (data_place === -1) {
            data_place = file_content.indexOf('</head>');;
            if (data_place === -1) {
                data_place = file_content.indexOf('<link');
                if (data_place === -1) {
                    data_place = file_content.indexOf('<body');
                    if (data_place === -1) {
                        data_place = file_content.indexOf('</body');
                    }
                }
                while (data_place !== -1) {
                    data_place = file_content.indexOf('<link', data_place + 1);

                    if (data_place === -1) {
                        data_place = new_data_place;
                        break;
                    }
                    new_data_place = data_place;
                }
                degree -= 1;
            }
        };
        type = mem.type;
        switch (type) {
            case 'async':
                path = '<link href=' +
                    path.replace('.async', '') + " as=\"style\" onload=\"this.onload=null;this.rel='stylesheet'\">";
                break;
            default:
                path = '<link href=' +
                    path + ' rel="stylesheet">';
                break;
        };

        file_content = file_content.substring(0, data_place) + path + file_content.substring(data_place, file_content.length);
    }
    return file_content;
}

export function htmlJSCSS(file_content, data_path, language) {
    var mem_path, mem_data, rem_datas, rem_data_path, data, path, degree, asset, assets, mem, smem, smems, type;
    assets = global.json_datas['schemes'];

    for (asset in assets) {
        data = [];
        rem_datas = assets[asset];
        rem_data_path = data_path;
        if (!rem_datas) {
            continue;
        }
        degree = 0;
        mem_path = '';

        if (rem_datas.general) {
            mem = rem_datas.general;
            for (smem in mem) {
                smem = mem[smem];
                data.push({ type: smem.split('.').slice(1, -1), path: smem.replace('.lang', '.' + language), degree: -1 })
            }
        }

        while (path = rem_data_path[0]) {

            if (path.indexOf('.') !== -1) {
                path = path.split('.')[0];

                if (mem_data && mem_data[path]) {
                    path = mem_data[path];
                    data.push({ type: path.split('.').slice(1, -1), path: path.replace('.lang', '.' + language), degree: degree });
                }
                break;
            }
            mem_path += '["' + path + '"]';
            mem_data = eval('rem_datas' + mem_path);
            if (!mem_data) {
                break;
            } else if (mem_data.general) {
                mem = mem_data.general;
                for (smem in mem) {
                    smem = mem[smem];
                    data.push({ type: path.split('.').slice(1, -1), path: smem.replace('.lang', '.' + language), degree: degree });
                }
            }
            degree += 1;
            rem_data_path = data_path.slice(degree);
        }
        if (data) {
            switch (asset) {
                case 'css':
                    file_content = addCSSs(file_content, data);
                    break;
                case 'js':
                    file_content = addJSs(file_content, data);
                    break;
            }
        } else {}
    }
    return file_content;
}