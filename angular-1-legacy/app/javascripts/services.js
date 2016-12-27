app.service('quoteService', ['$http', function($http) {
  return {
    quoteCall: function() {
      var randomNum = Math.floor(Math.random()*1000)
      var url = `http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&randomnum=${randomNum}`;
      return $http.get(url, {cache:false}).then(function(results) {
        currentQuote = results.data[0];
        return currentQuote
      })
    },
    getQuote: function() {
      return currentQuote
    }
  }
}])
