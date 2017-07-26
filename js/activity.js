$(document).ready(function() {



	setInterval(function() {
		$(".logo").fadeTo(800, 0.5).fadeTo(800, 1.0);

	},1600);

	setTimeout(function() {
		$('.splashScreen').fadeOut(500);
	}, 6800);



	$('.cursor').click(function() {
		$('.spinAuth').toggleClass('flip');
	});



	localStorage.cyclouserid;


	if(localStorage.cyclouserid == "" || localStorage.cyclouserid == undefined || localStorage.cyclouserid == null) {
		$('.spinAuth').fadeIn();
		$('.wrapper').fadeOut();
	}
     

});
