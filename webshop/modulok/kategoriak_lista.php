<?php
$vissza=$kapcsolat->query("select * from kategoriak order by id");
while( $sor=mysqli_fetch_array($vissza) )
{
?>
	<div class="kategoria_elem" data-kategid="<?php echo($sor["id"]); ?>">
		<img class="kategoria_ikon" src="<?php echo($sor["ikon"]); ?>">
		<div class="kategoria_felirat"><?php echo($sor["megnevezes"]); ?></div>
	</div>
<?php
}
?>			
				
			