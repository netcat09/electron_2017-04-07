
app.service ('gplayService', function ($q) {
    var gplay = require('google-play-scraper');
    return {
        gPlayInfo: function (apkId) {
            console.log(apkId);
            var d = $q.defer();
            console.log(apkId);
            gplay.app({
                appId: apkId,
                lang: 'ru'})
                .then(function (data) {
                    console.log(data);
                    var apkFullInfo = data;
                    d.resolve(apkFullInfo);
                });
            return d.promise;
        }
    }});





