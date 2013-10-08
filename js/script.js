// Browser safe method for adding event listeners
var addEvent = function(elem, type, eventHandle) {
    if (elem == null || elem == undefined) return;
    if ( elem.addEventListener ) {
        elem.addEventListener( type, eventHandle, false );
    } else if ( elem.attachEvent ) {
        elem.attachEvent( "on" + type, eventHandle );
    } else {
        elem["on"+type]=eventHandle;
    }
};

(function($) {
	$(document).ready(function() {
		// Adjust view for screen height
		shortScreenAdjustments();
		var window_resize = new addEvent(window, 'resize', shortScreenAdjustments);
		
		// Move labels into input boxes
		$('#contact_form label').each(function(index, element) {
			if ($(this).children('input').length > 0) {
				$(this).children('input').first()
					.val( $(this).children('span').first().html() )
					.focus(function() {
						if ( $(this).val() == $(this).siblings('span').first().html() ) {
							$(this).attr( 'placeholder', $(this).siblings('span').first().html() );
							$(this).val( '' );
						}
					})
					.blur(function() {
						if ( $(this).val() == '' ) {
							$(this).attr( 'placeholder', '' );
							$(this).val( $(this).siblings('span').first().html() );
						}
					});
			}
			else if ($(this).children('textarea').length > 0) {
				$(this).children('textarea').first()
					.val( $(this).children('span').first().html() )
					.focus(function() {
						if ( $(this).val() == $(this).siblings('span').first().html() ) {
							$(this).attr( 'placeholder', $(this).siblings('span').first().html() );
							$(this).val( '' );
						}
					})
					.blur(function() {
						if ( $(this).val() == '' ) {
							$(this).attr( 'placeholder', '' );
							$(this).val( $(this).siblings('span').first().html() );
						}
					});
			}
			$(this).children('span').first().hide(200);
		});
		$('.home #register').animate({height: '408'}, 200, 'swing', function() {  });
		$('.error #register').animate({height: '465'}, 200, 'swing', function() {  });
		
		$.supersized({
			slideshow               :   1,			// Slideshow on/off
			autoplay				:	1,			// Slideshow starts playing automatically
			start_slide             :   1,			// Start slide (0 is random)
			stop_loop				:	0,			// Pauses slideshow on last slide
			random					: 	0,			// Randomize slide order (Ignores start slide)
			slide_interval          :   4000,		// Length between transitions
			transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
			transition_speed		:	1500,		// Speed of transition
			new_window				:	0,			// Image links open in new window/tab
			pause_hover             :   0,			// Pause slideshow on hover
			keyboard_nav            :   0,			// Keyboard navigation on/off
			performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
			image_protect			:	1,			// Disables image dragging and right click with Javascript
			
			// Size & Position						   
			min_width		        :   0,			// Min width allowed (in pixels)
			min_height		        :   0,			// Min height allowed (in pixels)
			vertical_center         :   0,			// Vertically center background
			horizontal_center       :   0,			// Horizontally center background
			fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
			fit_portrait         	:   0,			// Portrait images will not exceed browser height
			fit_landscape			:   0,			// Landscape images will not exceed browser width
			
			// Components							
			slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
			thumb_links				:	0,			// Individual thumb links for each slide
			thumbnail_navigation    :   0,
			slides : [
				{image : 'img/slide2.jpg', title : '', thumb : '', url : ''},
				{image : 'img/slide3.jpg', title : '', thumb : '', url : ''},
				{image : 'img/slide4.jpg', title : '', thumb : '', url : ''},
				{image : 'img/slide5.jpg', title : '', thumb : '', url : ''},
				{image : 'img/slide7.jpg', title : '', thumb : '', url : ''},
				{image : 'img/slide8.jpg', title : '', thumb : '', url : ''},
				{image : 'img/slide9.jpg', title : '', thumb : '', url : ''},
				{image : 'img/slide10.jpg', title : '', thumb : '', url : ''},
				

			]
		});
		
		$('#contact_form').submit(function(){
			var _return = true, msg = "", fld = "", cnt = 0;
			var name		= $("#first_name"),
				name2		= $("#last_name"),
				email		= $("#email"),
				phone		= $("#phone"),
				comments	= $("#comments");
			
			if ( name.val() == '' || name.val() == name.siblings('span').first().html() ) {
				if (fld == "") fld = name;
				msg += "- Please provide your first name.\n";
				cnt++;
				_return = false;
			}
			if ( name2.val() == '' || name2.val() == name2.siblings('span').first().html() ) {
				if (fld == "") fld = name2;
				msg += "- Please provide your last name.\n";
				cnt++;
				_return = false;
			}
			if ( email.val() == '' || email.val() == email.siblings('span').first().html() ) {
				if (fld == "") fld = email;
				msg += "- Please provide your email address.\n";
				cnt++;
				_return = false;
			}
			else if (validateEmailQuick(email.val()) == false) {
				if (fld == "") fld = email;
				msg += "- Invalid email address: "+email.val()+"\n";
				cnt++;
				_return = false;
			}
			
			if (!_return) {
				alert(msg);
				fld.focus();
			}
			else { // clear default values
				if (name.val() == name.siblings('span').first().html()) name.val('');
				if (name2.val() == name2.siblings('span').first().html()) name2.val('');
				if (email.val() == email.siblings('span').first().html()) email.val('');
				if (phone.val() == phone.siblings('span').first().html()) phone.val('');
				if (comments.val() == comments.siblings('span').first().html()) comments.val('');
			}
			return _return;
			
			function validateEmailQuick(email) {
				if (email.indexOf('@') < 0) return false;
				if (email.indexOf('.') < 0) return false;
				if (email.length < 7) return false;
				var testEmail = email.split('@');
				var domain = testEmail[1].split('.');
				if (testEmail[0] == null || testEmail[0].length < 1) return false;
				if (domain[0] == null || domain[0].length < 2) return false;
				if (domain[1] == null || domain[1].length < 2) return false;
				return true;
			}
		});
		
		$("#first_name").focus();
	});
	
	function shortScreenAdjustments() {
		if ($(window).innerHeight() < 540) {
			$('body').addClass('short-screen');
		}
		else {
			$('body').removeClass('short-screen');
		}
	}
})(jQuery);