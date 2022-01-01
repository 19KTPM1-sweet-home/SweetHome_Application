// pagination for buy list
const propertiesPerPage = 6;




$(document).ready(function(){
  var pathname = window.location.pathname;
  const slug = pathname.split("/").at(-1);
  $(".buying-section .category a").removeClass("active");
  $(`.buying-section .category a[name='${slug}']`).addClass("active");})