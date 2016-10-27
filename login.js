$(document).ready( function () { 
	$("#submit").click( function() {					 
		$.ajax({ 
		   type: "POST", 
		   url: "login_pdo.php", 
		   data: "username="+$("#username").val()+"&pass="+$("#password").val(),
		   success: function(msg){ 
				if(msg==1)
				{
					$("#res").html("<p>You will be logged in</p>");
					window.location.href="GlassfrogQuery.html"
				}
				else
				{
					$("#res").html("<p>Connexion error, wrong login or password!</p>");
					document.getElementById("username").value="";
					document.getElementById("password").value="";
				}
		   }
		});
		return false;
	});
})