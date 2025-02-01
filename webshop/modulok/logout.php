<?php
session_start();

unset( $_SESSION["aktuser"] );

echo( json_encode("ok") );
?>