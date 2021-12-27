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

        const homeTourId = $('.home-tour-id').val();

        const origin = window.location.origin + window.location.pathname;
        $.ajax({
            type: "DELETE",
            url: origin + "cancel/" + homeTourId,
            processData: false,
            contentType: false,
            success: function(res){
                if(res == 'success') {
                    // Delete home tour on UI side
                    const homeTourDeleted = ".home-tour-id[value='" + homeTourId + "']"
                    console.log(homeTourDeleted)
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