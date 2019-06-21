import $ from "jquery";

class Gachat {
  constructor() {
    this.baseurl = "https://gachat-api.herokuapp.com/graphql";
    this.render();
  }

  async getChats() {
    const results = await fetch(this.baseurl, {
      method: "POST",
      body: JSON.stringify({
        query: `query {
          allChats {
            name
            body
          }
        }`
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
    return results.data.allChats;
  }

  async postChat(name, body) {
    const result = await fetch(this.baseurl, {
      method: "POST",
      body: JSON.stringify({
        query: `mutation {
          createChat(name: "${name}", body: "${body}") {
            id
          }
        }`
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
    return result;
  }

  async render() {
    const area = $("#chats");
    area.append($("<p>").text("読み込み中..."));
    const chats = await this.getChats();
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
    gachat.postChat(name, body).then(() => {
      gachat.render();
    });
  });
});
