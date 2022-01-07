

  const defaultTotalPages = 10;
  // pagination for buy list
  const propertiesPerPage = 6;
  const loadProperties = (currentPage)=>{
    return new Promise((resolve, reject) => {
      const category = pathname.split('/').at(-1);
      const sortOption = $('.sort-by li.active').find('span').data('sort-by');
      const priceFilter = [];
      $('.filter-price ul.checkbox-list li.active').each(function(){
        const price_min = $(this).find('input').data('price-min');
        let price_max = $(this).find('input').data('price-max');
        if(price_max === Infinity){
          price_max = "Infinity";
        }
        const price = {
          min: price_min,
          max: price_max
        };
        priceFilter.push(price);
      })
      const rateFilter = [];
      $('.filter-ratings ul.checkbox-list li.active').each(function(){
        const rate = $(this).find('input').data('rate');
        rateFilter.push(rate);
      })
      const key = searchBar.val();
      console.log(key);
      filterProperties({categoryFilter:category,priceFilter:priceFilter,rateFilter:rateFilter,sortBy:sortOption,keySearch:key,currentPage})
        .then((data)=>{
          resolve(data)
        })
    })
  }

  const loadPropertiesAtBuyList = (currentPage)=>{
      loadProperties(currentPage)
        .then((data) => {
          const propertiesLoaded = data.properties;
          const count = data.count;
          showPagination();
          if(propertiesLoaded.length===0){
            displayNoResults($('#content .buying-section .content'));
            hidePagination();
          }
          else{
            displayPropertyPerPage(propertiesLoaded);
            $(".property-rating").each(function(index){
              $(this).starRating({
                initialRating:$(this).data('rating'),
                readOnly:true,
                starSize:20,
              })
            })
            $('#property-pagination-wrapper').pagination('updateItems',count);
          }

        })

  }
  $(window).on('load', function () {
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
