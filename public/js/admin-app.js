jQuery(document).ready(function(){

	$(document).on('click', '#notification_done_btn', function(){

		// var formData = {
		// 	'ttl': $('#ttl').val()
		// };
		var datastring = $("#settingForm").serialize();
		console.log('#@#@', datastring);
		$.ajax({
			url: '/shopify/save-settings',
			data: datastring,
			dataType: "json",
			method: "POST",
			cache: false,
			success: function (response) {
				console.log(response);
			},
			error: function (resData) {
				console.log('err', resData);
			}

		});
    });

});
