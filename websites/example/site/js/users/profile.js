function updateProfile() {
    var a, data;
    a = document.getElementById('profile_container')
    var data = getChanges(a);
    if (data === 0) {
        return;
    }
    postJSON(user_api_url + 'update/profile', function(a, b) {
        if (a.result === 1) {
            clearChanges(b.b);
            good();
            if (a.username) {
                b = getLogin();
                b.username = a.username;
                setLogin(b)
            }
            if (a.img) {
                b = getLogin();
                b.img = a.img;
                setLogin(b)
            }
        } else {
            error('Lütfen değiştirdiğiniz bilgileri kontrol ediniz');
        }
    }, data, { b: a });
}

firer.push(function() {})