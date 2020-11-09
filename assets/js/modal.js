function setModal(data){
	var modal = getE('modal')
	if(data.close){
		getE('modal-close-btn').style.display = 'block'
		if(data.action){
			getE('modal-close-btn').setAttribute('onclick',data.action+"()")
		}else{
			getE('modal-button').setAttribute('onclick',"unsetModal(null)")
		}
	}else{
		getE('modal-close-btn').style.display = 'none'
	}

	getE('modal-title').innerHTML = data.title
	getE('modal-content').innerHTML = data.content

	if(data.button){
		if(data.value!=null){
			getE('modal-button').innerHTML = data.value
		}else{
			getE('modal-button').innerHTML = 'aceptar'
		}

		getE('modal-button').style.display = 'block'
		if(data.action){
			getE('modal-button').setAttribute('onclick',data.action+"()")
		}else{
			getE('modal-button').setAttribute('onclick',"unsetModal(null)")
		}
	}else{
		getE('modal-button').style.display = 'none'
		getE('modal-button').setAttribute('onclick','')
	}

	if(data.final!=null&&data.final!=undefined){
		if(data.final){
			alert("final")
			getE('modal-box').className = 'modal-box-final'
		}else{
			getE('modal-box').className = ''
		}
	}else{
		getE('modal-box').className = ''
	}

	modal.className = 'modal-on'
}

var animacion_modal = null
function unsetModal(callBack){
	var modal = getE('modal')
	modal.className = 'modal-off'
	
	boton_mp3.play()

	animacion_modal = setTimeout(function(){
		clearTimeout(animacion_modal)
		animacion_modal = null

		if(callBack!=null){
			callBack()
		}
	},500)
}

////////////////////////////////////////////
var animacion_alerta = null
function setAlerta(data){
	getE('alerta-box').style.top = data.top
	if(data.direction=='right'){
		getE('alerta-box').style.left = (data.left[0]-data.left[2])+data.left[1]
	}else{
		getE('alerta-box').style.right = (data.left[0]-data.left[2])+data.left[1]
	}
	
	getE('alerta-box').className = 'alerta-'+data.direction+' alerta-'+data.direction+'-off'
	getE('alerta-box').innerHTML = data.content

	getE('alerta').className = 'alerta-on'
	boton_mp3.play()

	animacion_alerta = setTimeout(function(){
		clearTimeout(animacion_alerta)
		animacion_alerta = null

		if(data.direction=='right'){
			getE('alerta-box').style.left = data.left[0]+data.left[1]
		}else{
			getE('alerta-box').style.right = data.left[0]+data.left[1]
		}
		getE('alerta-box').className = 'alerta-'+data.direction+' alerta-'+data.direction+'-on'
		animacion_alerta = setTimeout(function(){
			clearTimeout(animacion_alerta)
			animacion_alerta = null

			getE('alerta').className = 'alerta-off'
			cronometro_mp3.play()
			getE('alerta-box').className = 'alerta-'+data.direction+' alerta-'+data.direction+'-off'
			if(data.callback!=null&&data.callback!=undefined){
				data.callback()
			}
		},data.delay)
	},100)
}

////////////////////////////////////////////
var animacion_tooltip = null
function setTooltip(data){
	getE('tooltip').innerHTML = data.content
	getE('tooltip').className = 'tooltip-on'

	animacion_tooltip = setTimeout(function(){
		clearTimeout(animacion_tooltip)
		animacion_tooltip = null

		getE('tooltip').className = 'tooltip-off'		
	},data.delay)
}

////////////////////VIDEO INSTRUCCIONES////////////////
function setVideoInstrucciones(div){
	var video = div.getElementsByTagName('video')[0]
	var btn = div.getElementsByTagName('button')[0]
	if(btn.className==''){
		btn.className = 'video-playing'
		video.play()
	}else{
		btn.className = ''
		video.pause()
	}
}