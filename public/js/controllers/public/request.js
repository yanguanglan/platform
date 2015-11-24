(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('RequestController', RequestController);

    RequestController.$inject = ['$scope', '$http'];

    function RequestController($scope, $http) {
        var requestCtl = this;
        requestCtl.loading = false;
        requestCtl.request = {
            name: '',
            email: '',
            message: ''
        };
        requestCtl.submit = function(valid) {
            if (valid) {
                $http
                    .post('contact', {
                        name: requestCtl.request.name,
                        email: requestCtl.request.email,
                        message: requestCtl.request.message
                    })
                    .success(function(data) {
                        if (data.error) {
                            Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
                        } else {
                            Materialize.toast('<i class="mdi-action-done"></i> ' + requestCtl.request.name + ', thank you!', 4000, 'green');
                            $('#requestModal').closeModal();

                            requestCtl.contact = {
                                name: '',
                                email: '',
                                message: ''
                            };
                            $scope.requestForm.name.$setPristine();
                            $scope.requestForm.email.$setPristine();
                            $scope.requestForm.message.$setPristine();
                        }
                    })
                    .error(function() {
                        Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
                    });
            } else {
                Materialize.toast('<i class="mdi-action-highlight-remove"></i> Please enter valid data!', 4000, 'custom-red');
                $scope.requestForm.name.$setDirty();
                $scope.requestForm.email.$setDirty();
                $scope.requestForm.message.$setDirty();
            }
        };
    }
})();
