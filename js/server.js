$(document).ready(function() {


		//var provider = new firebase.auth.GoogleAuthProvider();



		const auth = firebase.auth();
		const db = firebase.database();

		auth.onAuthStateChanged(function(user) {
		  if (user) {
		  		loggedIn();

		  		var uid = auth.currentUser.uid;
		  		useremail = auth.currentUser.email;

		  		$('.logout').click(function() {
		  			auth.signOut();
		  		});

		  		localStorage.cyclouserid = uid;


		  		db.ref().child('users/' + uid).on("value", snapshot => {

		  			  var username = snapshot.val().name;
		  			  var email = snapshot.val().email;
		  			  var addr = snapshot.val().address;
		  			  var phone = snapshot.val().mobile;
		  			  var tV = snapshot.val().telVerified;



		  		});



		  }
		  else {

		  		notLoggedIn();

		  		$('.registerBtn').click(function() {
		  			var username = $('.registerName').val();
		  			var email = $('.registerEmail').val();
		  			var password = $('.registerPass').val();
		  			var rpassword = $('.repeatRegisterPass').val();
		  			var phone = $('.registerNumber').val();
		  			var address = $('.registerAddress').val();

		  			$('.registerBtn').html("Updating Database...");
		  			$('.registerError').hide();

		  			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


		  			createUser(username, email, password, rpassword, phone, address, filter);
		  			


		  		});


		  		$('.loginBtn').click(function() {
		  			var email = $('.loginEmail').val();
		  			var password = $('.loginPass').val();

		  			$('.loginBtn').html("Authenticating...");
		  			$('.loginError').hide();

		  			signInUser(email, password);
		  		});




		  }


		});

















		//functions

		function loggedIn() {
			$('.spinAuth').fadeOut();
			$('.wrapper').fadeIn();
		}

		function notLoggedIn() {
			$('.spinAuth').fadeIn();
			$('.wrapper').fadeOut();
		}

		function createUser(username, email, password, rpassword, phone, address, filter) {
				if(password != rpassword) {
		  				$('.registerBtn').html('REGISTER');
		  				$('.registerError').show().html("Both passwords don\'t match.");
		  			}
		  			else if(username == "" || email == "" || password == "" || phone == "" || address == "") {
		  				$('.registerBtn').html('REGISTER');
		  				$('.registerError').show().html("All fields must be filled");
		  			}
		  			else if(!filter.test(email)) {
		  				$('.registerBtn').html("REGISTER");
		  				$('.registerError').show().html("Please provide a valid email address");
		  				$('.registerEmail').focus();
		  			}
		  			else {
		  				auth.createUserWithEmailAndPassword(email, password).then(function() {

		  					$('.registerBtn').html("REGISTER");

		  					auth.onAuthStateChanged(function(user) {
		  							var uid = auth.currentUser.uid;

		  							if(user) {
		  								db.ref().child('users/' + uid).set({
					  						name: username,
					  						email: email,
					  						mobile: phone,
					  						address: address,
					  						telVerified: false
		  								});
		  							}
		  					});


		  					$('.registerName').val("");
		  					$('.registerEmail').val("");
		  					$('.registerPass').val("");
		  					$('.repeatRegisterPass').val("");
		  					$('.registerNumber').val("");
		  					$('.registerAddress').val("");

		  					localStorage.cycloUserPass = password;

		  					

			  			}).catch(function(error) {
						  // Handle Errors here.
						  var errorCode = error.code;
						  var errorMessage = error.message;
							   	
						  $('.registerBtn').html("REGISTER");

						  if(errorCode == "auth/email-already-in-use") {
						  	 $('.registerError').html("This Email is already in use by another user").show();
						  }
						  else if(errorCode == "auth/network-request-failed") {
						  	 $('.registerError').html("Issues esthablishing network connection. Please your internet access.").show();
						  }
						  else {
						  	  $('.registerError').html(errorCode).show();
						  }
						  

							
						  // ...
						});
		  			}
		}



		function signInUser(email, password) {


			if(email == "" || password == "") {
				$('.loginBtn').html("LOG IN");
			}
			else {
				auth.signInWithEmailAndPassword(email, password).then(function() {
					$('.loginBtn').html("LOG IN");

					$('.loginEmail').val("");
					$('.loginPass').val("");

					localStorage.cycloUserPass = password;

				}).catch(function(error) {
					// Handle Errors here.
							  var errorCode = error.code;
							  var errorMessage = error.message;
								   	
							  $('.loginBtn').html("LOG IN");

							  if(errorCode == "auth/user-not-found") {
							  	 $('.loginError').html("This Email and Password combination is incorrect").show();
							  }
							  else if(errorCode == "auth/network-request-failed") {
							  	 $('.loginError').html("Issues esthablishing network connection. Please your internet access.").show();
							  }
							  else {
							  	  $('.loginError').html(errorMessage).show();
							  }
				});
			}
			
		}



     

});
