// --------------DEFAULT VALUE OF PAGINATION-----------------
const commentPerPage = 5;
const defaultTotalPages = 10;

function loadCommentPerPage(currentPage) {
    const origin = window.location.origin + window.location.pathname;
    const url = origin + '/comments/' + currentPage.toString();
    console.log(url);
    $.get(url, function (data) {
        var template = Handlebars.compile(`<div class="sidebar-heading num-of-comment">
            <h2>{{commentData.numOfComment}} comments</h2>
        </div>
        <div class="content">
            <ul class="d-flex flex-column comment-list">
                {{#each commentData.comments}}
                <li>
                    <div class="author-thumb">
                        <img src="{{#if this.authorAvatar}}{{this.authorAvatar}}{{else}}https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png{{/if}}" alt="">
                    </div>
                    <div class="right-content">
                        <h4>{{this.authorName}}<span>{{this.createdAt}}</span></h4>
                        <p class="text-dark">{{this.content}}</p>
                    </div>
                </li>
                {{/each}}
            </ul>
        </div>`);

        $('.comments').html(template({commentData: data}));

        // Update total properties in every get request
        if(data.numOfComment <= commentPerPage)
            $('.pagination-wrapper').css("display", "none");
        else
            $('.pagination-wrapper').pagination('updateItems', data.numOfComment);

    });
}

function initPagination() {
    $('.pagination-wrapper').pagination({
        items: defaultTotalPages,
        itemsOnPage: commentPerPage,
        onInit: loadCommentPerPage(1), // Load 1st page when detail page is loaded 
        onPageClick: function (currentPage) {
            $(this).removeAttr("href");
            loadCommentPerPage(currentPage);
        }
    });
}

$(window).on('load', function () {
    //configure pagination
    initPagination();
});

