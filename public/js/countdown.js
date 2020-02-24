 $(document).ready(function(){
	
	// on changing date initilize the countdown again 
	$(document).on('change','.date_start', function(){
		init($(this).val());
	});
	$(document).on('change','.date_end', function(){
		init($(this).val());
	});
	function init(timer){
		$('.countdown').countdown(timer).on('update.countdown', function(event) {
			var $this = $(this).html(event.strftime(''
			  //+ '<div class="week"><span>%W</span> Week</div>'
			  +	'<div class="day"><span>%D</span> Day</div>'
			  + '<div class="hours"><span>%H</span> Hours</div>'
			  + '<div class="min"><span>%M</span> Min</div>'
			  + '<div class="sec"><span>%S</span> Sec</div>'));
		});
	}

	 //initilize counter on load with some default date
	 init("2019/12/15 02:21 AM");

});