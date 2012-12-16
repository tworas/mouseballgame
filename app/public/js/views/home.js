
$(document).ready(function(){

	var hc = new HomeController();
	var av = new AccountValidator();
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (av.validateForm() == false){
				return false;
			} 	else{
				formData.push({name:'user', value:$('#user-tf').val()})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') hc.onUpdateSuccess();
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
	$('#github-banner').css('top', '41px');

// ustawienia konta //
	
	$('#account-form h1').text('Ustawienia konta');
	$('#account-form #sub1').text('Oto aktualne ustawienia dotyczące konta.');
	$('#user-tf').attr('disabled', 'disabled');
	$('#account-form-btn1').html('Usun');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Aktualizuj');

// potwierdzenie usuniecia konta//

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h3').text('Usuniecie konta');
	$('.modal-confirm .modal-body p').html('Czy jesteś pewien, że chcesz usunąć swoje konto?');
	$('.modal-confirm .cancel').html('Anuluj');
	$('.modal-confirm .submit').html('Usun');
	$('.modal-confirm .submit').addClass('btn-danger');

})