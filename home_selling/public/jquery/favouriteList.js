const origin = window.location.origin;
// remove from favourite list
$('.fav-property-container .remove-button').on('click', function(e){
  e.preventDefault();
  const propertyId = e.target.getAttribute('id-property');
  $.ajax({
    type: "POST",
    url: origin + "/favourite-list/remove",
    contentType: "application/json",
    data: JSON.stringify({propertyId}),
    success:function(res){
      if(res==='success'){
        const sections = $('section.favourite-section');
        for(const section of sections){
          if(section.getAttribute('of')===propertyId){
            section.remove();
          }
        }
      }
    }

  })
})