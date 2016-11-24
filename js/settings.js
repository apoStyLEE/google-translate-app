var $ = require('jQuery');
var Config = require('electron-config');
var config = new Config();
var browserWindow = require('electron').remote.getCurrentWindow()

$(document).ready(function () {

    $("form").on("submit", function () {
        var settingDatas = $(this).serializeArray();
        for (var i = 0; i < settingDatas.length; i++) {
            var settingData = settingDatas[i];
            config.set(settingData.name, settingData.value);
        }

        browserWindow.hide();
        browserWindow.webContents.goBack()
        return false;
    })

    $("#cancel").on("click", function(){
        browserWindow.webContents.goBack()
    })

    loadConfigs()
})

function loadConfigs() {
    var configStore = config.store;
    for (var key in configStore) {
        var value = configStore[key]
        $("[name='" + key + "']").val(value);
    }
}