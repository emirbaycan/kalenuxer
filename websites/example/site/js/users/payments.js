function parsePaid(paid) {
    if (paid) {
        return '<font class="valid-color">Ödendi</font>';
    } else {
        return '<font class="date-color">Ödeme Bekleniyor</font>';
    }
}