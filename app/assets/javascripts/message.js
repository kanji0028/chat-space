$(function(){
  function buildHTML(message){
    image = (message.image) ? `<img class= "message__text__image" src=${message.image} >` : "";

    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                    ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                    ${message.date}
                    </div>
                    </div>
                    <div class="message__text"></div>
                    <p class="message__text__content">
                    ${message.content}
                    </p>
                    ${image}
                  </div>`
    return html;
  }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $('.submit-btn').removeAttr('data-disable-with');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({
          scrollTop: $('.messages')[0].scrollHeight
        }, 'fast');
        $("#new_message")[0].reset();
      })
      .fail(function(){
        alert("error");
    })
  })
});