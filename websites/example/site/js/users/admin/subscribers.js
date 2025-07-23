var getter = 'subscriber';

firer.push(function() {
    $('#add_created_at').datepicker();
    $('#edit_created_at').datepicker();
})

function getActions(id) {
    return '<button data-id="' + id + '" class="btn btn-edit" onclick="startAction(this)" data-action="edit_' + getter + '" data-after="getSet()"><span class="icon-edit"></span></button><button data-id="' + id + '" class="btn btn-del" onclick="del(this)"><span class="icon-delete"></span></button>';
}

function getMails() {
    postJSON(user_api_url + 'get/mails', function(a) {
        if (a.result === 1) {
            data = a.data;
            text = [];
            for (item in data) {
                item = data[item];
                text.push(item.email);
            }
            text = text.join(',');
            document.getElementById('all_mails').value = text;
        }
    }, { start: 0, limit: 999999 })
}

function showMails() {
    document.getElementById('mails').dataset.state = "open";
    getMails();
}

function copyMails() {
    navigator.clipboard.writeText(document.getElementById('all_mails').value);
}

function sendSMS() {
    postJSON(user_api_url + 'add/sms', function(a) {
        if (a.result === 1) {
            good();
        } else {
            error();
        }
    }, { sms: document.getElementById('message').value })

}