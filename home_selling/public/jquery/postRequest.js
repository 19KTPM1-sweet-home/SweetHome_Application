$(window).on('load', () => {
    const origin = window.location.origin;

    // Update user password
    $( "#passwordForm" ).submit(function( event ) {
        event.preventDefault();
        var formData = $('#passwordForm').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        $.ajax({
            type: "POST",
            url: origin + "/profile/edit/password",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(res){
                console.log(res)
                if(res == "wrong-password")
                    $('.password-error').css("display","block");
                else if(res == "success") {
                    alert("Change password successfully!");
                    window.location.reload();
                }
            }
        });
    });


    
});