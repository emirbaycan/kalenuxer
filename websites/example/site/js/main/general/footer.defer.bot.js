firer.push(function() {
    var selected_language = getCookie(site + "_language");
    if (selected_language === language && typeof kalenuxSelectOption !== 'undefined') {
        kalenuxSelectOption('languages', language);
    } else if (selected_language && selected_language !== language) {
        if (languages[selected_language]) {
            location.href = '/' + selected_language + '/';
        }
    }
});