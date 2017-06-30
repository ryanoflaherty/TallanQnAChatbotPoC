marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

app.filter('markdown', ['$sce', function ($sce) {
    return function (htmlCode) {
        var markdown = marked(htmlCode);
        return $sce.trustAsHtml(markdown);
    };
}]);