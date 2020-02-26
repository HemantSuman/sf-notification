
(function() {
  // Basic function to load script files, will be used to include jQuery
  var loadScript = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    // If the browser is Internet Explorer
    if (script.readyState){
      script.onreadystatechange = function() {
        if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            callback();
        }
      };
    // For any other browser
    } else {
      script.onload = function() {
          callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };
  // This is our JavaScript that we'll run after jQuery is included
  var getNotification = function($) {
    console.log('Shopify@!@!', Shopify);
    $(document).ready(function(){  
      $.ajax({
        url: 'https://moxoapps.com/sf-notification/shopify/load-notification',
        type: 'GET',
        data: {shop: Shopify.shop}
      })
      .done(function(data) {
        $('.sf-load-notification').html(data);
      })
    });
  }

  if(typeof(jQuery) == 'undefined'){
    // We'll get our jQuery from Google APIs
    loadScript('//code.jquery.com/jquery-3.4.1.min.js', function() {
        jQuery321 = jQuery.noConflict(true);
        getNotification(jQuery321);
    });
  }else {
    getNotification(jQuery);
  }
})();