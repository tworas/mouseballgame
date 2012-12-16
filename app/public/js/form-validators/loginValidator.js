
function LoginValidator(){

	this.loginErrors = $('.modal-alert');
	this.loginErrors.modal({ show : false, keyboard : true, backdrop : true });

	this.showLoginError = function(t, m)
	{
		$('.modal-alert .modal-header h3').text(t);
		$('.modal-alert .modal-body p').text(m);
		this.loginErrors.modal('show');
	}

}

LoginValidator.prototype.validateForm = function()
{
	if ($('#user-tf').val() == ''){
		this.showLoginError('Ups!', 'Prosze wprowadzić poprawna nazwe uzytkownika.');
		return false;
	}	else if ($('#pass-tf').val() == ''){
		this.showLoginError('Ups!', 'Prosze wprowadzic poprawne haslo.');
		return false;
	}	else{
		return true;
	}
}