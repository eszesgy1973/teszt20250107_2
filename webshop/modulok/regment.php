<?php
session_start();

include("../connect.php");

$stmt=$kapcsolat->prepare("insert into vasarlok (nev,email,jelszo) values( ?,?,? )");

$jelszo=md5($_POST["jelszo"]);

$stmt->bind_param("sss",$_POST["nev"],$_POST["email"],$jelszo);

$stmt->execute();

$vissza=$kapcsolat->query("select * from vasarlok order by id DESC");

$sor=mysqli_fetch_assoc($vissza);

$_SESSION["aktuser"]=$sor;

echo( json_encode("ok") );
?>