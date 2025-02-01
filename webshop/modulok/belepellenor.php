<?php
session_start();

include("../connect.php");

$stmt=$kapcsolat->prepare("select * from vasarlok where email=? and jelszo=?");

$jelszo=md5($_POST["jelszo"]);

$stmt->bind_param("ss",$_POST["email"],$jelszo);

$stmt->execute();

$vissza=$stmt->get_result();

if( mysqli_num_rows($vissza)==1 )
{
	$sor=mysqli_fetch_assoc($vissza);
	
	$_SESSION["aktuser"]=$sor;
	
	$valasz=array("uzenet"=>"ok");
}
else
{
	$valasz=array("uzenet"=>"Sikertelen belépés!");
}

echo( json_encode($valasz) );
?>