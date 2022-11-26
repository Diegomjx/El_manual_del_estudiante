var btnAbrirPopup = document.getElementById('saveModel'),
	overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup'),
	btnCerrarPopup_ = document.getElementById('btn-cerrar-popup_');

	
 btnAbrirPopup.addEventListener('click', function(){
	overlay.classList.add('active');
	popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
}); 

btnCerrarPopup_.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
}); 

function Cerrarpoup() {
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
};

function Abrirpoup() {
	overlay.classList.add('active');
	popup.classList.add('active');
};

function ok(){
	Save();
}
