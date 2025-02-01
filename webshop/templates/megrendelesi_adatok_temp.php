<?php
session_start();

if( !isset($_SESSION["aktuser"]) ) //ha nincs belépve
{
?>
<DIV class="megrendelesi_adatok_doboz">
	<INPUT type="text" id="nev" class="urlap_mezo" placeholder="Név...">
	<INPUT type="text" id="email" class="urlap_mezo" placeholder="E-mail...">
	<INPUT type="text" id="mobilszam" class="urlap_mezo" placeholder="Mobilszám...">
</DIV>
<?php
}
?>

<SELECT id="fizetesi_mod" class="urlap_mezo">
	<OPTION value="0">Fizetési mód</OPTION>
	<OPTION value="1">Utalás</OPTION>
	<OPTION value="2">Utánvét</OPTION>
	<OPTION value="3">Simplepay</OPTION>
</SELECT>

<SELECT id="szallitasi_mod" class="urlap_mezo">
	<OPTION value="0">Szállítási mód</OPTION>
	<OPTION value="1">Személyes átvétel</OPTION>
	<OPTION value="2">Csomagpont</OPTION>
	<OPTION value="3">Futár</OPTION>
</SELECT>

<DIV class="vegleges_fizetendo">
</DIV>

<DIV>
	<BUTTON id="megrendeles_elkuldese_gomb">Megrendelés elküldése</BUTTON>
</DIV>