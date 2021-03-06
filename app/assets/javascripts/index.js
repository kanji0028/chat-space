$(function(){

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendUsers(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
    return html;
  }
  
  function appendMembers(name, user_id) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
                <p class="chat-group-user__name">${name}</p>
                <input name="group[user_ids][]" type="hidden" value="${ user_id }">
                <p class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</p>
                </div>`
                member_list.append(html);
  }

  function appendNoUsers(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user }</p>
              </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup" , function(e){
    e.preventDefault();
    $("#user-search-result").empty();
    var input = $("#user-search-field").val();
    if(input.length == 0) {
    }
    else{
      
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      
      .done(function(users){
        if (users.length !==0){
          users.forEach(function(user){
            appendUsers(user);
          });
        }
        else {
          appendNoUsers("一致するユーザーはいません");
        }
      })
      .fail(function(){
        alert('検索に失敗しました');
      })
    }
  });

    $(function(){
      $(document).on("click", ".user-search-add" ,function(){
        var name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        $(this).parent().remove();
        appendMembers(name, user_id);
        $(this).data("chat-group-user__name");
      })
    });

      $(document).on("click",".user-search-remove",function(){
        $(this).parent().remove();
      });
});