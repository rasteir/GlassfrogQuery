<?php
try {
	$bdd = new PDO('mysql:host=localhost;dbname=glassfrog;charset=utf8', 'root', 'root');
} catch (Exception $e) {
	die('Database access error : ' . $e->getMessage());
}
	
$request = $bdd->query("SELECT g_user,g_pswd FROM g_credentials WHERE g_user= '$_POST[username]'");
$member = $request->fetch();

if(($_POST[username]==$member[g_user])&&($_POST[pass]==$member[g_pswd]))
{
	echo "1";
}
else 
{
	echo "0";
}
?>