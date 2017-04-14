/**
 * Created by netcat09 on 27.03.2017.
 */
app.service ('list', function ($q) {
        var dirToJson = require('dir-to-json');
        return {
            getList: function () {
                var d = $q.defer();
                dirToJson("./apk", function (dirTree) {

                }).then (function (dirTree) {
                    var list = dirTree.children;
                    d.resolve(list);
                });
                return d.promise;
            },
            gPlayInfo: function (apkId) {
                console.log(apkId);
                var gplay = require('google-play-scraper');
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




