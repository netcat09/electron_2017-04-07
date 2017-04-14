app.service ('installService', function ($q) {
    var Promise = require('bluebird');
    var adbK = require('adbkit');


    return {
        apkInstall: function (apk) {


        var d = $q.defer();
        var client = adbK.createClient();
        client.listDevices()
        .then(function(devices) {
            return Promise.map(devices, function(device) {
                return client.install(device.id, apk)
                    .then(function (status) {
                        stat = 1;
                        d.resolve(stat);
                    })
            })
        })
        .then(function() {
            console.log('Installed %s on all connected devices', apk)
        })
        .catch(function(err) {
            console.error('Something went wrong:', err.stack)
        });
    return d.promise;

        }
    }
    }
);