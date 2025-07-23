function go(e) {
    var t, n, a, l;
    t = elane.value, n = document.getElementById(t), a = e.getAttribute('data-id'), 0 == (l = document.getElementById('c' + t)).innerHTML.length && (l.innerHTML = 0), -1 == n.value.indexOf(a) ? (n.value += a + ',', e.setAttribute('lanes-' + t, ''), l.innerHTML = parseInt(l.innerHTML) + 1) : (n.value = n.value.replace(a + ',', ''), e.removeAttribute('lanes-' + t), l.innerHTML = parseInt(l.innerHTML) - 1), 0 != l.innerHTML ? l.setAttribute('class', 'filled') : (l.innerHTML = '', l.setAttribute('class', ''), l.parentNode.lastElementChild.style = 'display:none'), 0 != document.getElementsByClassName('filled').length && ('def' == t && (ecdef.parentNode.style = 'background: #ffc73c;color: black;'), ecdef.parentNode.lastElementChild.style = 'background: black;color: #ffc73c;display:unset'), calcsc()
}

function searcher(e) {
    var t, n, a, l, s, i, c, d, r, o = document.getElementById('lane').value,
        u = document.getElementById(o).value,
        m = u.slice(0, u.length - 1).split(','),
        g = m.length;
    t = e.value.toUpperCase(), n = e.nextElementSibling.getElementsByTagName('img'), count = 0, stop = 10;
    var y = 0;
    if ('' == t || null == t)
        if ('' == m[0] || 0 == g)
            for (l = 0; l < n.length; l++) c = 'special' == (i = n[l]).getAttribute('class') ? 'unset' : 'none', i.style.order = 11, i.style.display = c;
        else
            for (l = 0; l < n.length; l++) {
                for (d = (i = n[l]).getAttribute('data-id'), a = 0; a < g; a++) {
                    if ((r = m[a]) == d || 'special' == i.getAttribute('class') && count >= g && count != stop) { r == d && (i.style.order = y, y += 1), count++, c = 'unset'; break }
                    i.style.order = 11, c = 'none'
                }
                i.style.display = c
            } else {
                for (l = 0; l < n.length; l++) {
                    if (d = (i = n[l]).getAttribute('data-id'), s = i.getAttribute('data-id'), g > 0 && '' != m[0])
                        for (a = 0; a < g; a++) {
                            if (r = m[a], s.toUpperCase().indexOf(t) > -1 && count != stop || r == d) { r == d && (i.style.order = y, y += 1), count++, count, c = 'unset'; break }
                            i.style.order = 11, c = 'none'
                        } else s.toUpperCase().indexOf(t) > -1 && count != stop ? (count++, count, c = 'unset') : c = 'none';
                    i.style.order = 11, i.style.display = c
                }
                if (0 == count) {
                    if (-1 != t.indexOf(',')) {
                        var p = t.split(','),
                            f = [];
                        for (val in p + 1) {
                            var h = !1;
                            for (l = 0; l < n.length; l++) {
                                for (value in f) l == f[value] && (h = !0);
                                for (d = (i = n[l]).getAttribute('data-id'), s = i.getAttribute('data-id'), a = 0; a < g; a++) {
                                    if (s.toUpperCase().indexOf(p[val]) > -1) { count += 1, f.push(l), c = 'unset'; break }
                                    h || (c = 'none')
                                }
                                i.style.display = c
                            }
                        }
                        for (val in f) n[f[val]].getAttribute('data-id')
                    }
                    if (0 == count)
                        for (l = 0; l < n.length; l++)
                            if ('special' == (i = n[l]).getAttribute('class')) i.style.display = 'unset';
                            else
                                for (d = i.getAttribute('data-id'), a = 0; a < g; a++)(r = m[a]) != d && (i.style.display = 'none')
                }
            }
}

function spel(e, t) {
    var n, a, l, s, i, c, d, r, o;
    n = e.parentNode.children[1], -2e3 == (a = parseInt(n.getAttribute('data-n')) + t) ? a = 0 : 200 == a && (a = -1800), 'spel' == n.id ? (l = document.getElementById('spelt'), ind = 0) : (l = document.getElementById('spel'), ind = 1), s = l.getAttribute('data-n'), i = Math.abs(a) / 200, o = n.children[i].innerHTML, c = !1, s != a || 0 == a ? (n.style = 'transform: translate(' + a + 'px, 0px);', n.setAttribute('data-n', a)) : (nndatan = a + t, -2e3 == nndatan ? nndatan = 0 : 200 == nndatan && (nndatan = -1800), n.style = 'transform: translate(' + nndatan + 'px, 0px);', n.setAttribute('data-n', nndatan), o = n.children[Math.abs(nndatan) / 200].innerHTML, c = !0), (r = (d = document.getElementById('sl')).value.split(','))[ind] = i, c && (1 == ind ? r[0] = Math.abs(nndatan) / 200 : r[1] = Math.abs(nndatan) / 200), d.value = r.join(','), e.parentNode.parentNode.children[1].setAttribute('src', '/img/spells/' + o + '.png'), calcsc()
}

function scrol(e, t, n, l) {
    var s, i, c, d, r;
    if (lanes = ['top', 'mid', 'adc', 'jung', 'sup', 'def'], s = lanes[t], i = window.event.srcElement, c = document.getElementsByClassName('scrol'), 'icon-check' != i.getAttribute('class')) {
        for (r = 0; r < c.length; r++)(d = c[r]).style = '', d.selected = !1;
        e.selected ? (e.style = '', e.selected = !1, document.getElementById('lane').value = 'def', document.getElementById('sech').setAttribute('class', 'schamps def')) : (e.style = 'background: #ffc73c;color: black;', e.selected = !0, 'def' != s && (e.lastElementChild.style.display = 'unset'), document.getElementById('lane').value = s, document.getElementById('sech').setAttribute('class', 'schamps ' + s))
    } else if (li = document.getElementById('sech').getElementsByTagName('img'), q = 'lanes-' + s, i.style.display = 'none', i.parentNode.selected = !1, document.getElementById('c' + s).setAttribute('class', ''), document.getElementById('c' + s).innerHTML = '', i.parentNode.style = '', 'def' != s) {
        for (r = 0; r < li.length; r++)
            if (lii = li[r], '' == lii.getAttribute(q)) {
                lii.removeAttribute(q);
                var o, u = (o = document.getElementById(s)).value;
                o.value = u.replace(lii.getAttribute('data-id') + ',', '')
            }
        document.getElementById('cdef').style.display = 'unset', '' == document.getElementById('cdef').innerHTML && c[0].children[2].setAttribute('class', ''), scslanes[s] = 0, document.getElementById('lane').value = 'def', document.getElementById('sech').setAttribute('class', 'schamps def')
    } else {
        for (a = 0; a < lanes.length; a++)
            for (ca = lanes[a], q = 'lanes-' + ca, o = document.getElementById(ca), cao = document.getElementById('c' + ca), cao.innerHTML = '', cao.removeAttribute('class'), r = 0; r < li.length; r++) lii = li[r], lia = lii.getAttribute(q), '' == lia && (lii.removeAttribute(q), o.value = o.value.replace(lii.getAttribute('data-id') + ',', ''));
        c[0].children[4].style.display = 'none', c[0].children[2].innerHTML = '', c[0].children[2].setAttribute('class', '')
    }
    calcsc()
}

function calcsc() {
    var e, t, n, a, l, s, c;
    if (true === document.getElementById('sc').checked) {
        for (a = parseFloat(document.getElementById('price').dataset.price), (e = document.getElementById('scp')).selected = !1, n = 1, c = sclanes.length, t = 0; t < c; t++) ca = sclanes[t], 'unset' == document.getElementById('c' + ca).nextElementSibling.nextElementSibling.style.display && (n *= scprices[ca], scslanes[ca] = 1, e.selected = !0);
        for (0 == document.getElementById('spel').getAttribute('data-n') && 0 == document.getElementById('spelt').getAttribute('data-n') || (a += scprices.sp, e.selected = !0), document.getElementById('price').dataset.final_price = (a * n).toFixed(2), updateDiscount(), scl = '', c = sclanes.length, i = 0; i < c; i++) {
            if (t = sclanes[i], scl += scslanes[t] + ':', '' != (l = document.getElementById(t).value)) {
                for ((l = l.split(',')).pop(), s = 0; s < l.length; s++) scl += stchamps[l[s]] + '.';
                scl = scl.slice(0, -1)
            } else scl += '0';
            scl += ','
        }
        scl = scl.slice(0, -1), document.getElementById('scl').value = scl
    }
}

function scp() {
    1 == document.getElementById('sc').checked ? document.getElementById('scpc').style = 'opacity:1;z-index:9' : (document.getElementById('scl').value = '0:0,0:0,0:0,0:0,0:0,0:0', document.getElementById('sl').value = '0,0');
    for (var e, t = document.getElementById('sech').children, n = t.length, a = 0; a < n; a++)(e = t[a]).setAttribute('src', e.getAttribute('data-src'));
    calcp()
}

function scpclose() { document.getElementById('scpc').style = 'opacity:0;z-index:-1', document.getElementById('scp').selected || (document.getElementById('scl').value = '0:0,0:0,0:0,0:0,0:0,0:0', document.getElementById('sl').value = '0,0', document.getElementById('sc').checked = !1, document.getElementById('sc').parentNode.firstElementChild.style = 'color: rgb(128, 128, 125);') }

firer.push(function() {
    stchamps = { Aatrox: 1, Ahri: 2, Akali: 3, Alistar: 4, Amumu: 5, Anivia: 6, Annie: 7, Aphelios: 8, Ashe: 9, "Aurelion Sol": 10, Azir: 11, Bard: 12, Blitzcrank: 13, Brand: 14, Braum: 15, Caitlyn: 16, Camille: 17, Cassiopeia: 18, "Cho'Gath": 19, Corki: 20, Darius: 21, Diana: 22, "Dr. Mundo": 23, Draven: 24, Ekko: 25, Elise: 26, Evelynn: 27, Ezreal: 28, Fiddlesticks: 29, Fiora: 30, Fizz: 31, Galio: 32, Gangplank: 33, Garen: 34, Gnar: 35, Gragas: 36, Graves: 37, Hecarim: 38, Heimerdinger: 39, Illaoi: 40, Irelia: 41, Ivern: 42, Janna: 43, "Jarvan IV": 44, Jax: 45, Jayce: 46, Jhin: 47, Jinx: 48, "Kai'Sa": 49, Kalista: 50, Karma: 51, Karthus: 52, Kassadin: 53, Katarina: 54, Kayle: 55, Kayn: 56, Kennen: 57, "Kha'Zix": 58, Kindred: 59, Kled: 60, "Kog'Maw": 61, LeBlanc: 62, "Lee Sin": 63, Leona: 64, Lissandra: 65, Lucian: 66, Lulu: 67, Lux: 68, Malphite: 69, Malzahar: 70, Maokai: 71, "Master Yi": 72, "Miss Fortune": 73, Mordekaiser: 74, Morgana: 75, Nami: 76, Nasus: 77, Nautilus: 78, Neeko: 79, Nidalee: 80, Nocturne: 81, Nunu: 82, Olaf: 83, Orianna: 84, Ornn: 85, Pantheon: 86, Poppy: 87, Pyke: 88, Qiyana: 89, Quinn: 90, Rakan: 91, Rammus: 92, "Rek'Sai": 93, Renekton: 94, Rengar: 95, Riven: 96, Rumble: 97, Ryze: 98, Sejuani: 99, Senna: 100, Sett: 101, Shaco: 102, Shen: 103, Shyvana: 104, Singed: 105, Sion: 106, Sivir: 107, Skarner: 108, Sona: 109, Soraka: 110, Swain: 111, Sylas: 112, Syndra: 113, "Tahm Kench": 114, Taliyah: 115, Talon: 116, Taric: 117, Teemo: 118, Thresh: 119, Tristana: 120, Trundle: 121, Tryndamere: 122, "Twisted Fate": 123, Twitch: 124, Udyr: 125, Urgot: 126, Varus: 127, Vayne: 128, Veigar: 129, "Vel'Koz": 130, Vi: 131, Viktor: 132, Vladimir: 133, Volibear: 134, Warwick: 135, Wukong: 136, Xayah: 137, Xerath: 138, XinZhao: 139, Yasuo: 140, Yorick: 141, Yuumi: 142, Zac: 143, Zed: 144, Ziggs: 145, Zilean: 146, Zoe: 147, Zyra: 148 };
    var a;
    a = document.getElementById('sech');
    for (b in stchamps) {
        a.innerHTML += '<img data-id="' + b + '" alt="' + b + '" data-src="/img/hi/' + b.replace(/([' .])/g, '').toLowerCase() + '.png" class="special" onclick="go(this)"></img>';
    }
    elane = document.getElementById('lane'), ecdef = document.getElementById('cdef'), document.getElementById('sech').children[0].checked = !0;
    scslanes = { def: '0', top: '0', mid: '0', adc: '0', jung: '0', sup: '0' };
    sclanes = ['def', 'top', 'jung', 'mid', 'adc', 'sup'];
    scprices = { top: 1.25, mid: 1.2, adc: 1.3, jung: 1.2, sup: 1.3, def: 1.2, sp: 10 };
});