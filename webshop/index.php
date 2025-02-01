<!doctype html>
<html>
	<head>
		<title>Komplex MVC példa</title>
		
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		
		<script type="text/javascript" src="jquery/jquery-1.8.2.js"></script>
		
		<script type="text/javascript" src="jquery/jquery-ui-1.9.1.custom.js"></script>
		
		<link rel="stylesheet" type="text/css" href="jquery/jquery-ui-1.9.1.custom.css">
		
		<link rel="stylesheet" type="text/css" href="css/stilus.css">
		
		<script type="text/javascript" src="js/webshop.js"></script>
		
		<script type="text/javascript" src="js/kosarkezelo.js"></script>
	</head>
	<body>
		<header class="banner_keret">
			<?php
			include("connect.php");
			
			include("modulok/banner_tartalom.php");
			?>
		</header>
		
		<section class="fotartalom">
			<section class="kategoriak_doboz">
				<?php
					include("modulok/kategoriak_lista.php");
				?>
			</section>
			
			<section class="termekek_doboz">
			
			</section>
		</section>
		
		<div class="kosar_doboz" title="Kosár tartalma">
		
		</div>
		
	</body>
</html>			