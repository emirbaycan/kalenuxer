var getter = 'order';

firer.push(function() {
    $('#edit_created_at').datepicker();
})

function getActions(id) {
    return '<button data-id="' + id + '" class="btn btn-edit" onclick="startAction(this)" data-action="edit_' + getter + '" data-after="getSet()"><span class="icon-edit"></span></button><button data-id="' + id + '" class="btn btn-del" onclick="del(this)"><span class="icon-delete"></span></button>';
}

function del(elem) {
    postJSON(user_api_url + 'del/' + getter, function(a, b) {
        if (a.result === 1) {
            b.elem.parentNode.parentNode.remove();
        }
    }, { id: elem.dataset.id }, { elem: elem })
}

function setPaid(a) {
    if (a == 1) {
        return 'Ödendi';
    } else {
        return '-'
    }
}

function setSubscribe(a) {
    if (a == 1) {
        return 'Abone';
    } else {
        return '-'
    }
}