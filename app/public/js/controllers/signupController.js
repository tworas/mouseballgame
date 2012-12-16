
function SignupController()
{
// przekierownie do strony glownej gdy zostanie przycisniety "anuluj" //
	$('#account-form-btn1').click(function(){ window.location.href = '/';});

// ustawienie interwalu by moc odczytac alert //
	$('.modal-alert #ok').click(function(){ setTimeout(function(){window.location.href = '/';}, 300)});
}