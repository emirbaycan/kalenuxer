__languages = ['!value!', ];

function redirectToHome() {
    if (navigator && navigator.language) {
        var a = navigator.language.split('-')[0];
        if (a && _languages[a]) {
            window.location.href = "/" + _languages[a] + "/";
            return false;
        }
    }
    window.location.href = "/tr";
}

redirectToHome();