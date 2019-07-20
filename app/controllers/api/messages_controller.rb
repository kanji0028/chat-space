class Api::MessagesController < ApplicationController
  # 名前空間：同様のクラス名を作ってもそれらを区別できる
  def index
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user).where('id > ?', params[:last_id])
  end
end