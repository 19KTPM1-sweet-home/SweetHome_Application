$('input[name="confirm-password"]').on('input', function(event){
  const confirmPwd = event.target.value;
  const submitBtn = $('button[type="submit"]');
  const pwd = $('input[name="password"]').val();
  const msg = $('span[of="confirm-password"]');
  if(confirmPwd !== pwd){
    msg.text('Password does not match');
    submitBtn.attr('disabled',true);
  }
  else{
    msg.text('');
    submitBtn.removeAttr('disabled');
  }
});