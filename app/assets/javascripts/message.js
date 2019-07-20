$(function(){
  function buildHTML(message){
    var content = (message.content) ? `${message.content} ` : "";
    var image = (message.image) ? `<img class= "message__text__image" src=${message.image} >` : "";

    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                    ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                    ${message.created_at}
                    </div>
                  </div>
                    <div class="message__text"></div>
                    ${content}
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: "api/messages",
        type:'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
        var insertTHML = "";
        messages.forEach(function(message){
          insertTHML = buildHTML(message);
          $('.messages').append(insertTHML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      .fail(function() {
        alert('error');
        });
    }
  };
  setInterval(reloadMessages, 5000);
});