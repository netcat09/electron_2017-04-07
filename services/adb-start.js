app.service ('adbStart', function ($q) {
    var adb = require('node-adb');
    return {
        adbStart: function () {
            var adb = require('node-adb');
            adb({
                cmd: ['devices']
            },function(result){
                console.log(result);
            });
        }
    }
});
