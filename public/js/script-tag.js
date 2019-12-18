
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
  var getPaymentIcons = function($) {
    $(document).ready(function(){  
      $.ajax({
        url: 'https://badgemaster.hulkapps.com/frontend/get_trust_icons',
        type: 'GET',
        data: {shop_id: Shopify.shop}
      })
      .done(function(data) {
        $('.hulkapps-trust-icons').html(data);
      })
    });
  }
  // Check if jQuery is added, if not, then we'll loadScript, otherwise, run reChargeJS
  if(typeof(jQuery) == 'undefined'){
    // We'll get our jQuery from Google APIs
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', function() {
        jQuery321 = jQuery.noConflict(true);
        getPaymentIcons(jQuery321);
    });
  }else {
    getPaymentIcons(jQuery);
  }
})();