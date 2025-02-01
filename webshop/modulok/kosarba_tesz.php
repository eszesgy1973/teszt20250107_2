<?php
session_start();

if( isset( $_SESSION["kosar"][ $_POST["cikkszam"] ] ) ) //ha már létezik az adott cikkszam a kosar tömb-ben
{
	$_SESSION["kosar"][ $_POST["cikkszam"] ]["db"]++;
}
else
{
	$_SESSION["kosar"][ $_POST["cikkszam"] ]=$_POST;

	$_SESSION["kosar"][ $_POST["cikkszam"] ]["db"]=1;
}

echo( json_encode("ok") );
?>