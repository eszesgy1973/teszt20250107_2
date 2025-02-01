<?php
session_start();

if(!isset($_SESSION["aktuser"]))
{
	$valasz=array("belepve"=>false);
}
else
{
	$valasz=array("belepve"=>$_SESSION["aktuser"]);
}

echo( json_encode($valasz) );
?>