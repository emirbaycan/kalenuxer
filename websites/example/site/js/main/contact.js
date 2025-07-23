function sendMessage(event, form) {
    event.preventDefault();
    var data = {
        fullname: form.fullname.value,
        email: form.email.value,
        phone: form.phone.value,
        subject: form.subject.value,
        message: form.message.value,
    }

    if (!form.kvkk.checked) {
        setStatus("contact_state", errors.kvkk_agreement, false);
        return false;
    }
    if (!form.privacy_agreement.checked) {
        setStatus("contact_state", errors.privacy_agreement, false);
        return false;
    }
    if (!form.new_list_agreement.checked) {
        setStatus("contact_state", errors.new_list_agreement, false);
        return false;
    }

    postJSON(main_api_url + 'add/message', function(a, d) {
        var result, valid,
            message = false;
        result = a.result;
        switch (result) {
            case 1:
                valid = true;
                message = valids.message_submited;
                var e = Array.prototype.slice.call(d.form.getElementsByTagName('input'));
                if (e.length) {
                    var f = Array.prototype.slice.call(d.form.getElementsByTagName('textarea'));
                    if (f.length) {
                        e = e.concat(f);
                    }
                    clearValues(e);
                }
                break;
            case -1:
                message = errors.duplicate_user;
                break;
            case -2:
                message = errors.time_limit;
                break;
            case -3:
                message = errors.time_limit_exceed;
                break;
            default:
                message = errors.try_again;
                break;
        }
        setStatus('contact_state', message, valid);
    }, data, { form: form });
    return false;
}