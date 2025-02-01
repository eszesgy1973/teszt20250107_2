<?php
session_start();

unset( $_SESSION["kosar"][ $_POST["cikkszam"] ] );

echo json_encode("ok");
?>