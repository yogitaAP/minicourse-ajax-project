
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='
                            + address + '';
    $body.append('<img class="bgimg" src=" ' + streetviewUrl +  '">');

    var apiKey = 'cbd70979b64299864c406d5728d1d082:1:73982500'
    
    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='
                + cityStr + '&sort=newest&api-key=' + apiKey;

    $.getJSON(nytURL, function(data) {
        $nytHeaderElem.text('New York Times Articles about ' + cityStr);

        articles = data.response.docs;

        for(var i = 0; i < articles.length; ++i) {
            var article = articles[i];

            $nytElem.append('<li class="article">' +
             '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +  
             '<p>' + article.snippet + '</p>' + 
             '</li>') 
        }
    }).error(function() {
        $nytHeaderElem.text("New York Times Articles could not be laoded");
    })

    var wikiURL = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + cityStr
                + "&format=json&callback=wikicallback";

    $.ajax({
        url: wikiURL,
        dataType: 'jsonp',
        //jsonp: 'callback',
        success: function (response) {
            var articleList = response[1];

            for(var i=0; i < articleList.length; ++i) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>')
            }
        }
    })            

    return false;
};

$('#form-container').submit(loadData);

// loadData();


//cbd70979b64299864c406d5728d1d082:1:73982500
