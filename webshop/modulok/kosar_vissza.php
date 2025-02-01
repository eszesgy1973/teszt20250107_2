<?php
session_start();

if( !isset( $_SESSION["kosar"] ) )
{
	$_SESSION["kosar"]=array();
}

$valasz=array( "tetelek_szama"=>count($_SESSION["kosar"]) , "tetelek"=>$_SESSION["kosar"] );

echo( json_encode( $valasz ) );
?>