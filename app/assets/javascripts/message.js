$(function(){
  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                    ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                    ${message.created_at}
                    </div>
                    </div>
                    <div class="message__text"></div>
                    <p class="message__text__content">
                    ${message.content}
                    </p>
                    <img class="message__text__image" src="/uploads/message/image/${message.id}/${message.image}" alt="Profy">
                  </div>`
    return html;
  }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        console.log("成功")
        var html = buildHTML(data);
        $('.messages').append(html)
        $('.input-box__text').val('')
      })
      .fail(function(){
        alert("error");
    })
  })
});