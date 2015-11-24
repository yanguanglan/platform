(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('SerieController', SerieController);

    SerieController.$inject = ['serie'];

    function SerieController(serie) {
        var serieCtl = this;
        serieCtl.serie = serie;
    }
})();
