
function post(path, params, method='post') {
  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}
$('.blog-post .favourite-btn').on( 'click', function (e) {
  const favouriteBtn = $('.favourite-btn');

  const propertyId = favouriteBtn.attr('value');
  if(!favouriteBtn.hasClass('press')){

    $.ajax({
      type:'POST',
      url:origin+'/detail/favourite/add',
      contentType: "application/json",
      data: JSON.stringify({ propertyId }),
      success: function (ack){
        if(ack==='success'){
          favouriteBtn.addClass('press');
        }
        else if(ack==='not-login'){
          window.location.replace(window.location.origin + '/login');
        }
        else if(ack==='existed'){

        }
      }
    })
  }
  else{
    $.ajax({
      type:'POST',
      url:origin+'/detail/favourite/remove',
      contentType: "application/json",
      data: JSON.stringify({ propertyId }),
      success: function (ack){
        if(ack==='success'){
          favouriteBtn.removeClass('press');
        }
        else if(ack==='not-login'){

        }
        else if(ack==='existed'){

        }
      }
    })
  }
})