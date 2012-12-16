
$(document).ready(function(){
	
	var av = new AccountValidator();
	var sc = new SignupController();
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
			    av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
			    av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();
	
// formularz rejestracyjny  //
	
	$('#account-form h1').text('Zarejestruj się');
	$('#account-form #sub1').text('Powiedz cos wiecej o sobie');
	$('#account-form #sub2').text('Wybierz swoją nazwę użytkownika i hasło');
	$('#account-form-btn1').html('Anuluj');
	$('#account-form-btn2').html('Dodaj');
	$('#account-form-btn2').addClass('btn-primary');
	
// alert sukcesu //

	$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Succes!');
	$('.modal-alert .modal-body p').html('Twoje konto zostało utworzone.</br>Kliknij przycisk OK, aby powrócić do strony logowania.');

})