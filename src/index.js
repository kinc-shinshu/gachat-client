import $ from "jquery";

class Gachat {
  constructor() {
    this.baseurl = "https://gachat-api.herokuapp.com/graphql";
    this.render();
  }

  getChats() {
    const results = $.ajax({
      url: this.baseurl,
      contentType: "application/json",
      type: "POST",
      async: false,
      data: JSON.stringify({
        query: `{allChats {name body}}`
      })
    }).responseJSON.data.allChats;
    return results;
  }

  postChat(name, body) {
    $.ajax({
      url: this.baseurl,
      contentType: "application/json",
      type: "POST",
      async: false,
      data: JSON.stringify({
        query: `mutation {createChat(name: "${name}", body: "${body}") {id} }`
      })
    }).responseJSON.data.id;
  }

  render() {
    const area = $("#chats");
    area.append($("<p>").text("読み込み中..."));
    const chats = this.getChats();
    area.empty();
    chats.forEach(c => {
      const chat = $("<div>");
      const name = $("<p>").append($("<strong>").text(`${c.name} さん`));
      chat.append(name);
      chat.append($("<p>").text(c.body));
      chat.append($("<hr>"));
      area.append(chat);
    });
  }
}

$(() => {
  const gachat = new Gachat();
  $("#post").click(() => {
    const name = $("#name").val();
    const body = $("#body").val();
    $("#body").val("");
    gachat.postChat(name, body);
    gachat.render();
  });
});
