window.onload=init;

//globale Variablen für das gesamte Spiel
counter = 0;         //Zählen der aufgedeckten Bilder, um das Spiel weiterzuspielen	
card = [];         	//um die Position von jeder Karte zu wissen
check_card = false; //Variable die zu true wird, wenn die Position definiert wurde, Zeile 12
used_card = [];    //um zu wissen, welche Karte bereits aufgedeckt wurde

function init(){
	var img=document.getElementsByTagName('img'); //alle Bilder werden angesprochen
	
	if (check_card == false){ //für den Zeitpunkt wurde die Vorderseite der Karte noch nicht platziert
		card_position(); //(Zeile 76) definiert die Position von jedem Bild, check_card wird also zu "true" dann macht es das für immer
		check_card = true;
	}
	
    for (var i = 0; i < img.length; i++) {
		var bild = img[i]; //alle Bilder
		bild.onclick = change_style(bild, i); // das Event Click wird bei jedem Bild ausgeführt 
    }
}

	function change_style(bild, i) {
		return function() {
			counter++ //counter = 0 wenn keine Karte aufgedeckt ist. Beim 1. Click -> counter = 1, also kommt man zum 1. if und die 1. Karte ist aufgedeckt.
				//Beim 2. Click -> counter = 2 also kommt man zu: 
			// dem 1. else if und man dreht die 2. Karte um.
			for(var j = 0; j < used_card.length; j++){ //überprüft ob eine Karte schon umgedreht wurde
				if (i == used_card[j]){
					alert('Haste schon geklickt!');
					counter = 0;
				}
			}
			if (counter == 1){ //1. if
				check1 = set_image(bild, i); // ersetzt rueckseite.jpeg mit einem passenden Bild und check1 = die 1. Karte, die umgedreht wird
				save_i = i; // um die Position von der 1. umgedrehten Karte zu kennen
				tmp = bild; // temporäre, um die .src von der 1. Karte ändern und ansprechen zu können
			}
			else if (counter == 2){ //Beim 2. Click -> counter = 2 also kommt man zu: dem 1. else if und man dreht die 2. Karte um.
				check2 = set_image(bild, i);
			}
			if (counter == 2 && check1 != check2){ //wenn 2 Karten umgedreht wurden, aber verschieden sind 
				setTimeout(function() {zeige_rueckseite(bild, tmp);}, 1000) // durch setTimeout muss man 1000 ms warten damit wieder rueckseite.jpeg kommt wenn die Karten unterschieldich sind
			}
			else if(counter == 2 && check1 == check2){ //wenn die Karten gleich sind, sollen sie umgedreht bleiben
				used_card.push(save_i); // push fügen die Nummer der umgedrehten Karte hinzu
				//fügt die Anzahl der Karte im Array hinzu, welche gleich sind, und überprüft, ob die Karten bereits geklickt wurden
				used_card.push(i);
				counter = 0;
				}
			if (used_card.length == 16){ //wenn alle Karten umgedreht sind, hat das Array eine Länge von 16, also hat man gewonnen
				alert('Du hast gewonnen. Du bist ein waschechter Magyóristaner!');
			}
		}
	}
		 
	function zeige_rueckseite(bild, tmp){ //function zum umdrehen, damit wieder rueckseite.jpeg da ist, wenn 2 Karten unterschiedlich sind
			 bild.src='../website_magyoristan/img_memory/rueckseite.jpg'; //gehört zum 2. Bild was angeklickt wurde
			 tmp.src='../website_magyoristan/img_memory/rueckseite.jpg'; //gehört zum 1. Bild was angeklickt wurde
			counter = 0;
	}

function set_image(bild, i){
	check = card[i - 2]; //  um bei dem Bild Nummer 2 anzufangen. Bild 0 = Logo, Bild 1 = Header
	if (check == 0){bild.src='../website_magyoristan/img_memory/memory_auto.jpg';} //jede Nummer gehört zu einem Bild und es gibt 2mal jede Nummer, da gleiche Paare (0, 2, 4, 6, 8, 10, 12, 14)
	else if (check == 2){bild.src='../website_magyoristan/img_memory/memory_essen.jpg';}
	else if (check == 4){bild.src='../website_magyoristan/img_memory/memory_bergziege.jpg';}
	else if (check == 6){bild.src='../website_magyoristan/img_memory/memory_pferd.jpg'}
	else if (check == 8){bild.src='../website_magyoristan/img_memory/memory_kernreaktor.jpg'}
	else if (check == 10){bild.src='../website_magyoristan/img_memory/memory_plattenbau.jpg'}
	else if (check == 12){bild.src='../website_magyoristan/img_memory/memory_wildschweinjagd.jpg'}
	else if (check == 14){bild.src='../website_magyoristan/img_memory/memory_ziegenkopf.jpg'}
	return check; //gibt den Wert der Karte wieder
}
	
function card_position(){

	x = Math.floor((Math.random() * 10) + 1); // aufgrund von random ist die Verteilung von 0 < x < 10 zufällig
	card = [2, 8, 12, 2, 4, 8, 0, 10, 12, 10, 0, 14, 6,14, 6, 4]; // Position der Bildnummern
	if (x > 5 && x <= 10){card.reverse();} // wenn 5 < x < 10 dann umgekehrt, invertiert
}