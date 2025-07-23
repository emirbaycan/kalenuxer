function validMail(e) {
    var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(e).toLowerCase());
}

function validLogin(a) {
    return a == "" ? false : true;
}

function validPassword(a) {
    return a == "" ? false : true;
}

function getLogin() {
    var a = getCookie(site + '_account_infos');
    if (!a) {
        return false;
    }
    a = a.split(',');
    return {
        username: a[0],
        img: a[1],
        rank: a[2],
        user_id: a[3],
        email: a[4]
    }
}

function clearLogin() {
    eraseCookie(site + '_account_infos ');
    user_id = false;
}

function logout() {
    socialLogout();
    asyncGet(general_api_url + 'do/logout', function(a) {
        clearLogin();
        location.href = '/';
    });
}

function login(event, form) {
    event.preventDefault();
    var a, b;
    a = form.username.value;
    if (!validLogin(a)) {
        setStatus("log_status", errors.login_username_error, false);
        return;
    }
    b = form.password.value;
    if (!validPassword(b)) {
        setStatus("log_status", errors.auth_password_error, false);
        return;
    }

    var data = {
        username: a,
        password: b,
    };

    postJSON(general_api_url + "do/signin",
        function(a) {
            var result, valid,
                message = false;
            result = a.result;
            switch (result) {
                case 1:
                    setLogin(a);
                    valid = true;
                    message = valids.logged;
                    break;
                case -2:
                    message = errors.time_limit;
                    break;
                case -3:
                    message = errors.time_limit_exceed;
                    break;
                case -4:
                    message = errors.check_your_infos;
                    break;
                default:
                    message = errors.try_again;
                    break;
            }
            setStatus('log_status', message, valid);
        },
        data
    );
    return false;
}

firer.push(function() {
    setEvent('onclick', 'copen', copen);
})