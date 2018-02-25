$(function () {

    $('#js-form').validate({

        rules: {
            formName: {
                required: true
            },
            formEmail: {
                required: true,
                email: true
            },
            formMessage: {
                required: true,
                maxlength:800
            }
        },
        focusCleanup: true,
        focusInvalid: false
    });
})