var ismobile = false
var isresponsive = false
var actual_dimension = 1
var container = document.getElementById('container')
var instrucciones_label = ""

function prepareWindow(){
    ismobile = isMobileDevice()
    //ismobile = true

    if(window.innerWidth<560){
    	isresponsive = true
    }
    //ismobile = true
    console.log(ismobile,isresponsive)
    //document.getElementById('instrucciones_txt').innerHTML = instrucciones_label
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

/////////////////////////////AUDIO/////////////////////////
function loadAudio(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        data.callBack(null)
    })
}
function loadImage(data){
    var img = new Image()
    img.onload = function(){
        img.onerror = null
        img.onload = null
        data.callBack({w:this.width,h:this.height,object:this})
    }
    img.onerror = function(){
        console.log("error cargando la imagen "+data.url)
        img.onerror = null
        img.onload = null
        data.callBack({w:0,h:0,object:null})
    }
    img.src = data.url
}