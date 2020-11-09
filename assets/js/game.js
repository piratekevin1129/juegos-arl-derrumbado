var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function unorderArray(lon){
	var unorder_array = []
	while(unorder_array.length<lon){
		var n = getRand(0,(lon-1))
		if(!unorder_array.includes(n)){
			unorder_array.push(n)
		}
	}
	return unorder_array
}

var game = getE('game')
var game_scene = getE('game-scene')
game_scene.style.visibility = 'hidden'
var game_rect = game.getBoundingClientRect()

function setInstrucciones(start){
	var html = ''
	/*if(ismobile){
		html+='<div class="modal-instrucciones-gif"><div onclick="setVideoInstrucciones(this)"><video loop><source type="video/mp4" src="assets/images/instrucciones_sp.mp4" /></video><button></button></div></div>'
	}else{
		html+='<div class="modal-instrucciones-gif"><div onclick="setVideoInstrucciones(this)"><video loop><source type="video/mp4" src="assets/images/instrucciones_pc.mp4" /></video><button></button></div></div>'
	}*/
	
	html+='<p>haz clic en las letras para descubrir la palabra oculta.</p>'
	html+='<p>solo tienes <span>5</span> oportunidades, si pierdes Juan se caerá de la edificación.</p>'
	
    if(start){
    	setModal({
	    	close:false,
			title:'EL DERRUMBADO',
			content:html,
			button:true,
			value:'jugar',
			action:'empezarJuego'
	    })
    }else{
    	//para el botón de ayuda (no tiene)
    }
}

function setAudio(){
	//anular audio actual
	if(underground_mp3!=null){
		underground_mp3.pause()
		underground_mp3.removeEventListener('ended', repetirAudio, false)
		underground_mp3 = null
	}

	underground_mp3 = new Audio('assets/media/background.mp3')
	//underground_mp3.currentTime = 0
	underground_mp3.play()
	underground_mp3.addEventListener('ended', repetirAudio, false)
}
function repetirAudio(e){
	underground_mp3.play()
}

var animacion_swipe = null
function empezarJuego(){
	getE('cargador').className = 'cargador-on'
	getE('cargador_txt').innerHTML = 'Iniciando'
	unsetModal(function(){
		game_scene.style.visibility = 'visible'
		getE('home-scene').style.display = 'none'

		/*setTooltip({
			content:'<p><span>¡Viste a Juan para '+oficios[actual_job].name+'!</span><br />Haz clic en las puertas de los casilleros y arrastra  la prenda hacia Juan.</p>',
			delay:4000
		})*/
		
		getE('cargador').className = 'cargador-off'
		setAudio()
		startGame()		
	})
}

var letras = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];
var letras_col = [5,6,5,6,5]
var oportunidades = 5

function setGame(){
	var l = 0
	for(i = 0;i<letras_col.length;i++){
		var longitud = letras_col[i]
		var col = document.createElement('div')
		col.className = 'letra-col'
		for(j = 0;j<longitud;j++){
			var div = document.createElement('div')
			div.className = 'ladrillo'
			div.innerHTML = '<p>'+letras[l]+'</p>'
			col.appendChild(div)
			l++
		}
		getE('letras-content').appendChild(col)
	}

	for(i = 0;i<oportunidades;i++){
		var div2 = document.createElement('div')
		div2.className = 'incorrecta-txt'
		getE('incorrectas-content').appendChild(div2)
	}

	////////AQUI EMPIEZA TODOO///////
		
	animation_start = setTimeout(function(){
		clearTimeout(animation_start)
		animation_start = null

		getE('cargador').className = 'cargador-off'	
		setInstrucciones(true)
	},1000)
}

function startGame(){
	
}



////////////////GAME FUNCTIONS///////////////////////

function endGame(){
	
}

function repeatGame(){//repetir por ganar el juego
	location.reload()
	//unsetModal(function(){
		
	//})
}

function reiniciarJuego(){//reiniciar, por acabarse el tiempo
	
}

function continuarJuego(){
	
}
function seguirJuego(){//funcion para el modal
	unsetModal(function(){
		continuarJuego()
	})
}

function getE(idname){
	return document.getElementById(idname)
}

function clickAudio(btn){
	if(btn.className=='music-on'){
		underground_mp3.volume = 0
		btn.className = 'music-off'
	}else{
		underground_mp3.volume = 1
		btn.className = 'music-on'
	}
}