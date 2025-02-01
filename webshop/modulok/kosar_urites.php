<?php
session_start();

unset( $_SESSION["kosar"] );

echo( json_encode("ok") );
?>