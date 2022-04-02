$(window).on('load', function () {
    
    if( $('.tour-list').children().length > 0 ) {
        // If there are upcoming tours => show tour list and hide no-tour-tile
        $('.card-container-custom .container').show();
        $('.card-container-custom .no-tour-title').hide();
    }
    else {
        $('.card-container-custom .container').hide();
        $('.card-container-custom .no-tour-title').show();
    }

    // ------- DELETE MODAL EVENT --------
    // Open delete modal
    $('.cancel-tour-btn').on( 'click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#deleteModal').modal('show');
        $('#delete-modal-yes-btn').val($(this).parent().children('.home-tour-id').val()); // passing id of home tour to be deleted to the button
    });

    // Close delete modal
    $('#delete-modal-no-btn').on( 'click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#deleteModal').modal('hide');
    });

    // Close delete modal
    $('#exitDeleteModalBtn').on( 'click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#deleteModal').modal('hide');
    });

    // Delete home tour
    $('#delete-modal-yes-btn').on( 'click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#deleteModal').modal('hide');

        const homeTourId = $(this).val(); // Get id of home tour to be deleted

        const origin = window.location.origin + window.location.pathname;
        $.ajax({
            type: "DELETE",
            url: origin + "cancel/" + homeTourId,
            processData: false,
            contentType: false,
            success: function(res){
                if(res == 'success') {
                    // Delete home tour on UI side
                    const homeTourDeleted = ".home-tour-id[value='" + homeTourId + "']";
                    $(homeTourDeleted).parent().remove();
                    if($('.tour-list').children().length == 0 ) {
                        $('.card-container-custom .container').hide();
                        $('.card-container-custom .no-tour-title').show();
                    }
                }
            }
        });
    });
});