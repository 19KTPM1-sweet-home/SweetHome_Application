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
                    // const newComment = res;
                    // var dateComment = new Date(newComment.createdAt);
                    // const template = `<li>
                    //     <div class="author-thumb">
                    //         <img src="${newComment.authorAvatar}" alt="author-avatar">
                    //     </div>
                    //     <div class="right-content">
                    //         <h4>${newComment.authorName}<span>${dateComment.toLocaleString('vi')}</span></h4>
                    //         <p class="text-dark">${newComment.content}</p>
                    //     </div>
                    // </li>`;
                    // $('.comment-list').prepend(template);

                    //$('.pagination-wrapper').pagination('destroy');
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