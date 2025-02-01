<?php
session_start();

$akt_db=$_SESSION["kosar"][$_POST["cikkszam"]]["db"];

$uj_db=$akt_db+$_POST["muvelet"];

if( $uj_db>0 )
{
	$_SESSION["kosar"][$_POST["cikkszam"]]["db"]=$uj_db;
}

echo json_encode("ok");
?>