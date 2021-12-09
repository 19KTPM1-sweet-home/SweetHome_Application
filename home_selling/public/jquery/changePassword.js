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

    function img_pathUrl(input){
        $('#avatar')[0].src = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
    }
});