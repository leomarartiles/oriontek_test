/*
Author: OrionTek | Leomar
Contact: leomarartiles@gmail.com
File: Password Addon Js File
*/
// alertify.set('notifier','position', 'top-left');

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": 300,
    "hideDuration": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

// show password input value
$("#password-addon").on('click', function () {
	if ($(this).siblings('input').length > 0) {
		$(this).siblings('input').attr('type') == "password" ? $(this).siblings('input').attr('type', 'input') : $(this).siblings('input').attr('type', 'password');
	}
});

$(".btn-submit-login").on('click',function(){
	let userEmail = $("#username").val(),userPassword=$("#userpassword").val();

	// return false;
	var settings = {
		"url": '/auth-login',
		"method": "POST",
		"timeout": 0,
		"headers": { "Content-Type": "application/json" },
		"data": JSON.stringify({ "user_email": userEmail, "user_password": userPassword }),
	  };
	
	  $.ajax(settings).done(function (response) {
		if (response) {
			
			switch (response.status) {
			  	case "wrong-password":
					// alertify.error('Error: Contraseńa incorrecta.');
                    toastr["error"]("Error: Contraseńa incorrecta.");
					break;
				case "error-account":
					// alertify.error('Error: Este usuario no esta registrado.');
                    toastr["error"]("Error: Este usuario no esta registrado.");
					break;
				case "error":
						// alertify.error('Error: Este usuario no esta registrado.');
                        toastr["error"]("Error: Este usuario no esta registrado.");
						break;
		 		case "ok":
					localStorage.setItem('wt_bo_user_email', response.data.user_email);
					localStorage.setItem('wt_bo_user_user_fullname', response.data.user_fullname);
					// localStorage.setItem('wt_bo_user_user_companies', response.data.user_companies);
					localStorage.setItem('wt_bo_user_user_token', response.data.user_token);
					window.location.href = "/";
			}
		}
	  });
});
