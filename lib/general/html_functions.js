function trtoUtf8(a) {
    return a.replace(/[şŞ]/g, 's').replace(/[ıİi̇]/g, 'i').replace(/[öÖ]/g, 'o').replace(/[üÜ]/g, 'u').replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g').replace(/ii/g, 'i').replace(/ /g, '-');
}

export default {
    setUrl: function(a) {
        return trtoUtf8(a.toLocaleLowerCase());
    },
    setPhone: function(a) {
        return a.split(/[ ()]*/g).join('');
    },
    setAddress: function(a) {
        return a.replace(/\//g, ' ').replace(/<br>/g, ' ');
    }
}