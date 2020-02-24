jQuery(document).ready(function(){


$('.tooltipped').tooltip();
	
$(document).on('click','.moxo_closebar',function(){
	$('.preview-card').remove();
});

$(document).on('change','.notiMain_toggle',function(){
    if($(this).is(":checked")) {
        $('.preview-card').addClass("fixed").show();
		$('.moxo_bar').addClass("fixed");
    } else {
        $('.preview-card').removeClass("fixed").hide();
		$('.moxo_bar').removeClass("fixed");
    }
});

$(document).on('click','.notiMain_position',function(){
	if($('input[name=position]:checked').val() == "top"){
		$('.moxo-wrapper').css('paddingTop','');
		$('.preview-card').addClass('top');
		$('.preview-card').removeClass('bottom');

	} else if ($('input[name=position]:checked').val() == "bottom") {
		$('.moxo-wrapper').css('paddingTop','15px');
		$('.preview-card').removeClass('top');
		$('.preview-card').addClass('bottom');
	}
});

$(document).on('change','.notiMain_sticky',function(){
	if($('input[name=sticky]:checked').val() == "scroll"){
		$('.preview-card').removeClass('fixed');

	} else if ($('input[name=sticky]:checked').val() == "fixed") {
		$('.preview-card').addClass('fixed');
	}
});

$('.e1_element').fontIconPicker();
$(document).on('change','.notiClose_toggle',function(){
    if($(this).is(":checked")) {
        $('.moxo_closebar').show();
    } else {
        $('.moxo_closebar').hide();
    }
});
$(document).on('change','.e1_element',function(){
	var val=$(this).find('option:selected').text();
	$(".moxo_closebar [class^='icon-']").removeClass().addClass(val);
});
$(document).on('change', '.btn_close_style', function(){
	var val=$(this).find('option:selected').text();
	$(".moxo_closebar").removeClass().addClass("moxo_closebar "+val);
});
// button border radius
$(document).on('change', '.btn_close_radius', function(){
	$('.moxo_closebar').css("border-radius", $(this).val() + "px");
});

$('.icons').formSelect();

// Fontselect title
$('.title_fonts').fontselect().change(function(){
  var font = $(this).val().replace(/\+/g, ' ');
  font = font.split(':');
  $('.moxo_title').css('font-family', font[0]);
});

$('.title_font_size').on('change', function() {
	$('.moxo_title').css("font-size", $(this).val() + "px");
});

// Fontselect message
$('.msg_fonts').fontselect().change(function(){
  var font = $(this).val().replace(/\+/g, ' ');
  font = font.split(':');
  $('.moxo_message_cta').css('font-family', font[0]);
});

$('.msg_font_size').on('change', function() {
	$('.moxo_message_cta').css("font-size", $(this).val() + "px");
});

// Fontselect Button
$('.btn_fonts').fontselect().change(function(){
  var font = $(this).val().replace(/\+/g, ' ');
  font = font.split(':');
  $('.moxo_bar_btn').css('font-family', font[0]);
});
// button Size
$('.btn_font_size').on('change', function() {
	$('.moxo_bar_btn').css("font-size", $(this).val() + "px");
});
// button border radius
$('.btn_radius').on('change', function() {
	$('.moxo_bar_btn').css("border-radius", $(this).val() + "px");
});

// Title Text
$(document).on('keyup','.title-typing',function(e){
	var currentText = $(this).val();
	$(".moxo_title").text(currentText);
});

// moxo_barText
$(document).on('keydown','.moxo_barText',function(e){
	var keycode = e.charCode || e.keyCode;
	if (keycode  == 13) {return false;}
});
$(document).on('keyup','.moxo_barText',function(e){
	$('.moxo_message').html($(this).text());
});
$(document).on('click', '.b_btn', function(){
  document.execCommand('bold');
  var text = $(".moxo_barText").html();
  $('.moxo_message').html(text);
});
$(document).on('click', '.i_btn', function(){
  document.execCommand('italic');
  var text = $(".moxo_barText").html();
  $('.moxo_message').html(text);
});
$(document).on('keyup', '.btn-text', function(){
	var currentText = $(this).val();
	$(".moxo_bar_btn").text(currentText);
});
$(document).on('keyup', '.btn-url', function(){
	var currentText = $(this).val();
	$(".moxo_bar_btn").attr("href",currentText);
});
$(document).on('change', '.btn_style', function(){
	var val=$(this).find('option:selected').text();
	$(".moxo_bar_btn").removeClass().addClass("moxo_bar_btn "+val);
});

//code for Date Picker
$(document).ready(function () {
    M.AutoInit();
    var DateField = MaterialDateTimePicker.create($('#datetime'));
	var DateField2 = MaterialDateTimePicker.create($('#datetimeEnd'));
});

$(document).on('change','.notiCountdown_toggle',function(){
    if($(this).is(":checked")) {
        $('.date_start').removeAttr("disabled");
		$('.date_end').removeAttr("disabled");
		$('.countdown').show();
    } else {
		$('.date_start').attr('disabled', 'disabled');
		$('.date_end').attr('disabled', 'disabled');
		$('.countdown').hide();
    }
});

$('.file-input').change(function(){
	loadFile(this);
});

$('.clear_bg').click(function(){
	$('.bg-section img').remove();
});


});

/* Custom Color*/
function loadFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.bg-section img').remove();
            $('.bg-section').append('<img src="'+e.target.result+'" width="100%" height="100%"/>');
        };
        reader.readAsDataURL(input.files[0]);
    }
	$('#holder').css('background', '');
}

function holder(jscolor) {
	document.getElementById('holder').style.backgroundColor = '#' + jscolor;
}

/* Title */
function ttltxt(jscolor) {	
	document.getElementById('title').style.color = '#' + jscolor
}
/*Title BG*/
function ttlbg(jscolor) {	
	document.getElementById('title').style.backgroundColor = '#' + jscolor
}
/*Message Text*/
function msgtxt(jscolor) {	
	document.getElementById('message').style.color = '#' + jscolor
}
/*Message BG*/
function msgbg(jscolor) {	
	document.getElementById('message').style.backgroundColor = '#' + jscolor
}
/*Button */
function btntxt(jscolor) {	
	document.getElementById('button').style.color = '#' + jscolor
}
/*Button BG*/ 
function btnbg(jscolor) {
	document.getElementById('button').style.backgroundColor = '#' + jscolor;
}
/*btn_close_txt */
function btn_close_txt(jscolor) {	
	document.getElementById('notiCloseColor').style.color = '#' + jscolor;
}
/*btn_close_bg*/ 
function btn_close_bg(jscolor) {
	document.getElementById('notiClose').style.backgroundColor = '#' + jscolor;
}
