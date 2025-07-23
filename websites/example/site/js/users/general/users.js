firer.push(function() {
    if (document.getElementById("username")) {
        setInner("username", username);
    }

    if (user_id) {
        firer.push(function() {
            getNotifications();
            int_get_notifications = setInterval(getNotifications, 1 * 60 * 1000);
        });
    }

    if (document.getElementById("user_image")) {
        document.getElementById("user_image").style =
            "background-image:url(" + user_image + ")";
    }
});

function getInputs(a) {
    var b, c, r, i;
    a = a.getElementsByClassName("kalenux-change");
    b = a.length;
    r = {};
    for (i = 0; i < b; i++) {
        c = a[i];
        if (c.dataset.change != 1) {
            return false;
        }
        if (c.type === "checkbox") {
            r[c.dataset.name] = c.checked ? 1 : 0;
        } else {
            r[c.dataset.name] = c.value;
        }
    }
    if (typeof setSpecial !== 'undefined') {
        r = setSpecial(r);
    }
    return r;
}

function tableSwitch(elem) {
    var data = {
        id: elem.dataset.id,
    };
    data[elem.dataset.name] = elem.checked ? 1 : 0;
    postJSON(
        user_api_url + elem.dataset.url,
        function(a) {
            if (a.result === 1) {
                good();
            }
        },
        data
    );
}

function setActionPopup(a) {
    popup_action = popup_actions[a.dataset.action];
    var b = popup_action.action;
    setPopup({
        dataset: a.dataset,
        text: popup_action.text,
        actions: [{
                text: b.text,
                icon: b.icon,
                onclick: doit,
            },
            {
                text: "Hayır",
                icon: "icon-no",
                onclick: closePopup,
            },
        ],
    });
    popup = document.getElementById("popup");
}

function doit() {
    var data, d;
    data = {};
    d = popup_action.action;
    if (d.send) {
        var a, b, c;
        a = d.send;
        for (b in a) {
            c = a[b];
            if (popup.dataset[c]) {
                data[c] = popup.dataset[c];
            }
        }
    }
    postJSON(
        user_api_url + d.url,
        function(a) {
            if (a.result == 1) {
                closePopup();
                good(popup_action.results[1]);
                filterTable();
            } else {
                error(popup_action.results.e);
            }
        },
        data
    );
}

function panelHeaderMenu(data, holder) {
    var a, b, g;
    if (!document.getElementById(holder)) {
        return;
    }
    a = document.createElement('div');
    a.className = 'menu-down';

    function getHeaderAction(a) {
        var g = document.createElement('a');
        g.className = 'header-action';
        g.href = a.url;
        g.innerHTML = a.text;
        return g;
    }

    for (b in data) {
        a.appendChild(getHeaderAction(data[b]));
    }

    g = document.createElement('button');
    g.innerHTML = 'Çıkış Yap';
    g.className = 'header-action';
    g.onclick = logout;
    a.appendChild(g);
    document.getElementById(holder).appendChild(a);
}

firer.push(function() {
    setEvent("onclick", "copen", copen);
    setEvent("onchange", "kalenux-change", setChanged);
    if (!user_id) {
        logout();
    }

    if (user_id) {
        //setE(panelHeaderMenu, general_header_menu, "general_header_menu");
    }
});