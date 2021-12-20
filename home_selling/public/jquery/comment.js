$(window).on('load', () => {
    // Post user comment
    $( "#commentForm" ).on('submit', function( event ) {
        event.preventDefault();

        var formData = $('#commentForm').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        const origin = window.location.origin + window.location.pathname;
        $.ajax({
            type: "POST",
            url: origin + '/comments',
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(res){
                if(res != 'redirect') {
                    // Empty text area when submitted
                    $('#commentContent').val("");
                    $('.pagination-wrapper').pagination('drawPage', 1);
                    loadCommentPerPage(1);
                }
                else
                    window.location.replace(window.location.origin + '/login');
            }
        });
    });


    
});