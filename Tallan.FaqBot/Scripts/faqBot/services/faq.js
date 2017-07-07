app.factory('faqService',
    [
        '$rootScope', '$http',
        function($rootScope, $http) {
            var currentSource = null;

            return {
                currentSource: function () {
                    return currentSource;
                },
                setSource: function(source, broadcastUpdate) {
                    var originalSource = angular.copy(currentSource);
                    currentSource = source;

                    if (broadcastUpdate != false)
                    {
                        $rootScope.$broadcast('sourceChanged',
                        {
                            original: originalSource,
                            changed: currentSource
                        });
                    }
                },
                postQuestion: function(question) {
                    return $http.post('https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/' +
                        currentSource.KnowledgeBase +
                        '/generateAnswer',
                        {
                            question: question,
                            top: 3
                        },
                        {
                            headers: {
                                'Ocp-Apim-Subscription-Key': currentSource.SubscriptionKey
                            }
                        });
                }
            }
        }
    ]);