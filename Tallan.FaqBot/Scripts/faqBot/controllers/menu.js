app.controller('menuController',
    [
        '$scope', '$http', 'faqService', '$element', '$document', '$uibModal', '$location',
        function ($scope, $http, faqService, $element, $document, $uibModal, $location) {
            var workspace = $location.path().split("/").filter(function (param) { return param.length > 0 })[0] || '';

            $http.get('/api/FaqSources?workspace=' + workspace).then(function successCallback(response) {
                    $scope.sources = response.data;
                    faqService.setSource($scope.sources[0]);
                    $scope.source = $scope.sources[0];
                },
                function errorCallback(response) {
                    console.error(response);
                });

            $scope.open = false;

            $scope.toggleMenu = function($event) {
                $event.preventDefault();
                $scope.open = !$scope.open;
            }

            $scope.changeSource = function($event, source) {
                $event.preventDefault();
                faqService.setSource(source);
                $scope.source = source;
                $scope.open = false;
            }

            $document.bind('click',
                function($event) {
                    if ($($event.target).closest('#sidebar-wrapper, #menu-toggle, .modal').length === 0) {
                        $scope.open = false;
                        $scope.$apply();
                    }
                });

            $scope.manageSources = function() {
                $uibModal.open({
                    templateUrl: 'manageModal.html',
                    size: 'lg',
                    keyboard: false,
                    backdrop: 'static',
                    scope: $scope,
                    bindToController: true,
                    controllerAs: 'vm',
                    controller: [
                        '$scope', '$uibModalInstance', 'sources', function ($scope, $uibModalInstance, sources) {
                            var vm = this;
                            vm.sources = sources;

                            vm.addSource = function() {
                                vm.editSource = {
                                    edit: true,
                                    Workspace: workspace == '' ? null : workspace
                                };
                                vm.sources.push(vm.editSource);
                            }

                            vm.deleteSource = function($event, source) {
                                $event.stopPropagation();

                                if (source.FaqSourceId) {
                                    $http.delete('/api/FaqSources/' + source.FaqSourceId).then(
                                        function successCallback(response) {
                                            //console.debug(response);
                                            var index = vm.sources.indexOf(source);
                                            vm.sources.splice(index, 1);

                                            for (var i = 0; i < $scope.sources.length; i++) {
                                                if ($scope.sources[i].FaqSourceId === response.data.FaqSourceId) {
                                                    $scope.sources.splice(i, 1);
                                                    break;
                                                }
                                            }
                                        },
                                        function errorCallback(response) {
                                            console.error(response);
                                        });
                                } else {
                                    var index = vm.sources.indexOf(source);
                                    vm.sources.splice(index, 1);
                                }
                            }

                            vm.saveSource = function($event, rowForm, source) {
                                $event.stopPropagation();

                                rowForm.$setSubmitted();
                                if (!rowForm.$valid)
                                    return;

                                var request;
                                if (source.FaqSourceId) {
                                    // This is an existing source, update it
                                    request = $http.put('/api/FaqSources/' + source.FaqSourceId, source);
                                } else {
                                    // This is a new souce, add it
                                    request = $http.post('/api/FaqSources', source);
                                }

                                request.then(
                                    function successCallback(response) {
                                        if (source.FaqSourceId) {
                                            var currentSource = faqService.currentSource();
                                            // This is an existing source, find it and replace it with the updated one
                                            for (var i = 0; i < $scope.sources.length; i++) {
                                                if ($scope.sources[i].FaqSourceId === response.data.FaqSourceId) {
                                                    $scope.sources[i] = response.data;
                                                    if (currentSource.FaqSourceId == $scope.sources[i].FaqSourceId) {
                                                        faqService.setSource($scope.sources[i], false);
                                                    }
                                                    break;
                                                }
                                            }
                                        } else {
                                            // This is a new source, add it
                                            $scope.sources.push(response.data);
                                        }
                                    },
                                    function errorCallback(response) {
                                        console.error(response);
                                    });

                                source.edit = false;
                                // TODO - save to database
                            }

                            vm.searchUrlChanged = function(source) {
                                if (source.MinConfidence == null && source.SearchURL.length > 0) {
                                    source.MinConfidence = 1; // default to 1
                                }
                                if (source.SearchURL.length === 0) {
                                    source.MinConfidence = null;
                                }
                            }
                        }
                    ],
                    resolve: {
                        sources: function() {
                            return angular.copy($scope.sources);
                        }
                    }
                });
            }
        }
    ]);