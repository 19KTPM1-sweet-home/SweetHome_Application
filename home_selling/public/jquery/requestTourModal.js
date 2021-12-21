$(window).on('load', function () {
    // Rquest a tour btn => Open request a tour modal
    $(".request-tour-btn").on('click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#requestTourModal').modal('show');
    });

    // Clear form input and close add new property modal when click cancel button
    $(".cancel-form-btn").on('click', function (e) { 
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
});