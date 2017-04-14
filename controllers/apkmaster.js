app.controller ('master', function ($scope, $q, $timeout, list, infoService, adbStart, installService) {

    var gplay = require('google-play-scraper');
    var adb = require('node-adb');

    var path = 'apk/';

    $scope.apkSelected = [];
    $scope.result = 0;
    //adb init
    adbStart.adbStart();
   // список apk из директории
   // $scope.apks = [];
    list.getList().then (function (list) {
        $scope.apks = list;
        //console.log($scope.apks);



    $scope.apks.forEach(function (item, i) {
        //console.log(item.name.substr(0, item.name.length-4));
        var apkId=(item.name.substr(0, item.name.length-4));

       // var d = $q.defer();
        console.log(apkId);
        gplay.app({
            appId: apkId,
            lang: 'ru'})
            .then(function (data) {
                //console.log(data);
               // console.log(data.icon);
                $scope.apks[i].icon = data.icon;
                $scope.apks[i].title = data.title;
                $scope.apks[i].description = data.description;
                //console.log($scope.apks[i].icon);
              //  var apkFullInfo = data;
               // d.resolve(apkFullInfo);
            }).then(function () {
            $scope.$apply();
        })
       // return d.promise;
        });

    });

    // подключение + инфа о смарте
    $scope.getInfo = function () {
        $timeout(function() {
        infoService.getFullInfo().then (function (prop) {
            console.log(prop);
            $scope.smartphone = prop;
            console.log($scope.smartphone['ro.product.brand']);

        })
    })
    };


    // установка программ на смартфон
     $scope.installApk = function (){
        $scope.result = 0;
         $scope.apkSelected.name.forEach(function (item, i) {
             console.log(item);
             apk = path + item;
             installService.apkInstall(apk)
                 .then(function (stat) {
                     $scope.result = $scope.result + stat;
                     console.log($scope.result);
                 })
         })
      };





});


