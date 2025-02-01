<?php
session_start();

include("../connect.php");

$valasz=array();

$vissza_megrend=$kapcsolat->query("select * from megrendelesek where vasarlo_id='".$_SESSION["aktuser"]["id"]."'");

while( $sor = mysqli_fetch_assoc( $vissza_megrend ) )
{
	$valasz[ $sor["megrend_id"] ] = $sor;
	
	//lekérdezzük és hozzáadjuk a struktúrához az adott vásárlás tételeit
	$vissza_tetelek= $kapcsolat->query("select * from megrendelesi_tetelek where megrend_id='".$sor["megrend_id"]."'");
	
	$valasz[ $sor["megrend_id"] ]["tetelek"]=array();
	
	while( $sor_tetelek = mysqli_fetch_assoc( $vissza_tetelek ) )
	{
		array_push( $valasz[ $sor["megrend_id"] ]["tetelek"] , $sor_tetelek );
	}
}

echo json_encode($valasz);

?>