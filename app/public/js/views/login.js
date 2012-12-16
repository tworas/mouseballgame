
$(document).ready(function(){
	
	var lv = new LoginValidator();
	var lc = new LoginController();

// Główna formularz logowania //

	$('#login-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{
				formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
            lv.showLoginError('Nieudane logowanie.', 'Prosze sprawic swoje haslo/login.');
		}
	}); 
	$('#user-tf').focus();
	
// zapomnialem hasla //
	
	var ev = new EmailValidator();
	
	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("<b> Blad!</b> Prosze wpisac poprawny adres email.");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			ev.showEmailSuccess("Sprawdz swoj email by dowiedzieć się jak zrestartować haslo.");
		},
		error : function(){
			ev.showEmailAlert("Przepraszam. Wystapil problem, spróbuj ponownie później.");
		}
	});
	
})