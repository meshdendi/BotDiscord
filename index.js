const discord = require("discord.js");
const bot = new discord.Client();
const request = require("request");
const config = require("./config.json");

var bullet_position = Math.floor(Math.random() * 7) + 1;

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

bot.on("message", (msg) => {
  const args = msg.content.split(" ");

  if (args.length == 1) {
    if (args[0].toLowerCase() == "yomama") {
      request("https://api.yomomma.info", (err, res, body) => {
        if (!err && res.statusCode == 200) {
          msg.channel.send(JSON.parse(body).joke);
        }
      });
    } else if (args[0].toLowerCase() == "!shoot") {
      if (Math.floor(Math.random() * 7) + 1 == bullet_position) {
        msg.reply("You Died!");
        reload();
      } else {
        msg.reply("You survived!");
      }
    }
  } else if (args.length == 2) {
    if (args[0].toLowerCase() == "!insult") {
      request(
        "https://evilinsult.com/generate_insult.php?lang=en&type=json",
        (err, res, body) => {
          if (!err && res.statusCode == 200) {
            msg.channel.send(args[1] + " " + JSON.parse(body).insult);
          }
        }
      );
    }
  }
});


function reload(){
    bullet_position = Math.floor(Math.random() * 7) + 1;
}

bot.login(config.token);
