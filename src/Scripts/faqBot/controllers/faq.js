app.controller('faqController',
    [
        '$scope', '$http', 'faqService',
        function ($scope, $http, faqService) {
            $scope.question = '';
            $scope.messages = [];
            $scope.botName = '';

            $scope.$on('sourceChanged',
                function (event, args) {
                    if (args.original == null || args.original.knowledgeBase !== '') {
                        $scope.question = '';
                        $scope.messages = [];
                    }
                    $scope.botName = args.changed.Name;
                });

            $scope.askQuestion = function () {
                $scope.messages.push({
                    isBot: false,
                    showTimestamp: true,
                    showIcon: true,
                    message: $scope.question,
                    user: 'You',
                    time: new Date()
                });
                var question = $scope.question;
                $scope.question = '';
                faqService.postQuestion(question)
                    .then(
                        function successCallback(response) {
                            //console.debug(response);
                            angular.forEach(response.data.answers,
                                function (value, key) {
                                    $scope.messages.push({
                                        isBot: true,
                                        showTimestamp: true,
                                        showIcon: true,
                                        message: value.answer,
                                        score: value.score,
                                        user: $scope.botName,
                                        time: new Date(),
                                        isAlternative: key > 0,
                                        hasAlternatives: response.data.answers.length > 1,
                                        visible: key === 0
                                    });
                                });
                        },
                        function errorCallback(response) {
                            console.error(response);
                        });
            }

            $scope.toggleAltAnswers = function(message) {
                var index = $scope.messages.indexOf(message);
                for (var i = index + 1; i < $scope.messages.length; i++) {
                    if ($scope.messages[i].isAlternative) {
                        $scope.messages[i].visible = !$scope.messages[i].visible;
                    } else {
                        break;
                    }
                }
            }

            $scope.alternativesVisible = function(message) {
                var index = $scope.messages.indexOf(message);
                for (var i = index + 1; i < $scope.messages.length; i++) {
                    if (!$scope.messages[i].isAlternative) {
                        break;
                    }
                    if ($scope.messages[i].visible) {
                        return true;
                    }
                }
                return false;
            }
        }
    ]);