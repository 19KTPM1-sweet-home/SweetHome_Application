$(window).on('load', () => {
    $('#newPassword, #repeatNewPassword').on('keyup', function () {
      if ($('#newPassword').val() == $('#repeatNewPassword').val()) {
        $('#message').html('Matching').css('color', 'green');
        $('#passwordSubmit').removeAttr("disabled");
      } else {
        $('#passwordSubmit').attr("disabled", "disabled");
        $('#message').html('Not Matching').css('color', 'red');
      }
    });
});