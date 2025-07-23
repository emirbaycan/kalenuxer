var getter = 'comment';

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

function parseMedia(a, b) {
    if (a != 0) {
        return '<div class="kt-image" style="background-image:url(' + a + ')"></div>';
    } else {
        return '<div class="kt-video"><video controls><source src="' + b + '" type="video/mp4"></source></video></div>';
    }
}

function getCategories() {
    comment_categories = {};
    postJSON(user_api_url + 'get/comment_categories', function(a) {
        if (a.result === 1) {
            data = a.data;
            for (item in data) {
                item = data[item];
                comment_categories[item.id] = item.header;
            }
            kalenuxFillSelect('edit_category', comment_categories);
            kalenuxFillSelect('add_category', comment_categories);
        }
    }, { start: 0, limit: 999999 })
}

firer.push(function() {
    getCategories();
})