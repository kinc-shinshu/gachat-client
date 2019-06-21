import $ from "jquery";

function getChats() {
  const results = $.ajax({
    url: "https://gachat-api.herokuapp.com/graphql",
    contentType: "application/json",
    type: "POST",
    async: false,
    data: JSON.stringify({
      query: `{allChats {name body}}`
    })
  }).responseJSON.data.allChats;
  return results;
}

function appendChat(name, body) {
  const chat = $("<div>");
  const dispName = $("<p>").append($("<strong>").text(`${name} さん`));
  chat.append(dispName);
  chat.append($("<p>").text(body));
  chat.append($("<hr>"));
  $("#chats").append(chat);
}

function postChat() {
  const name = $("#name").val();
  const body = $("#body").val();
  $("#body").val("");
  $.ajax({
    url: "https://gachat-api.herokuapp.com/graphql",
    contentType: "application/json",
    type: "POST",
    async: false,
    data: JSON.stringify({
      query: `mutation {createChat(body: "${body}", name: "${name}") {id} }`
    })
  }).responseJSON.data.id;
  refresh();
}

function refresh() {
  const chats = getChats();
  $("#chats").empty();
  chats.forEach(c => {
    appendChat(c.name, c.body);
  });
}

$(() => {
  $("#chats").text("読み込み中...");
  const chats = getChats();
  $("#chats").empty();
  chats.forEach(c => {
    appendChat(c.name, c.body);
  });
  $("#post").click(postChat);
});
