$(function(){

    var credentials = {
      sb_version  : 1,
      sb_username : 'signalboxdemo',
      sb_app_name : 'feedback'
    };

    $.ajaxSetup({
      cache       : false,
      dataType    : "json",
      beforeSend  : function(xhr, settings) {
        settings.url += '?' + $.param(credentials);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
      }
    });

    $('#feedback-form').submit(function() {
      var data = {
        message : $("textarea[name=message]").val(),
        email   : $("input[name=email]").val()
      };

      postFeedback(data);

      return false;
    });

    var $error = $('#error-message').hide();

    function postFeedback(data) {
      var onSuccessHandler = function(response) {
        $error.hide();

        $('#content').html("Thanks for your feedback!");
      };

      var onErrorHandler = function(xhr) {
        $error.hide();

        if (xhr.status == 422) {
          $error.html('Oops. Please supply a message and a valid email.').show();
        }
        else {
          alert(JSON.parse(xhr.responseText).message);
        }
      };

      $.ajax({
        url     : 'http://api.getsignalbox.com/resources/items',
        type    : 'POST',
        data    : JSON.stringify(data),
        success : onSuccessHandler,
        error   : onErrorHandler
      });
    };

});
