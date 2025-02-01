<?php
include("../connect.php");

if( isset( $_POST["cikkszam"] ) )
{
	$pcs="select * from termekek where cikkszam=".$_POST["cikkszam"];
}
else if( $_POST["kateg_id"]==0 ) //kiemelt termékek
{
	$pcs="select * from termekek where kiemelt='1'";
}
else if( $_POST["kateg_id"]>0 )//a konkrét kategóriába tartozó termékek
{
	$pcs="select * from termekek where kategoria_id='".$_POST["kateg_id"]."'";
}
else //kulcsszavas keresés
{
	$pcs="select * from termekek where termeknev like '%".$_POST["kulcsszo"]."%'";
}

$vissza=$kapcsolat->query($pcs);

$valasz=array();

while( $sor=mysqli_fetch_assoc($vissza) )
{
	$sor["kiir_ar"]=number_format($sor["ar"],0,""," ");
	
	array_push( $valasz,$sor );
}

echo( json_encode($valasz) );
?>