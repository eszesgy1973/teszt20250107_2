$(document).ready(
function()
{
	$(".kosar_ikon_doboz").click(
	function()
	{
		$(".kosar_doboz").dialog(
		{
			modal:true
			,
			minWidth:600
			,
			minHeight:300
			,
			resizable:false
		}
		);
	});
	
	kosar_frissit();
});


function kosar_frissit()
{
	$.ajax(
	{
		url:"modulok/kosar_vissza.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:{} //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			kosar_mutat(vissza);
		}
	});
}

function kosar_mutat(kosar_tartalom)
{
	$(".kosar_tetelek_szama").html( kosar_tartalom.tetelek_szama );
	
	$(".kosar_doboz").empty();
	
	if( kosar_tartalom.tetelek_szama==0 )
	{
		$(".kosar_doboz").html("A kosár jelenleg üres!");
	}
	else
	{
		var kosar_urit= $("<DIV class='kosar_urites_gomb'>Kosár ürítése</DIV>");
		
		kosar_urit.appendTo( $(".kosar_doboz") );
		
		kosar_urit.click(
		function()
		{
			if( confirm("Valóban törölni akarja a kosár teljes tartalmát?") )
			{
				kosar_urites();
			}
		});
		
		var termekek_tabla=$("<TABLE style='width:90%'>");
		
		var mindosszesen=0;
		
		$.each( kosar_tartalom.tetelek , function(idx,item)
		{
			var ujsor=$("<TR>");
			
			$("<TD class='kosar_termek_doboz'>"+item.termeknev+"</TD>").appendTo(ujsor);
			$("<TD class='kosar_db_doboz'><button><i class='fa fa-minus'></i></button>&nbsp;"+item.db+" db&nbsp;<button><i class='fa fa-plus'></i></button></TD>").appendTo(ujsor);
			$("<TD class='kosar_ar_doboz'>"+(item.ar*item.db)+" Ft</TD>").appendTo(ujsor);
			
			mindosszesen+=item.ar*item.db;
			
			$("<TD class='kosar_tetel_torles'><i title='Tétel törlése' class='fa fa-trash'></i></TD>").appendTo(ujsor);
			
			ujsor.find(".kosar_tetel_torles").click(
			function()
			{
				kosar_tetel_torles(item.cikkszam);
			});
			
			ujsor.find(".fa-minus").click(
			function()
			{
				kosar_tetel_db(item.cikkszam,-1);
			});
			
			ujsor.find(".fa-plus").click(
			function()
			{
				kosar_tetel_db(item.cikkszam,1);
			});
			
			ujsor.appendTo( termekek_tabla );
		});
		
		termekek_tabla.appendTo( $(".kosar_doboz") );
		
		$("<HR><DIV class='fizetendo_doboz'>Fizetendő: <B>"+mindosszesen+" Ft</B></DIV>").appendTo( $(".kosar_doboz") );
		
		$("<HR><BUTTON class='megrendeles_gomb'>Megrendelem</BUTTON>").appendTo( $(".kosar_doboz") );
		
		$(".kosar_doboz").find(".megrendeles_gomb").click(
		function()
		{
			megrendelesi_adatok(mindosszesen);
		});
		
	}
}

function megrendelesi_adatok(mindosszesen)
{
	var megrendelesi_adatok_ablak=$("<DIV title='Megrendelés véglegesítése'></DIV>");
	
	megrendelesi_adatok_ablak.dialog(
	{
		modal:true
		,
		minWidth:400
		,
		resizable:false
		,
		open:function()
		{
			megrendelesi_adatok_editor( $(this),mindosszesen );
		}
		,
		close:function()
		{
			$(this).remove();
		}
		,
		position:{my: "top", at: "top", of: window}
	});
}

function megrendelesi_adatok_editor(ablak,mindosszesen)
{
	//ablak.html("ok");
	$.get("templates/megrendelesi_adatok_temp.php",function(visszatemp)
	{
		var tempobj=$().add(visszatemp);
		
		tempobj.appendTo( ablak );
		
		ablak.find(".vegleges_fizetendo").html(mindosszesen+" Ft");
		
		ablak.find("#megrendeles_elkuldese_gomb").click(
		function()
		{
			megrendeles_elkuldese(ablak);
		});
	});
}

function megrendeles_elkuldese(urlap)
{
	var kuld_adatok={};
	
	var mezok=urlap.find(".urlap_mezo");
	
	for( var i=0;i<mezok.length;i++ )
	{
		kuld_adatok[ $(mezok[i]).attr("id") ] = $(mezok[i]).val();
	}
	
	//console.log( kuld_adatok );
	$.ajax(
	{
		url:"modulok/megrendeles_elkuldese.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:kuld_adatok //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			//előugró ablakok bezárása + kosár ürítése
			alert("Megrendelését fogadtuk! Köszönjük a vásárlást!");
			
			urlap.dialog("close");
			
			$(".kosar_doboz").dialog("close");
			
			kosar_urites();
		}
	});
}


function kosar_tetel_db(cikkszam,muvelet)
{
	$.ajax(
	{
		url:"modulok/kosar_tetel_db.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:{"cikkszam":cikkszam,"muvelet":muvelet} //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			kosar_frissit();
		}
	});
	
}


function kosar_tetel_torles(cikkszam)
{
	//alert(cikkszam);
	$.ajax(
	{
		url:"modulok/kosar_tetel_torles.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:{"cikkszam":cikkszam} //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			kosar_frissit();
		}
	});
}

function kosarba_tesz( termek_adatok )
{
	$(".kosar_doboz").dialog(
		{
			modal:true
			,
			minWidth:600
			,
			minHeight:300
			,
			resizable:false
		}
		);
	
	$.ajax(
	{
		url:"modulok/kosarba_tesz.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:termek_adatok //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			kosar_frissit();
		}
	});
}



function kosar_urites()
{
	$.ajax(
	{
		url:"modulok/kosar_urites.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:{} //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			kosar_frissit();
		}
	});
}