var menubar = require('menubar')
var app = require("./js/app");
var Config = require('electron-config');
var config = new Config();

var opt = {
  index: "https://translate.google.com/m/translate",
  width: config.get("window-width") || 800,
  height: config.get("window-height") || 700,
  windowPosition: "topRight"
}

var mb = menubar(opt)

mb.on('ready', function ready() {
  app.init(opt, mb)
})
