window.onload=init;

function init(){
	
	var logo=document.getElementById('logo');
	logo.onmouseover=changeImage1;
	logo.onmouseout=changeImage2;
}

function changeImage1 () {
	if (logo.src='../website_magyoristan/img/logo_magyoristan.png') 
		{
			logo.src='../website_magyoristan/img/logo_magyoristan_mouse.png';
			logo.title='Ich habe meine Farbe verändert!'
		}
}


function changeImage2 () {
		logo.src='../website_magyoristan/img/logo_magyoristan.png';
}