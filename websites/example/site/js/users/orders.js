function parseBoost(a) {
    var b, c, d, e, f, g, h, j, l, r = '';
    b = JSON.parse(a.details);
    t = b.type;
    d = parsePackets(b.from, b.to, t);
    h = b.checks;
    e = h.slice(4);
    l = ((e.indexOf('1') != -1 || b.sl.indexOf('1') != -1 || b.scl.indexOf('1') != -1) ? ' show-options" onclick="showOptions(this)" data-checks="' +
        h + '" data-sl="' +
        b.sl + '" data-scl="' +
        b.scl + '"><div class="tip-header"><p>Opsiyon</p></div><div class="tip-footer"><p><font class="good-color">Var</font>' :
        '"><div class="tip-header"><p>Opsiyon</p></div><div class="tip-footer"><p>-');
    f = d.from;
    j = stateParser(order_states[a.order_state]);

    switch (t) {
        case 0:
            if (f[1]) {
                g = f[0] + ' ' + f[1];
                k = league_imgs[b.from[0]] + f[1].toLowerCase();
            } else {
                g = f[0];
                k = league_imgs[b.from[0]];
            }
            r += '<div class="ti-content"><div class="ti-parts"><div class="ti-part"><div class="tip-header"><p>Nereden</p></div><div class="tip-footer"><p>' +
                g + '</p><div class="tip-image" style="background-image:url(/img/' +
                k + '.png)"></div></div></div><div class="ti-sep"><span class="icon-arrow-point-to-right"></span></div><div class="ti-part"><div class="tip-header"><p>Nereye</p></div><div class="tip-footer"><p>' +
                d.to[0] + ' ' + d.to[1] + '</p><div class="tip-image" style="background-image:url(/img/' +
                league_imgs[b.to[0]] + d.to[1].toLowerCase() + '.png)"></div></div></div></div>';
            if (f[2]) {
                r += '<div class="ti-part"><div class="tip-header"><p>Mevcut LP</p></div><div class="tip-footer"><p>' +
                    f[2] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>LP Artımı</p></div><div class="tip-footer"><p>' +
                    f[3] + '</p></div></div>';
            }
            r += '<div class="ti-part"><div class="tip-header"><p>Sıra</p></div><div class="tip-footer"><p>' +
                solo_flex[h[2]] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Sunucu</p></div><div class="tip-footer"><p>' +
                servers[h[0]] + '</p></div></div><div class="ti-part' +
                l + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Tahmini Süre</p></div><div class="tip-footer"><p class="date-color">' +
                b.ct + ' Gün</p></div></div><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer">' +
                j + '</div></div><div class="ti-part"><div class="tip-header"><p>Fiyat</p></div><div class="tip-footer"><p class="price-color">' +
                a.price + ' ' + currency + '</p></div></div></div>';
            break;
        case 1:
            r += '<div class="ti-content"><div class="ti-parts"><div class="ti-part"><div class="tip-header"><p>Nereden</p></div><div class="tip-footer"><p>' +
                f[0] + ' ' + f[1] + '</p><div class="tip-image" style="background-image:url(/img/' +
                league_imgs[b.from[0]] + f[1].toLowerCase() + '.png)"></div></div></div><div class="ti-sep"><span class="icon-arrow-point-to-right"></span></div><div class="ti-part"><div class="tip-header"><p>Nereye</p></div><div class="tip-footer"><p>' +
                d.to + '</p><div class="tipf-img">' +
                b.to + '</div></div></div></div><div class="ti-part"><div class="tip-header"><p>Sıra</p></div><div class="tip-footer"><p>' +
                solo_flex[h[2]] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Sunucu</p></div><div class="tip-footer"><p>' +
                servers[h[0]] + '</p></div></div><div class="ti-part' +
                l + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Tahmini Süre</p></div><div class="tip-footer"><p class="date-color">' +
                b.ct + ' Gün</p></div></div><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer">' +
                j + '</div></div><div class="ti-part"><div class="tip-header"><p>Fiyat</p></div><div class="tip-footer"><p class="price-color">' +
                a.price + ' ' + currency + '</p></div></div></div>';
            break;
        case 2:
            if (f[1]) {
                g = f[0] + ' ' + f[1];
                k = league_imgs[b.from[0]] + f[1].toLowerCase()
            } else {
                g = f[0];
                k = league_imgs[b.from[0]].toLowerCase()
            }
            r += '<div class="ti-content"><div class="ti-parts"><div class="ti-part"><div class="tip-header"><p>Nereden</p></div><div class="tip-footer"><p>' +
                g + '</p><div class="tip-image" style="background-image:url(/img/' +
                k + '.png)"></div></div></div><div class="ti-sep"><span class="icon-arrow-point-to-right"></span></div><div class="ti-part"><div class="tip-header"><p>Nereye</p></div><div class="tip-footer"><p>' +
                d.to + '</p><div class="tipf-img">' +
                b.to + '</div></div></div></div><div class="ti-part"><div class="tip-header"><p>Sıra</p></div><div class="tip-footer"><p>' +
                solo_flex[h[2]] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Sunucu</p></div><div class="tip-footer"><p>' +
                servers[h[0]] + '</p></div></div><div class="ti-part' +
                l + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Tahmini Süre</p></div><div class="tip-footer"><p class="date-color">' +
                b.ct + ' Gün</p></div></div><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer">' +
                j + '</div></div><div class="ti-part"><div class="tip-header"><p>Fiyat</p></div><div class="tip-footer"><p class="price-color">' +
                a.price + ' ' + currency + '</p></div></div></div>';
            break;
        case 3:
            g = champions[b.from.split(',')[1]];
            r += '<div class="ti-content"><div class="ti-parts"><div class="ti-part"><div class="tip-header"><p>Nereden</p></div><div class="tip-footer"><p>' +
                d.from + '</p><div class="tip-image" style="background-image:url(/img/mtiers/tier' +
                b.from[0] + '.png)"></div></div></div><div class="ti-sep"><span class="icon-arrow-point-to-right"></span></div><div class="ti-part"><div class="tip-header"><p>Nereye</p></div><div class="tip-footer"><p>' +
                d.to + '</p><div class="tip-image" style="background-image:url(/img/mtiers/tier' +
                b.to[0] + '.png)"></div></div></div></div><div class="ti-part"><div class="tip-header"><p>Şampiyon</p></div><div class="tip-footer"><img class="tipf-champion" src="/img/hi/' +
                strTrim(g) + '.png"></div></div><div class="ti-part"><div class="tip-header"><p>Sunucu</p></div><div class="tip-footer"><p>' +
                servers[h[0]] + '</p></div></div><div class="ti-part' +
                l + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Tahmini Süre</p></div><div class="tip-footer"><p class="date-color">' +
                b.ct + ' Gün</p></div></div><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer">' +
                j + '</div></div><div class="ti-part"><div class="tip-header"><p>Fiyat</p></div><div class="tip-footer"><p class="price-color">' +
                a.price + ' ' + currency + '</p></div></div></div>';
            break;
        case 4:
            r += '<div class="ti-content"><div class="ti-parts"><div class="ti-part"><div class="tip-header"><p>Nereden</p></div><div class="tip-footer"><p>' +
                d.from + '</p><div class="tipf-img">' +
                b.from + '</div></div></div><div class="ti-sep"><span class="icon-arrow-point-to-right"></span></div><div class="ti-part"><div class="tip-header"><p>Nereye</p></div><div class="tip-footer"><p>' +
                d.to + '</p><div class="tipf-img">' +
                b.to + '</div></div></div></div><div class="ti-part"><div class="tip-header"><p>Sıra</p></div><div class="tip-footer"><p>' +
                solo_flex[h[2]] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Sunucu</p></div><div class="tip-footer"><p>' +
                servers[h[0]] + '</p></div></div><div class="ti-part' +
                l + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Tahmini Süre</p></div><div class="tip-footer"><p class="date-color">' +
                b.ct + ' Gün</p></div></div><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer">' +
                j + '</div></div><div class="ti-part"><div class="tip-header"><p>Fiyat</p></div><div class="tip-footer"><p class="price-color">' +
                a.price + ' ' + currency + '</p></div></div></div>';
            break;
        case 5:
            if (f[1]) {
                g = f[0] + ' ' + f[1];
                k = league_imgs[b.from[0]] + f[1].toLowerCase();
            } else {
                g = f[0];
                k = league_imgs[b.from[0]];
            }
            r += '<div class="ti-content"><div class="ti-parts"><div class="ti-part"><div class="tip-header"><p>Nereden</p></div><div class="tip-footer"><p>' +
                g + '</p><div class="tip-image" style="background-image:url(/img/' +
                k + '.png)"></div></div></div><div class="ti-sep"><span class="icon-arrow-point-to-right"></span></div><div class="ti-part"><div class="tip-header"><p>Nereye</p></div><div class="tip-footer"><p>' +
                d.to + '</p><div class="tipf-img">' +
                b.to[0] + '</div></div></div></div><div class="ti-part"><div class="tip-header"><p>Sıra</p></div><div class="tip-footer"><p>' +
                solo_flex[h[2]] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Sunucu</p></div><div class="tip-footer"><p>' +
                servers[h[0]] + '</p></div></div><div class="ti-part' +
                l + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Tahmini Süre</p></div><div class="tip-footer"><p class="date-color">' +
                b.ct + ' Gün</p></div></div><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer">' +
                j + '</div></div><div class="ti-part"><div class="tip-header"><p>Fiyat</p></div><div class="tip-footer"><p class="price-color">' +
                a.price + ' ' + currency + '</p></div></div></div>';
            break;
        case 6:
            r += '<div class="ti-content"><div class="ti-parts"><div class="ti-part"><div class="tip-header"><p>Nereden</p></div><div class="tip-footer"><p>' +
                f[0] + '</p><div class="tip-image" style="background-image:url(/img/' +
                league_imgs[b.from[0]] + '.png)"></div></div></div><div class="ti-sep"><span class="icon-arrow-point-to-right"></span></div><div class="ti-part"><div class="tip-header"><p>Nereye</p></div><div class="tip-footer"><p>' +
                d.to + '</p><div class="tipf-img">' +
                b.to + '</div></div></div></div><div class="ti-part"><div class="tip-header"><p>Mevcut LP</p></div><div class="tip-footer"><p>' +
                f[2] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>LP Artımı</p></div><div class="tip-footer"><p>' +
                f[1] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Sıra</p></div><div class="tip-footer"><p>' +
                solo_flex[h[2]] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Sunucu</p></div><div class="tip-footer"><p>' +
                servers[h[0]] + '</p></div></div><div class="ti-part' +
                l + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Tahmini Süre</p></div><div class="tip-footer"><p class="date-color">' +
                b.ct + ' Gün</p></div></div><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer">' +
                j + '</div></div><div class="ti-part"><div class="tip-header"><p>Fiyat</p></div><div class="tip-footer"><p class="price-color">' +
                a.price + ' ' + currency + '</p></div></div></div>';
            break;
        case 7:
            r += '<div class="ti-content"><div class="ti-parts"><div class="ti-part"><div class="tip-header"><p>Nereden</p></div><div class="tip-footer"><p>Koçluk</p><div class="tipf-img">-</div></div></div><div class="ti-sep"><span class="icon-arrow-point-to-right"></span></div><div class="ti-part"><div class="tip-header"><p>Nereye</p></div><div class="tip-footer"><p>' +
                d.to + '</p><div class="tipf-img">' +
                b.to + '</div></div></div></div><div class="ti-part"><div class="tip-header"><p>Tahmini Süre</p></div><div class="tip-footer"><p class="date-color">' +
                b.ct + ' Gün</p></div></div><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer">' +
                j + '</div></div><div class="ti-part"><div class="tip-header"><p>Satış Fiyatı</p></div><div class="tip-footer"><p class="price-color">' +
                a.price + ' ' + currency + '</p></div></div></div>';
            break;
    }
    return r;
}

function parseOrder(a) {
    var b, c, r;
    b = a.product_id;
    c = a.order_type;
    switch (c) {
        case 1:
            r = '<div class="table-item"><div class="ti-header"><div class="packet-cat"><div class="pc-img" style="background-image: url(/img/lolcats/' +
                packet_images[b] + '.png);"></div><p class="pc-header">' +
                packet_cats[b] + '</p></div></div>';
            r += parseBoost(a);
            break;
        default:
            r = '<div class="table-item"><div class="ti-header"><div class="packet-cat"><div class="pc-img" style="background-image: url(/img/lolcats/' +
                packet_images[18] + '.png);"></div><p class="pc-header">' +
                packet_cats[18] + '</p></div></div>';
            r += parseAccount(a);
            break;
        case 3:
            r = '<div class="table-item"><div class="ti-header"><div class="packet-cat"><div class="pc-img" style="background-image: url(/img/lolcats/' +
                packet_images[b] + '.png);"></div><p class="pc-header">' +
                packet_cats[b] + '</p></div></div>';
            r += parseTip(a);
            break;
        case 4:
            r = '<div class="table-item"><div class="ti-header"><div class="packet-cat"><div class="pc-img" style="background-image: url(/img/lolcats/' +
                packet_images[19] + '.png);"></div><p class="pc-header">' +
                packet_cats[19] + '</p></div></div>';
            r += parseCoaching(a);
            break;
    }
    return r;
}

function parseAccount(a) {
    var b, c;
    if (a.account_type) {
        c = accounts[a.account_type];
    } else {
        b = JSON.parse(a.details);
        c = accounts[b.account_type];
    }

    return '<div class="ti-content"><div class="ti-part"><div class="tip-header"><p>Kullanıcı Adı</p></div><div class="tip-footer"><p>' +
        (a.username ? a.username : '*****') + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Şifre</p></div><div class="tip-footer"><p>' +
        (a.password ? a.password : '*****') + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Sunucu</p></div><div class="tip-footer"><p>' +
        account_servers[c.server] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Tür</p></div><div class="tip-footer"><p class="date-color">' +
        account_types[c.type] + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer"><p>' +
        stateParser(order_states[a.order_state]) + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Fiyat</p></div><div class="tip-footer"><p class="price-color">' +
        a.price + ' ₺</p></div></div></div>';
}

function parseTip(a) {
    b = JSON.parse(a.details);
    return '<div class="ti-content"><div class="ti-part"><div class="tip-header"><p>Boost Numarası</p></div><div class="tip-footer"><p>' +
        b.boost_id + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Booster</p></div><div class="tip-footer"><p>' +
        b.booster + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer"><p>' +
        stateParser(order_states[a.order_state]) + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Bahşiş</p></div><div class="tip-footer"><p class="price-color">' +
        a.price + ' ₺</p></div></div></div>';
}

function parseCoaching(a) {
    return '<div class="ti-content"><div class="ti-part"><div class="tip-header"><p>Durum</p></div><div class="tip-footer"><p>' +
        stateParser(order_states[a.order_state]) + '</p></div></div><div class="ti-part"><div class="tip-header"><p>Bahşiş</p></div><div class="tip-footer"><p class="price-color">' +
        a.price + ' ₺</p></div></div></div>';
}