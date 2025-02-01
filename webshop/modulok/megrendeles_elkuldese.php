<?php
session_start();

include("../connect.php");

//anonim vásárlás esetén
if( !isset( $_SESSION["aktuser"] ) ) //ha nincs belépve
{
	//a megadott email cím regisztrált-e?
	$email_ellenor=$kapcsolat->query("select * from vasarlok where email='".$_POST["email"]."'");
	
	if( mysqli_num_rows($email_ellenor) == 1 ) //megtalálta
	{
		$sor=mysqli_fetch_array($email_ellenor);
		
		$aktuser=$sor["id"];
	}
	else //regisztráljuk mint új vásárló
	{
		$stmt=$kapcsolat->prepare("insert into vasarlok (nev,email,mobilszam,jelszo) values(?,?,?,?)");
		
		$jelszo=md5("abrakadabra");
		
		$stmt->bind_param("ssss",$_POST["nev"],$_POST["email"],$_POST["mobilszam"],$jelszo);
		
		$stmt->execute();
		
		$vissza=$kapcsolat->query("select * from vasarlok order by id DESC limit 0,1");
		
		$sor=mysqli_fetch_array( $vissza );
		
		$aktuser=$sor["id"];
	}
}
else //ha nem anonim módon vásárol
{
	$aktuser=$_SESSION["aktuser"]["id"];
}

//megrendelés törzsadatainak mentése
$stmt=$kapcsolat->prepare("insert into megrendelesek (idopont,vasarlo_id,fizetesi_mod,szallitasi_mod) values(now(),?,?,?)");

$stmt->bind_param("ddd", $aktuser , $_POST["fizetesi_mod"] , $_POST["szallitasi_mod"] );

$stmt->execute();

$vissza=$kapcsolat->query("select * from megrendelesek order by megrend_id DESC limit 0,1");
		
$sor=mysqli_fetch_array( $vissza );

//megrendelési tételek mentése
foreach( $_SESSION["kosar"] as $tetel )
{
	$stmt->prepare("insert into megrendelesi_tetelek (cikkszam,db,ar,megrend_id) values(?,?,?,?)");
	
	$stmt->bind_param("dddd" , $tetel["cikkszam"],$tetel["db"],$tetel["ar"],$sor["megrend_id"]);
	
	$stmt->execute();
}

echo( json_encode( $aktuser ) );
?>
