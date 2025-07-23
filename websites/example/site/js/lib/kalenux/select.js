function kalenuxSelect(a) {
    var b, c, d, e, f, g, h, j, k, i;
    e = document.createElement('div');
    e.className = 'kalenux-select';
    j = document.createElement('input');
    j.className = a.className;
    j.classList.remove('kalenux-selects');
    j.classList.add('kalenux-select-input');
    j.type = 'hidden';
    if (a.id) {
        j.id = a.id;
    }
    if (a.dataset.name) {
        j.name = a.dataset.name;
    }
    if (a.name) {
        j.name = a.name;
    }
    if (a.readonly) {
        j.readonly = a.readonly;
    }
    if (a.onchange) {
        j.onchange = a.onchange;
    }

    f = document.createElement('input');
    f.className = 'kalenux-search';
    f.type = 'text';
    f.onfocus = kalenuxSelectOpen.bind(null, e);
    if (a.dataset.placeholder) {
        f.setAttribute('placeholder', a.dataset.placeholder);
        delete a.dataset.placeholder;
    }
    if (a.dataset.data) {
        b = eval(a.dataset.data);
        if (b) {
            if (a.dataset.all) {
                d = document.createElement('option');
                d.value = a.dataset.all;
                d.innerHTML = 'Hepsi';
                a.appendChild(d);
            }
            if (a.dataset.cross) {
                for (c in b) {
                    d = document.createElement('option');
                    d.value = b[c];
                    d.innerHTML = c;
                    a.appendChild(d);
                }
            } else {
                for (c in b) {
                    d = document.createElement('option');
                    d.value = c;
                    d.innerHTML = b[c];
                    a.appendChild(d);
                }
            }

        }
    }
    delete a.dataset.data;
    g = Object.keys(a.dataset);
    for (h in g) {
        k = g[h];
        j.dataset[k] = a.dataset[k];
    }

    f.onkeydown = kalenuxSearch.bind(null, f);
    f.oninput = kalenuxSearch.bind(null, f);
    g = document.createElement('ul');
    g.className = 'kalenux-options';

    b = a.children;
    c = b.length;
    for (i = 0; i < c; i++) {
        d = b[i];
        h = document.createElement('li');
        h.className = 'kalenux-option';
        if (d.value) {
            h.dataset.value = d.value;
        } else {
            h.dataset.value = d.dataset.value;
        }
        h.innerHTML = d.innerHTML;
        h.onclick = kalenuxSelected.bind(null, h);
        g.appendChild(h);
    }
    e.appendChild(j);
    e.appendChild(f);
    e.appendChild(g);
    b = a.parentNode;
    b.appendChild(e);
    b.classList.add('loaded');
    a.remove();
    if (j.dataset.default) {
        kalenuxSelectOption(j.id, j.dataset.default);
    }

}

function kalenuxSelectReset(a) {
    var a, i, b;
    a = document.getElementById(a);
    a = a.nextElementSibling.nextElementSibling.children;
    b = a.length;
    for (i = 0; i < b; i++) {
        a[i].dataset.state = "";
    }
}

function kalenuxSelectEnable(a, b) {
    var c;
    a = document.getElementById(a);
    a = a.nextElementSibling.nextElementSibling.children;
    for (c in b) {
        a[b[c]].dataset.state = ""
    }
}

function kalenuxSelectDisable(a, b) {
    var c;
    a = document.getElementById(a);
    a = a.nextElementSibling.nextElementSibling.children;
    for (c in b) {
        a[b[c]].dataset.state = "disabled"
    }
}

function kalenuxSelectOpen(a) {
    a.classList.remove('closed');
    a.classList.add('opened');
}

function kalenuxSelectClose(a) {
    a.classList.remove('opened');
    a.classList.add('closed');
}

function kalenuxSelected(a) {
    var b, c, d, e, f, i;
    b = a.parentNode;
    c = b.children;
    d = c.length;
    for (i = 0; i < d; i++) {
        c[i].className = 'kalenux-option';
    }
    a.className = 'kalenux-option kalenux-option-selected';
    e = b.previousElementSibling;
    e.value = a.innerHTML;
    f = e.previousElementSibling;
    f.value = a.dataset.value;
    if (f.onchange) {
        f.onchange(f);
    }
    a = b.parentNode;
    kalenuxSelectClose(a);
    setTimeout(kalenuxSelectOpen.bind(null, a), 100);
}

function kalenuxSearch(a) {
    var b, c, d, e, f, g, i;
    b = a.nextElementSibling;
    c = b.children;
    d = c.length;
    g = a.value;
    f = g.toLowerCase();
    if (g == '') {
        for (i = 0; i < d; i++) {
            e = c[i];
            e.className = 'kalenux-option';
        }
    } else {
        for (i = 0; i < d; i++) {
            e = c[i];
            if (e.innerHTML.toLowerCase().indexOf(f) === -1) {
                if (e.className !== 'kalenux-option kalenux-option-selected') {
                    e.className = 'kalenux-option kalenux-option-hidden';
                }
            } else {
                e.className = 'kalenux-option';
            }
        }
    }
}

function kalenuxSelectOption(a, b) {
    var c, d, e, f, g, h, i;
    if (typeof a === 'string') {
        a = document.getElementById(a);
    }
    if (!a || (typeof b === 'undefined') || (b !== 0 && !b)) {
        return
    }
    c = a.nextElementSibling;
    if (!c) {
        console.log(a, b);
        return;
    }
    d = c.nextElementSibling;
    e = d.children;
    f = e.length;
    for (i = 0; i < f; i++) {
        g = e[i];
        h = g.dataset.value;
        if (h == b) {
            g.className = 'kalenux-option kalenux-option-selected';
            a.value = h;
            c.value = g.innerHTML;
            if (g.innerHTML.indexOf('<span') !== -1) {
                b = c.nextElementSibling.getElementsByClassName('kalenux-option-selected')[0];
                d = document.createElement('div');
                d.className = 'selected-flag';
                d.innerHTML = b.firstElementChild.outerHTML;
                c.replaceWith(d);
            }
        } else {
            g.className = 'kalenux-option';
        }
    }
}

function kalenuxFillSelect(a, b) {
    var c, d, e, f;
    a = document.getElementById(a);
    d = a.nextElementSibling.nextElementSibling;
    d.innerHTML = '';
    for (c in b) {
        e = b[c];
        f = document.createElement('li');
        f.className = 'kalenux-option';
        f.onclick = kalenuxSelected.bind(null, f);
        if (e.id) {
            f.dataset.value = e.id;
            f.innerHTML = e.name;
        } else {
            f.dataset.value = c;
            f.innerHTML = e;
        }
        d.appendChild(f);
    }
}

firer.push(function() {
    setElems('kalenux-selects', kalenuxSelect);
});