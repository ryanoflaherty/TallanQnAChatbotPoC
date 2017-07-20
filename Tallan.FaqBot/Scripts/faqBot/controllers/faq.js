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
                    if (args.changed) {
                        $scope.botName = args.changed.Name;
                    }
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
                            var currentSource = faqService.currentSource();
                            angular.forEach(response.data.answers,
                                function (value, key) {
                                    var msg = {
                                        isBot: true,
                                        showTimestamp: true,
                                        showIcon: true,
                                        message: value.answer,
                                        alternateMessage: "Show alternative answers",
                                        score: value.score,
                                        user: $scope.botName,
                                        time: new Date(),
                                        isAlternative: key > 0,
                                        hasAlternatives: response.data.answers.length > 1,
                                        visible: key === 0
                                    };
                                    
                                    if (!msg.isAlternative && currentSource.SearchURL && msg.score < currentSource.MinConfidence) {
                                        var validUrlPattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
                                        if (currentSource.SearchURL && currentSource.SearchURL.match(validUrlPattern)) {
                                            var link = currentSource.SearchURL.replace("{0}", encodeURIComponent(question));
                                            msg.message = "No FAQ found that closely matches your question. Try [clicking here](" + link + ") to see search results instead."
                                            msg.alternateMessage = "Show potential answers";
                                        }
                                    }

                                    $scope.messages.push(msg);
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

            angular.element('#wrap').on('click', 'a', function () {
                this.target = "_blank";
            });
        }
    ]);