// pagination for buy list
const propertiesPerPage = 6;
const loadProperties = ()=>{
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
    filterProperties({categoryFilter:category,priceFilter:priceFilter,rateFilter:rateFilter,sortBy:sortOption})
      .then((data)=>{
        resolve(data)
      })
  })
}
const loadPropertiesAtBuyList = ()=>{
  if(isBuyListPage) {
    loadProperties()
      .then((propertiesLoaded) => {
        showPagination();
        if(propertiesLoaded.length===0){
          displayNoResults($('#content .buying-section .content'));
          hidePagination();
        }
        else{
          // init pagination
          $('#property-pagination-wrapper').pagination(
            {
              dataSource: propertiesLoaded,
              pageSize: propertiesPerPage,
              callback: function(data, pagination) {
                displayPropertyPerPage(data);
                $(".property-rating").each(function(index){
                  $(this).starRating({
                    initialRating:$(this).data('rating'),
                    readOnly:true,
                    starSize:20,
                  })

                })
              }
            }
          )
        }
      })
  }
}


$(document).ready(function(){
  //default sorting
  $('.sort-by li:nth-child(3)').addClass('active');
  loadPropertiesAtBuyList();
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
      loadPropertiesAtBuyList();
    }
  })
  $('.checkbox-list li>input').click(function(){

    $(this).parent().toggleClass("active");
    loadPropertiesAtBuyList();
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
    loadPropertiesAtBuyList();
  })
  $('.filter_tags_remove_all').click(function(){
    $('.filter_group li.active input').prop('checked',false);
    $('.filter_group li.active').removeClass('active');
    $('.filter_tags b').html('').parent().removeClass('opened');
    $('.filter_tags_remove_all').removeClass('opened');
    loadPropertiesAtBuyList();
  })

})