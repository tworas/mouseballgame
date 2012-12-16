
function LoginController()
{

// detektory zdarzen dot. klikniecia przycisku //
	
	$('#login-form #forgot-password').click(function(){ $('#get-credentials').modal('show');});
	
// auto ustawienie fokusa na email //

    $('#get-credentials').on('shown', function(){ $('#email-tf').focus(); });
	$('#get-credentials').on('hidden', function(){ $('#user-tf').focus(); });

}