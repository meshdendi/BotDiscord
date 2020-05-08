const discord = require('discord.js');
const bot = new discord.Client();
const request = require('request');
const config = require('./config.json');
const fs = require('fs');

var bullet_position = Math.floor(Math.random() * 7) + 1;

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

bot.on('message', (msg) => {
  const args = msg.content.split(" ");
  if (!args[0].startsWith(config.prefix)) return;
  if (args.length == 1) {
    if (args[0].toLowerCase() == `${config.prefix}yomama`) {
      fs.readFile('./assets/text/yomama.txt', (err, data) => {
        if (err) throw err;
        var arr = data.toString().split('\n');
        msg.channel.send(arr[Math.floor(Math.random() * arr.length) + 1]);
      });
    } else if (args[0].toLowerCase() == `${config.prefix}shoot`) {
      if (Math.floor(Math.random() * 7) + 1 == bullet_position) {
        msg.channel.send(`<@${msg.author.id}> died!`);
        reload();
      } else {
        msg.channel.send(`<@${msg.author.id}> survived!`);
      }
    }
  } else if (args.length == 2) {
    if (args[0].toLowerCase() == `${config.prefix}insult`) {
      request(
        'https://evilinsult.com/generate_insult.php?lang=en&type=json',
        (err, res, body) => {
          if (!err && res.statusCode == 200) {
            msg.channel.send(`${args[1]} ${JSON.parse(body).insult}`);
          }
        }
      );
    }
  }
});


function reload(){
    bullet_position = Math.floor(Math.random() * 7) + 1;
}

bot.login('NzA4MDA0OTU2ODAzNjk0Njg0.XrV_tA._03ZGWS9YgWvRYta1NM0wPYUWiE');
