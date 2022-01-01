// pagination for buy list
const propertiesPerPage = 6;

loadProperties()
  .then((propertiesLoaded)=>{
    console.log(propertiesLoaded)
    // init pagination
    $('#property-pagination-wrapper').pagination(
      {
        dataSource:propertiesLoaded,
        pageSize:propertiesPerPage,
        callback: function(data,pagination){
          displayPropertyPerPage(data);
        }
      }
    )
  })


$(document).ready(function(){
  var pathname = window.location.pathname;
  const slug = pathname.split("/").at(-1);
  $(".buying-section .category a").removeClass("active");
  $(`.buying-section .category a[name='${slug}']`).addClass("active");})