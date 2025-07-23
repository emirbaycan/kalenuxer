document.body.onload = function() {
    if (document.getElementById('preloader')) {
        document.getElementById('preloader').dataset.state = "";
        document.body.className = '';
    }
    var a, i;
    a = firer.length
    for (i = 0; i < a; i++) {
        if (firer[i])
            firer[i]();
    }
    firer = null;
}