$(window).on('load', function () {
    // Rquest a tour btn => Open request a tour modal
    $(".request-tour-btn").on('click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#requestTourModal').modal('show');
        $('#requestTourForm').show();
        $('.success-tab').hide();
    });

    // Clear form input and close request tour modal when click cancel button
    $("#requestTourModal .cancel-form-btn").on('click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $("#requestTourForm")[0].reset();
        $('#requestTourModal').modal('hide');
    });

    $(".add-message-btn").on('click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $(this).css("display", "none");
    });

    // Close login confirm modal when click cancel button
    $("#loginConfirmModal .hide-login-confirm-btn").on('click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#loginConfirmModal').modal('hide');
    });

    // Request tour form submit event
    $( "#requestTourForm" ).on('submit', function( event ) {
        event.preventDefault();

        var formData = $('#requestTourForm').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        const origin = window.location.origin + window.location.pathname;
        $.ajax({
            type: "POST",
            url: origin + '/request-tour',
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(res){
                if(res.appointmentDate) {
                    $('#requestTourForm').hide();
                    $('.success-tab').show();
                    $('.requested-date p').html(res.appointmentDate);
                }
                else if(res.ack == 'redirect') {
                    $('#loginConfirmModal').modal('show');
                    $('#loginConfirmModal a').attr("href", window.location.origin + '/login');
                }
                
                
            }
        });
    });
});