app.service ('infoService', function ($q) {
    var adbK = require('adbkit');
    var Promise = require('bluebird');
    return {
        getFullInfo: function () {
            var d = $q.defer();


            var client = adbK.createClient();

            client.listDevices()
                .then(function (devices) {
                    return Promise.filter(devices, function (device) {
                        return client.getProperties(device.id)
                            .then(function (properties) {
                                prop = properties;
                                d.resolve(prop);
                            })
                    })
                })

                .catch(function (err) {
                    if (err.message = "Failure: 'device unauthorized. Please check the confirmation dialog on your device.'"){
                        alert('Проверьте разрешения на смартфоне')
                    }else {
                        console.log(err);
                    }

                });
            return d.promise
        }
    }

});