
  $(window).on('load', function () {
    const defaultTotalPages = 10;
    // pagination for buy list
    const propertiesPerPage = 6;
  //default sorting
  $('.sort-by li:nth-child(3)').addClass('active');
  // category
  var pathname = window.location.pathname;
  const slug = pathname.split("/").at(-1);
  $(".buying-section .category a").removeClass("active");
  $(`.buying-section .category a[name='${slug}']`).addClass("active");


  $('.sort-by li').click(function(){
    if($(this).hasClass('active')){}
    else{
      $('.sort-by li').removeClass('active');
      $(this).addClass('active');
      console.log($('#property-pagination-wrapper').pagination('getCurrentPage'));
      loadPropertiesAtBuyList($('#property-pagination-wrapper').pagination('getCurrentPage'));
    }
  })
  $('.checkbox-list li>input').click(function(){

    $(this).parent().toggleClass("active");
    loadPropertiesAtBuyList(1);
    if($(this).is(':checked')){
      $(this).prop('checked', true);
    }
    else{
      $(this).prop('checked', false);
    }
    const indexTitles = $(this).parents('.filter_group').index();
    const chosen = $(this).parents('.filter_group').find('li.active');
    if(chosen.length>0){
      const textFilter = [];
      chosen.each(function(){
        const textVal = $(this).find('label').html();
        textFilter.push(textVal);
      });
      const tags = textFilter.join(',');
      const filter_tags = $('.filter_tags:eq('+indexTitles+') b');
      filter_tags.html(tags).parent().addClass('opened');
      if($('.filter_tags:not(.filter_tags_remove_all).opened').length > 1){
        $('.filter_tags_remove_all').addClass('opened');
      }
    }
    else{
      $('.filter_tags:eq('+indexTitles+') b').html('').parent().removeClass('opened');
      $('.filter_tags_remove_all').removeClass('opened');
    }
  })
  $('.filter_tags_removed').click(function(){
    $(this).parent().removeClass('opened').find('b').html();
    const indexClick = $(this).parent().index();
    $('.filter_group:eq('+indexClick+') li.active input').prop('checked', false);
    $('.filter_group:eq('+indexClick+') li.active').removeClass('active');

    if($('.filter_tags:not(.filter_tags_remove_all).opened').length === 1){
      $('.filter_tags_remove_all').removeClass('opened');
    }
    loadPropertiesAtBuyList(1);
  })
  $('.filter_tags_remove_all').click(function(){
    $('.filter_group li.active input').prop('checked',false);
    $('.filter_group li.active').removeClass('active');
    $('.filter_tags b').html('').parent().removeClass('opened');
    $('.filter_tags_remove_all').removeClass('opened');
    loadPropertiesAtBuyList(1);
  })
  function initPagination() {
    $('#property-pagination-wrapper').pagination({
      items: defaultTotalPages,
      itemsOnPage: propertiesPerPage,
      onInit: loadPropertiesAtBuyList(1),
      onPageClick: function (currentPage) {
        $(this).removeAttr("href");
        loadPropertiesAtBuyList(currentPage);
      }
    })
  }
//configure pagination
  initPagination();
})
