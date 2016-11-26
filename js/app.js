var menu = require('menu')
var globalShortcut = require('global-shortcut')
var clipboard = require('clipboard')
var path = require('path')
var Config = require('electron-config');
var config = new Config();

var app = {
    menuBar: null,
    init: function (options, menuBar) {
        console.log('app is running')
        this.menuBar = menuBar
        this.buildMenu()
        globalShortcut.register("Alt+C", function () {
            app.run(options)
        })
    },
    run: function (opt) {
        var helpers = app.helpers
        var mb = this.menuBar;
        var clipboardSelectionText = clipboard.readText('selection')
        var url = opt.index + "#" + helpers.getSetting("source") + "/" + helpers.getSetting("destination") + "/" + clipboardSelectionText
        app.appWindow(url)
    },
    insertCustomCss: function () {
        // var webContents = this.menuBar.window.webContents;
        // webContents.on('did-finish-load', function () {
        //     webContents.insertCSS('.e_md #gt-ft-res, #gt-ft{ display:none!important }')
        // });
    },
    events: {
        menuItemClick: function (menuItem, browserWindow, event) {
            if (menuItem.id == "settings") {
                app.helpers.loadStaticFile(menuItem.loadFileName)
            } else if (menuItem.id == "quit") {
                app.menuBar.app.quit()
            }
        }
    },
    helpers: {
        loadStaticFile: function (fileName) {
            var loadFileFullPath = 'file://' + path.join(app.menuBar.getOption("dir"), fileName)
            app.appWindow(loadFileFullPath)
        },
        getSetting: function (key) {
            return config.get(key)
        }
    },
    buildMenu: function () {
        var mb = this.menuBar
        var tray = mb.tray
        var contextMenu = menu.buildFromTemplate([{
            label: 'Settings',
            id: 'settings',
            loadFileName: 'settings.html',
            click: app.events.menuItemClick
        }, {
            label: 'Quit',
            id: 'quit',
            click: app.events.menuItemClick
        }])

        tray.on('right-click', function (event, bounds) {
            tray.popUpContextMenu(contextMenu)
        })

        tray.on('click', function (event, bounds) {
            mb.showWindow()
        })
    },
    appWindow: function (url) {
        var mb = this.menuBar;
        mb.showWindow()
        mb.window.loadUrl(url)
        console.log(url)
        this.insertCustomCss()
    }
}

module.exports = app