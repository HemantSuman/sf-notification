jQuery(document).ready(function(){

	$(document).on('click', '#notification_done_btn', function(){
		saveSubmitForm('done')
	});

	$(document).on('click', '#notification_published_btn', function(){
		saveSubmitForm('published')
	});

	function saveSubmitForm(action){

		var EnableDisableNotificationBar = $("input[name=EnableDisableNotificationBar]").is(":checked");
		var BackgroundColor = $("input[name=BackgroundColor]").val();
		var TitleFontFamily = $("input[name=TitleFontFamily]").val().replace(/\+/g, ' ').split(':')[0];
		var TitleFontsize = $("input[name=TitleFontsize]").val()+ "px";
		var TitleTextColor = $("input[name=TitleTextColor]").val();

		var TitleBGColor = $("input[name=TitleBGColor]").val();
		// var textarea1 = $("input[name=textarea1]").val();
		var MessageFontFamily = $("input[name=MessageFontFamily]").val();
		var MessageFontSize = $("input[name=MessageFontSize]").val();
		var MessageTextColor = $("input[name=MessageTextColor]").val();
		var MessageBGColor = $("input[name=MessageBGColor]").val();
		var ButtonLabel = $("input[name=ButtonLabel]").val();
		var ButtonURL = $("input[name=ButtonURL]").val();
		var ButtonFontFamily = $("input[name=ButtonFontFamily]").val();
		var ButtonFontsize = $("input[name=ButtonFontsize]").val();
		var BtnTextColor = $("input[name=BtnTextColor]").val();
		var BtnBGColor = $("input[name=BtnBGColor]").val();
		var Buttonstyles = $("select[name=Buttonstyles]").val();
		var BtnButtonRadius = $("input[name=BtnButtonRadius]").val();
		var EnableDisableCloseButton = $("input[name=EnableDisableCloseButton]").is(":checked");
		var Icons = $("select[name=Icons]").val();
		var CloseBtnTextColor = $("input[name=CloseBtnTextColor]").val();
		var CloseBtnBgColor = $("input[name=CloseBtnBgColor]").val();
		var CloseButtonType = $("select[name=CloseButtonType]").val();
		var ButtonRadius = $("input[name=ButtonRadius]").val();
		var EnableDisableCountdownSection = $("input[name=EnableDisableCountdownSection]").val();
		var StartTime = $("input[name=StartTime]").val();
		var EndTime = $("input[name=EndTime]").val();
		var CountdownType = $("input[name=CountdownType]").val();
		var CountdownTextColor = $("input[name=CountdownTextColor]").val();
		var user_info_id = $("input[name=user_info_id]").val();
		var settings_id = $("input[name=settings_id]").val();
		var settingdraft_id = $("input[name=settingdraft_id]").val();
		var shop_name = $("input[name=shop_name]").val();

		var formData = {
			settings_id:settings_id,
			settingdraft_id:settingdraft_id,
			user_info_id:user_info_id,
			shop_name:shop_name,
			action:action,
			'title': $('#ttl').val(),
			textarea1: $('#textarea1').html(),
			EnableDisableNotificationBar:EnableDisableNotificationBar,
			BackgroundColor:BackgroundColor,
			TitleFontFamily:TitleFontFamily,
			TitleFontsize:TitleFontsize,
			TitleTextColor:TitleTextColor,
			TitleBGColor:TitleBGColor,
			MessageFontFamily:MessageFontFamily,
			MessageFontSize:MessageFontSize,
			MessageTextColor:MessageTextColor,
			MessageBGColor:MessageBGColor,
			ButtonLabel:ButtonLabel,
			ButtonURL:ButtonURL,
			ButtonFontFamily:ButtonFontFamily,
			ButtonFontsize:ButtonFontsize,
			BtnTextColor:BtnTextColor,
			BtnBGColor:BtnBGColor,
			Buttonstyles:Buttonstyles,
			BtnButtonRadius:BtnButtonRadius,
			EnableDisableCloseButton:EnableDisableCloseButton,
			Icons:Icons,
			CloseBtnTextColor:CloseBtnTextColor,
			CloseBtnBgColor:CloseBtnBgColor,
			CloseButtonType:CloseButtonType,
			ButtonRadius:ButtonRadius,
			EnableDisableCountdownSection:EnableDisableCountdownSection,
			StartTime:StartTime,
			EndTime:EndTime,
			CountdownType:CountdownType,
			CountdownTextColor:CountdownTextColor,
		};

		$.ajax({
			url: '/sf-notification/shopify/save-settings',
			data: formData,
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
	}

		
});
