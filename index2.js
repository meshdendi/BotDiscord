const fs = require('fs');

getYomama();

function getYomama(){
    fs.readFile('./assets/text/yomama.txt', (err, data) => {
        if (err) throw err;
        var arr = data.toString().split('\n');
        console.log(arr[Math.floor(Math.random() * 7) + 1]);
    });
}