function setPopup(e) {
    var t, n, a, l, c, d, o, i, p, s, m, r, u, E;
    if (document.getElementById("popup") && document.getElementById("popup").remove(), (t = document.createElement("div")).className = "popup", t.id = "popup", t.dataset.state = "open", e.dataset)
        for (a in n = e.dataset) t.dataset[a] = n[a];
    if ((n = document.createElement("div")).className = "popup-close", n.onclick = closePopup, n.dataset.the = "popup", (a = document.createElement("div")).className = "popup-inner", (l = document.createElement("div")).className = "pop-header", (c = document.createElement("p")).innerHTML = e.text, l.appendChild(c), a.appendChild(l), e.actions) {
        for ((d = document.createElement("div")).className = "pop-footer", i = (o = e.actions).length, p = 0; p < i; p++) s = o[p], m = document.createElement("button"), 0 === p && (E = m), m.className = "ti-actions", s.onclick && (m.onclick = s.onclick), s.icon && ((r = document.createElement("span")).className = s.icon, m.appendChild(r)), s.text && ((u = document.createElement("p")).innerHTML = s.text, m.appendChild(u)), d.appendChild(m);
        a.appendChild(d)
    }
    t.appendChild(n), t.appendChild(a), document.body.appendChild(t), E && E.focus()
}

function closePopup() { document.getElementById("popup").dataset.state = "" }

function setAlert(e) {
    var t, n, a, l, c, d, o, p, s;
    if (document.getElementById("kalenux_alert") && document.getElementById("kalenux_alert").remove(), (t = document.createElement("div")).className = "kalenux-alert", t.id = "kalenux_alert", t.dataset.state = "open", e.dataset)
        for (a in n = e.dataset) t.dataset[a] = n[a];
    if (e.inner) {
        for (d in (a = document.createElement("div")).className = "kalenux-alert-header", l = e.inner)(d = l[d]) && ((c = document.createElement("span")).className = "kalenux-alert-icon " + d.icon, a.appendChild(c)), d && ((c = document.createElement("p")).className = "kalenux-alert-text", c.innerHTML = d.text, a.appendChild(c));
        t.appendChild(a)
    }
    if (e.actions) {
        for ((l = document.createElement("div")).className = "kalenux-alert-actions", p = (o = e.actions).length, i = 0; i < p; i++) c = o[i], d = document.createElement("button"), 0 === i && (s = d), d.className = "kalenux-alert-action", d.onclick = c.action, d.innerHTML = c.text, l.appendChild(d);
        t.appendChild(l)
    }
    document.body.appendChild(t), e.timer && (alert_close_interval = setInterval(closeAlert, e.timer)), s && s.focus()
}

function closeAlert() { document.getElementById("kalenux_alert").dataset.state = "", "undefined" != typeof alert_close_interval && clearInterval(alert_close_interval) }