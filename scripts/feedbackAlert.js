/*
Adds functionality to show error messages in the placeholder ("alert_placeholder") beneath the navbar
*/

function showError(message) {
    var placeholder = $('#alert_placeholder');
    placeholder.html("");
    placeholder.append('<div class="alert alert-danger alert-dismissible fade in">' +
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">' +
        '&times;' +
        '</a>' +
        '<strong>Error! </strong>'
        + message +
        '. </div>');
}


function showSuccess(message) {
    var placeholder = $('#alert_placeholder');
    placeholder.html("");
    placeholder.append('<div class="alert alert-success alert-dismissible fade in">' +
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">' +
        '&times;' +
        '</a>' +
        '<strong>Success! </strong>'
        + message +
        '. </div>');
}