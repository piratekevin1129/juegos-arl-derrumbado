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
	
	html+='<p>En el siguiente juego deberás decifrar el Equipo de protección personal.</p>'
	html+='<p>Haz clic en las letras para descubrir la palabra oculta.</p>'
	html+='<p>Solo tienes <span>5</span> oportunidades, si pierdes Juan se caerá de la edificación.</p>'
	
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
	if(toggle_audio=='on'){
		underground_mp3.volume = 0.2
	}else{
		underground_mp3.volume = 0
	}	
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
var letras_col = [3,5,4,5,4,6]
var oportunidades = 5
var intentos = 0

function setGame(){
	var l = 0
	for(i = 0;i<letras_col.length;i++){
		var longitud = letras_col[i]
		var col = document.createElement('div')
		col.className = 'letra-col'
		for(j = 0;j<longitud;j++){
			var div = document.createElement('div')
			div.className = 'ladrillo ladrillo_unused'
			div.id = 'ladrillo-'+l
			div.setAttribute('used','no')
			div.setAttribute('onclick', 'clickLetra("'+letras[l]+'",this)')
			div.innerHTML = '<p>'+letras[l]+'</p>'
			col.appendChild(div)
			l++
		}
		getE('letras-content').appendChild(col)
	}

	for(i = 0;i<oportunidades;i++){
		var div2 = document.createElement('div')
		div2.className = 'incorrecta-txt'
		div2.id = 'incorrecta-txt-'+i
		getE('incorrectas-content').appendChild(div2)
	}

	palabras_aleatorias = unorderArray(palabras_disponibles.length)

	////////AQUI EMPIEZA TODOO///////
		
	animation_start = setTimeout(function(){
		clearTimeout(animation_start)
		animation_start = null

		getE('cargador').className = 'cargador-off'	
		setInstrucciones(true)
	},1000)
}

var palabra_actual = null
var palabra_actual_array = []
var p_actual = 0
var palabras_aleatorias = []
var palabra_actual_str = []

function startGame(){
	palabra_actual = palabras_disponibles[palabras_aleatorias[p_actual]]
	palabra_actual_array = palabra_actual.word.split("")
	setPalabra()
}
function setPalabra(){
	for(i = 0;i<palabra_actual_array.length;i++){
		var div = document.createElement('div')
		div.className = 'letter'
		div.id = 'letter-'+i
		getE('lingote_content').appendChild(div)
		palabra_actual_str.push("")
	}
}

var animacion_temblando = null
var animacion_humo = null
var animacion_barras = [
	[[4,5,6],[1,2,3,7,8,9,10,11,12]],
	[[7,8,9],[1,2,3,10,11,12]],
	[[2,11],[1,3,10,12]],
	[[10,3],[1,12]],
	[[1,12],[]]
]

var temblando = false
function clickLetra(l,letra_div){
	if(!temblando){
		var state = letra_div.getAttribute('used')
		if(state=="no"){
			var times = 0
			for(i = 0;i<palabra_actual_array.length;i++){
				if(l==palabra_actual_array[i]){
					times++
					getE('letter-'+i).innerHTML = l
					palabra_actual_str[i] = l
				}
			}

			letra_div.classList.remove('ladrillo_unused')
			letra_div.classList.add('ladrillo_used')
			letra_div.setAttribute('used','si')

			if(times==0){
				//meollo del derrumbe
				temblor_mp3.currentTime = 0
				temblor_mp3.play()
				temblando = true
				getE('estructura').className = 'barras-moving-'+(intentos+1)
				
				getE('personaje_temblando').classList.add('personaje_temblando_animation')
				
				
				getE('humo1').className = 'humo'
				getE('humo2').className = 'humo'
				getE('humo3').className = 'humo'
				getE('cuerda').className = 'cuerda-temblando'

				var animadas = animacion_barras[intentos][0]
				var no_animadas = animacion_barras[intentos][1]

				for(j = 0;j<animadas.length;j++){
					var ani = getRand(1,2)
					var clas_cae = ""
					if(ani==1){
						clas_cae = 'barras-moving-barra-right'
					}else{
						clas_cae = 'barras-moving-barra-left'
					}
					getE('barra'+animacion_barras[intentos][0][j]).className = clas_cae
				}
				for(j = 0;j<no_animadas.length;j++){
					var ani = getRand(1,2)
					var clas_mue = ""
					if(ani==1){
						clas_mue = 'barras-moving-barra-normal1'
					}else{
						clas_mue = 'barras-moving-barra-normal2'
					}
					getE('barra'+animacion_barras[intentos][1][j]).className = clas_mue
				}
				
				spdPlayMovieclip({frame:1,stop:6,loop:false,end:function(){}},0)

				animacion_humo = setTimeout(function(){
					clearTimeout(animacion_humo)
					animacion_humo = null

					getE('humo1').classList.add('humo-on-1')
					getE('humo2').classList.add('humo-on-2')
					getE('humo3').classList.add('humo-on-3')
					caerse_mp3.currentTime = 0
					caerse_mp3.play()
				},1800)

			    animacion_temblando = setTimeout(function(){
			    	clearTimeout(animacion_temblando)
			    	animacion_temblando = null

		    		getE('personaje_temblando').classList.remove('personaje_temblando_animation')
			    	
			    	getE('cuerda').classList.remove('cuerda-temblando')

					//quitar animaciopn center-normal
					for(j = 0;j<no_animadas.length;j++){
						getE('barra'+animacion_barras[intentos][1][j]).className = ""
					}
					intentos++
					if(intentos==oportunidades){
						//alert("Game over")
					}else{
						getE('estructura').className = ''
					}
			    	
			    	spdPlayMovieclip({frame:6,stop:11,loop:false,end:function(){
						if(intentos==oportunidades){
							getE('personaje_temblando').classList.remove('personaje-action-on')
							getE('personaje_temblando').classList.add('personaje-action-off')
							getE('personaje_salvado').classList.remove('personaje-action-off')
							getE('personaje_salvado').classList.add('personaje-action-on')
							spdPlayMovieclip({frame:1,stop:12,loop:false,end:function(){
								perder_mp3.play()
								setFinal()
							}},1)
						}else{
							temblando = false
						}
			    	}},0)
			    },2000)

				//ponerla incorrecta
				getE('incorrecta-txt-'+intentos).innerHTML = l				
			}else{
				//mirar si esta completa
				var correctas = 0
				for(i = 0;i<palabra_actual_array.length;i++){
					if(palabra_actual_array[i]==palabra_actual_str[i]){
						correctas++
					}
				}
				if(correctas==palabra_actual_array.length){
					ganar_mp3.play()
					if(p_actual==(palabras_disponibles.length-1)){
						setModal({
							close:false,
							title:"¡Muy Bien!",
							content:'<p><span>'+palabra_actual.palabra+'</span></p><p>'+palabra_actual.descripcion+'</p><br /><p>Has decifrado todas las palabras</p>',
							button:true,
							value:'Jugar de nuevo',
							final:false,
							action:'repeatGame'
						})
					}else{
						setModal({
							close:false,
							title:"¡Muy Bien!",
							content:'<p><span>'+palabra_actual.palabra+'</span></p><p>'+palabra_actual.descripcion+'</p>',
							button:true,
							value:'Continuar',
							final:false,
							action:'continuarPalabra'
						})	
					}
					
				}
			}
		}
	}else{
		//esta temblando
	}
}

function setFinal(){
	setModal({
		close:false,
		title:"¡Se acabaron los intentos!",
		content:'<p>No decifraste la palabra oculta, vuelve a intentarlo</p>',
		button:true,
		value:'Reintentar',
		final:false,
		action:'repetirPalabra'
	})
}


function continuarPalabra(){
	resetGame(true)
}
function repetirPalabra(){
	resetGame(false)
}

var animacion_reset = null
function resetGame(state){
	getE('cargador').className = 'cargador-on'
	getE('cargador_txt').innerHTML = 'Cargando...'
	unsetModal(null)
	animacion_reset = setTimeout(function(){
		clearTimeout(animacion_reset)
		animacion_reset = null

		getE('lingote_content').innerHTML = ""
		//letras malas vacias
		for(i = 0;i<oportunidades;i++){
			getE('incorrecta-txt-'+i).innerHTML = ''
		}
		//letras de ladrillos ponerlas unused
		for(i = 0;i<letras.length;i++){
			getE('ladrillo-'+i).className = 'ladrillo ladrillo_unused'
			getE('ladrillo-'+i).setAttribute('used','no')
		}

		//acomodar estructura
		getE('estructura').className = "barras-moving-0"
		//limpiar barras
		for(i = 1;i<=12;i++){
			getE('barra'+i).className = ''
		}
		getE('personaje_salvado').className = 'spd_movieclip personaje-action-off'
		getE('personaje_temblando').className = 'spd_movieclip personaje-action-on'

		//resetear variables
		intentos = 0
		palabra_actual = null
		palabra_actual_array = []
		palabra_actual_str = []
		temblando = false

		getE('cargador').className = 'cargador-off'
		if(state){
			p_actual++
			startGame()
		}else{
			//repetir no mas
			startGame()
		}

	},1000)
	
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

var toggle_audio = 'on'
function clickAudio(btn){
	if(btn.className=='music-on'){
		underground_mp3.volume = 0
		btn.className = 'music-off'
		toggle_audio = 'off'
	}else{
		underground_mp3.volume = 0.2
		btn.className = 'music-on'
		toggle_audio = 'on'
	}
}