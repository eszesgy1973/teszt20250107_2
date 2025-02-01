$(document).ready(
function()
{
	belepve();
	
	
	$(".kategoria_elem").click(
	function()
	{
		$(".kategoria_elem").removeClass("kategoria_elem_aktiv");
		
		$(this).addClass("kategoria_elem_aktiv");
		
		//alert( $(this).data("kategid") );
		termekek_vissza( $(this).data("kategid") );
	});
	
	termekek_vissza(0); //0 -> kategória függetlenül csak a kiemelt termékek
	
	$("#univ_kereso").keydown(
	function(e)
	{
		if(e.keyCode==13)
		{
			termekek_vissza( -1,$(this).val() );
		}
	});
	
	//HF-> A kulcsszavas keresés működjön a keresés gombra kattintva is
	
	$(".user_ikonok").click(
	function()
	{
		$(".user_legordulo").toggle("slide",300);
		/*jqueryui.com*/
	});
	
	$(document).click( //globális kattintás eseménye
	function(e)
	{
		//a kattintott objektum mutatója -> $(e.target)
		//alert( $(e.target).prop("tagName") ); //a típus elérése
		//alert( $(e.target).attr("class") ); //az osztály elérése
		
		if( 
			!$(".user_ikonok").find("*").hasClass( $(e.target).attr("class") ) 
			&&
			!$(".user_legordulo").find("*").hasClass( $(e.target).attr("class") ) 
		  )
		{
			$(".user_legordulo").hide();
		}
		
	});
	
});

function belepve(belepve_callback)
{
	if( belepve_callback )
	{
		//alert("ok");
		$.ajax(
		{
			url:"modulok/belepve.php"
			,
			type:"POST" //adatküldés módja
			,
			dataType:"json" //válasz formátuma
			,
			data:{} //átküldendő adatok
			,
			success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
			{
				belepve_callback(vissza.belepve);
			}
		});
	}
	else
	{
	
	$(".user_legordulo").empty();
	
	$.ajax(
	{
		url:"modulok/belepve.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:{} //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			if( vissza.belepve==false )
			{
				$.get("templates/user_belepes_temp.php",function(visszatemp)
				{
					var tempobj=$().add(visszatemp);
					
					tempobj.appendTo( $(".user_legordulo") );
					
					tempobj.find("#reg_gomb").click(
					function()
					{
						regisztracio();
					});
					
					tempobj.find("#belepes_gomb").click(
					function()
					{
						belepes_ellenor();
					});
				});
				
				$(".fiokom_felirat").html( "Fiókom" );
			}
			else
			{
				$(".fiokom_felirat").html( vissza.belepve.nev );
				
				$.get("templates/user_menu.php" , function(visszatemp)
				{
					var tempobj=$().add(visszatemp);
					
					tempobj.appendTo( $(".user_legordulo") );
					
					tempobj.find("#kilepes").click(
					function()
					{
						kilepes();
					});
					
					tempobj.find("#padatok").click(
					function()
					{
						profil_adatok();
					});
					
					tempobj.find("#rendeleseim").click(
					function()
					{
						rendeleseim();
					});
					
				});
			}
		}
	});
	
	}
}


function rendeleseim()
{
	$.ajax(
	{
		url:"modulok/rendelesek_vissza.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:{} //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			
		}
	});
}


function profil_adatok()
{
	//a belepve függvény paraméterként átvesz egy visszahívásra váró függvényt amit a művelet befejezése után hív meg a belepve függvény
	belepve( 
		function(belepett_vasarlo) {
			//console.log(belepett_vasarlo);
			$(".termekek_doboz").empty();
			
			$.get("templates/vasarlo_profil_temp.php",function(visszatemp)
			{
				var tempobj=$().add(visszatemp);
				
				tempobj.appendTo($(".termekek_doboz"));
				
				$.each( belepett_vasarlo , function(mezo,adat)
				{
					tempobj.find("."+mezo).html(adat);
					
					tempobj.find("."+mezo).data("mezo",mezo);
					
					tempobj.find("."+mezo).data("adat",adat);
					
					tempobj.find("."+mezo).data("id",belepett_vasarlo.id);
				});
				
				tempobj.find(".fa-pencil").click(
				function()
				{
					mezo_szerkeszt( $(this) );
				});
			});
		}
	);
}


function mezo_szerkeszt( ikon )
{
	var aktual_mezo=ikon.parent().find(".adatmezo");
	
	//console.log( aktual_mezo.data() );
	if( aktual_mezo.find(".szerk_mezo").length==0 )
	{
		aktual_mezo.html("");
		
		var szerk_mezo=$("<input type='text' class='szerk_mezo'>");
		
		szerk_mezo.val( aktual_mezo.data("adat") );
		
		szerk_mezo.appendTo( aktual_mezo );
		
		szerk_mezo.focus();
		
		szerk_mezo.blur(
		function()
		{
			var kuld_adatok=
			{
				id:aktual_mezo.data("id")
				,
				mezo:aktual_mezo.data("mezo")
				,
				adat:$(this).val().trim()
			};
			
			console.log( kuld_adatok );
			
			aktual_mezo.html($(this).val().trim());
			aktual_mezo.data("adat",$(this).val().trim());
			
			$(this).remove();
			
			//módosított adat mentése
			
			$.ajax(
			{
				url:"modulok/profil_adat_mentese.php"
				,
				type:"POST" //adatküldés módja
				,
				dataType:"json" //válasz formátuma
				,
				data:kuld_adatok //átküldendő adatok
				,
				success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
				{
					belepve();
				}
			});
			
			//
			
		});
	}
}


function belepes_ellenor()
{
	$.ajax(
	{
		url:"modulok/belepellenor.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:{ "email":$("#belepes_email").val() , "jelszo":$("#belepes_pass").val() } //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			if( vissza.uzenet=="ok")
			{
				belepve();
			}
			else alert(vissza.uzenet);
		}
	});
}


function kilepes()
{
	$.ajax(
	{
		url:"modulok/logout.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:{} //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			belepve();
			
			termekek_vissza(0);
		}
	});
}


function regisztracio()
{
	var ablak=$("<DIV title='Regisztráció'></DIV>");
	
	ablak.dialog(
	{
		modal:true
		,
		minWidth:400
		,
		position: { my: "top", at: "top", of: window } //tetejéhez igazítja
		,
		draggable:false //nem mozgatható
		,
		resizable:false //nem méretezhető
		,
		open:function() //ez a függvény az ablak megnyitását követően fut le
		{
			uj_vasarlo_kezelo( $(this) );
		}
		,
		close:function(){ $(this).remove(); }
	});
}


function uj_vasarlo_kezelo(ablak)
{
	$.get("templates/user_reg_urlap.php",function(visszatemp)
	{
		var tempobj=$().add(visszatemp);
		
		tempobj.appendTo( ablak );
		
		tempobj.find("#reg_gomb_mentes").click(
		function()
		{
			uj_vasarlo_adatok_ment(ablak);
		});
	});
}

function uj_vasarlo_adatok_ment(ablak)
{
	var mezok=ablak.find(".adat_mezo");
	
	var hiba=false;
	
	for( var i=0;i<mezok.length;i++ )
	{
		if( $(mezok[i]).val().trim() == "" )
		{
			hiba=true;
		}
	}
	
	if( hiba )
	{
		alert("Hiányzó adatok!");
	}
	else
	{
		var adatok={};
		
		for( var i=0;i<mezok.length;i++ )
		{
			adatok[ $(mezok[i]).data("mezo") ] = $(mezok[i]).val().trim();
		}
		
		//console.log( adatok );
		$.ajax(
		{
			url:"modulok/regment.php"
			,
			type:"POST" //adatküldés módja
			,
			dataType:"json" //válasz formátuma
			,
			data:adatok //átküldendő adatok
			,
			success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
			{
				ablak.dialog("close");
				
				belepve();
			}
		});
	}
}

function termekek_vissza(kategid,kulcsszo)
{
	$.ajax(
	{
		url:"modulok/termekek_vissza.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:{"kateg_id":kategid,"kulcsszo":kulcsszo} //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			//template lekérése
			$.get("templates/egy_termek_temp.php",function(visszatemp)
			{
				var tempobj=$().add(visszatemp);
				
				termekek_mutat(vissza,tempobj );
			});
		}
	});
}

function termekek_mutat( adatok,tempobj )
{
	$(".termekek_doboz").empty();
	
	$.each( adatok , function( idx,item )
	{
		var ujtermek=tempobj.clone(true,true); 
		
		ujtermek.find(".egy_termek_kep").attr("src","termek_kepek/"+item.kep);
		
		ujtermek.find(".egy_termek_nev").html(item.termeknev);
		
		ujtermek.find(".egy_termek_ar").html(item.kiir_ar+" Ft");
		
		ujtermek.appendTo( $(".termekek_doboz") );
		
		ujtermek.find(".egy_termek_kosarba").data("termek_adatok",item);
		
		ujtermek.find(".fa-shopping-cart").data("termek_adatok",item);
		
		ujtermek.click(
		function(e)
		{
			//console.log( $(e.target).attr("class") );
			if( $(e.target).hasClass("egy_termek_kosarba") || $(e.target).hasClass("fa-shopping-cart")  )
			{
				//console.log( $(e.target).data("termek_adatok") );
				kosarba_tesz( $(e.target).data("termek_adatok") );
			}
			else
			{
				egy_termek_vissza(item.cikkszam);
			}
		});
	});
}

function egy_termek_vissza(cikkszam)
{
	//alert(cikkszam);
	$.ajax(
	{
		url:"modulok/termekek_vissza.php"
		,
		type:"POST" //adatküldés módja
		,
		dataType:"json" //válasz formátuma
		,
		data:{"cikkszam":cikkszam} //átküldendő adatok
		,
		success:function( vissza ) //akkor fut le amikor a szerver válasz megérkezik
		{
			//template lekérése
			$.get("templates/onallo_termek_temp.php",function(visszatemp)
			{
				var tempobj=$().add(visszatemp);
				
				$(".termekek_doboz").empty();
				
				tempobj.find(".onallo_kep").attr("src","termek_kepek/"+vissza[0].kep);
				
				tempobj.find(".onallo_termeknev").html(vissza[0].termeknev);
				
				tempobj.find(".onallo_termekleiras").html(vissza[0].leiras);
				
				tempobj.find(".onallo_termekar").html(vissza[0].kiir_ar+" Ft");
				
				tempobj.appendTo( $(".termekek_doboz") );
			});
		}
	});
}



