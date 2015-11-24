(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', '$http'];

    function ContactController($scope, $http) {
        var contactCtl = this;
        contactCtl.loading = false;
        contactCtl.contact = {
            name: '',
            email: '',
            message: ''
        };
        contactCtl.submit = function(valid) {
            if (valid) {
                $http
                    .post('contact', {
                        name: contactCtl.contact.name,
                        email: contactCtl.contact.email,
                        message: contactCtl.contact.message
                    })
                    .success(function(data) {
                        if (data.error) {
                            Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
                        } else {
                            Materialize.toast('<i class="mdi-action-done"></i> ' + contactCtl.contact.name + ', thank you!', 4000, 'green');
                            $('#contactModal').closeModal();

                            contactCtl.contact = {
                                name: '',
                                email: '',
                                message: ''
                            };
                            $scope.contactForm.name.$setPristine();
                            $scope.contactForm.email.$setPristine();
                            $scope.contactForm.message.$setPristine();
                        }
                    })
                    .error(function() {
                        Materialize.toast('<i class="mdi-action-highlight-remove"></i> Our server has some issues!', 4000, 'custom-red');
                    });
            } else {
                Materialize.toast('<i class="mdi-action-highlight-remove"></i> Please enter valid data!', 4000, 'custom-red');
                $scope.contactForm.name.$setDirty();
                $scope.contactForm.email.$setDirty();
                $scope.contactForm.message.$setDirty();
            }
        };
    }
})();
