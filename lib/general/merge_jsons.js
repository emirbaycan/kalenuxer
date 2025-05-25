function mergeTwoArray(a, b) {
    var c = {},
        d = [],
        e = a.length,
        i;
    for (i = 0; i < e; i++) {
        if (b[i]) {
            d.push(mergeTwoJSON(a[i], b[i]));
        }
    }
    return d;
}

export function mergeTwoJSON(a, b) {
    var c, d;
    for (c in b) {
        if (typeof a[c] !== "undefined") {
            if (typeof a[c] === "object" && typeof b[c] === "object") {
                if (a[c].length && b[c].length) {
                    a[c] = mergeTwoArray(a[c], b[c]);
                }
                for (d in b[c]) {
                    if (typeof a[c][d] !== "undefined" && typeof a[c][d] !== 'string') {
                        if (typeof a[c][d] === "object" &&
                            typeof b[c][d] === "object" &&
                            a[c][d].length &&
                            b[c][d].length) {
                            a[c][d] = mergeTwoArray(a[c][d], b[c][d]);
                        } else {
                            a[c][d] = mergeTwoJSON(a[c][d], b[c][d]);
                        }
                    } else {
                        a[c][d] = b[c][d];
                    }
                }
            } else {
                a[c] = b[c];
            }
        } else {
            a[c] = b[c];
        }
    }
    return a;
}

export function mergeJSONs(a) {
    var m, b, i;
    m = [];
    b = a.length;
    for (i = 0; i < b; i++) {
        if (i % 2 === 0) {
            if (a[i + 1]) {
                m.push(mergeTwoJSON(a[i], a[i + 1]));
            } else {
                m.push(a[i]);
            }
        }
    }
    if (m.length > 2) {
        return mergeJSONs(m);
    } else if (m.length === 2) {
        return mergeTwoJSON(m[0], m[1]);
    }
    return m[0];
}