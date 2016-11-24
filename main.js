var menubar = require('menubar')
var app = require("./js/app.js");

var opt = {
  index: "https://translate.google.com",
  width: 800,
  height: 600,
  windowPosition: "topRight"
}

var mb = menubar(opt)

mb.on('ready', function ready() {
  app.init(opt, mb)
})