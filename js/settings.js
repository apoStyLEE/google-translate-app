var $ = require('jQuery');
var Config = require('electron-config');
var config = new Config();
var browserWindow = require('electron').remote.getCurrentWindow()

$(document).ready(function () {

    $("form").on("submit", function () {

        var elems = $(this).find("input, select");

        elems.each(function(i, elem){
            var elemName = elem.name
            var elemVal = elem.value

            if (elem.type == "number"){
                config.set(elemName, parseInt(elemVal));
            }
            else{
                config.set(elemName, elemVal);
            }
        })

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

function isInt(n) { 
    return parseInt(n) === n 
};