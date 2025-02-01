<?php
session_start();

include("../connect.php");

$kapcsolat->query("update vasarlok set ".$_POST["mezo"]."='".$_POST["adat"]."' where id='".$_POST["id"]."'");

$_SESSION["aktuser"][$_POST["mezo"]]=$_POST["adat"];

echo(json_encode("ok"));
?>