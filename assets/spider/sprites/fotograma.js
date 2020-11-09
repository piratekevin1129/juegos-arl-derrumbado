var loaded_frames = []
var spd_movieclip_data = null
var spd_movieclip_frames = 0
var spd_movieclip_w = 0
var spd_movieclip_h = 0

function spdCreateMovieClip(data){
    var element = document.getElementById(data.idname)
    var width = element.getAttribute("width")
    var height = element.getAttribute("height")
    var frames = element.getAttribute("frames")
    var src = element.getAttribute("src")
    element.style.width = width+'px'
    element.style.height = height+'px'

    spd_movieclip_data = data.callBack
    spd_movieclip_frames = frames
    spd_movieclip_idname = data.idname
    spd_movieclip_w = width
    spd_movieclip_h = height
    loaded_frames = []

    loadFrames(src)
}

function extractInitial(str){
    var ini = ""
    var arr = str.split("")
    var dot = false
    for(var n = 6;n<arr.length;n++){
        if(arr[n]=='.'){
            dot = true
        }
        if(!dot){
            ini+=arr[n]
        }
    }
    return parseInt(ini)
}

function loadFrames(src){
    var object = document.getElementById(spd_movieclip_idname)
    for(var ii = 0;ii<spd_movieclip_frames;ii++){
        loaded_frames.push(false)
        var initial = (ii+1)
        var canvas = document.createElement('canvas')
        canvas.width = spd_movieclip_w
        canvas.height = spd_movieclip_h
        canvas.className = 'canvas_fotograma'
        canvas.id = spd_movieclip_idname+'_frame_'+(initial)

        object.appendChild(canvas)
        
        var url = src+'imagen'+initial+'.png'
        var image_frame = new Image()
        image_frame.onload = function(){
            this.onload = null
            this.onerror = null
            
            var url_str = this.src
            var url_decoded = url_str.split("/")
            //console.log(url_decoded[url_decoded.length-1])
            var initial_2 = extractInitial(url_decoded[url_decoded.length-1])

            var ctx = document.getElementById(spd_movieclip_idname+'_frame_'+initial_2).getContext('2d')
            ctx.drawImage(this,0,0,spd_movieclip_w,spd_movieclip_h)
            loaded_frames[(initial_2-1)] = true
            checkLoadedFrames()
        }
        image_frame.onerror = function(){
            this.onload = null
            this.onerror = null
            console.log("error loading: "+this.src)
        }
        image_frame.src = url
    }
}

function checkLoadedFrames(){
    var completed = 0
    for(var lf = 0;lf<loaded_frames.length;lf++){
        if(loaded_frames[lf]){
            completed++
        }
    }
    //console.log(completed,loaded_frames.length)
    if(completed==loaded_frames.length){
        for(var f = 2;f<=spd_movieclip_frames;f++){
            var canvas_id = document.getElementById(spd_movieclip_idname+'_frame_'+f)
            canvas_id.style.visibility = 'hidden'
        }
        console.log("cargó")
        spd_movieclip_data()
    }
}

function setFotograma(fotograma,moviename){
    var object = document.getElementById(moviename)
    var fotogramas = object.getElementsByTagName('canvas')
    for(var f = 0;f<fotogramas.length;f++){
        var foto = fotogramas[f]
        foto.style.visibility = 'hidden'
    }
    var canvas_foto = document.getElementById(moviename+'_frame_'+fotograma)
    canvas_foto.style.visibility = 'visible'
    
}

var movieclips = []

function spdCreateMovieClipAnimation(data){
    var movieclip = document.getElementById(data.moviename)
    total_frames = 0
    if(movieclip!=null){
        total_frames = movieclip.getElementsByTagName('canvas').length
    }
    
    movieclips.push({
        animation:null,
        id:data.id,
        moviename:data.moviename,
        frame:1,
        total:total_frames
    })
}

function spdStopMovieclip(id){
    clearInterval(movieclips[id].animation)
    movieclips[id].animation = null
}

function spdPlayMovieclip(data,id){
    if(movieclips[id].animation!=null){
        clearInterval(movieclips[id].animation)
        movieclips[id] = null
    }

    movieclips[id].frame = data.frame
    setFotograma(movieclips[id].frame,movieclips[id].moviename)

    movieclips[id].animation = setInterval(function(){
        var nuevo_frame = movieclips[id].frame+1
        if(nuevo_frame>movieclips[id].total){
            //mirar loop
            if(data.loop){
                nuevo_frame = 1
                movieclips[id].frame = nuevo_frame
                setFotograma(nuevo_frame,movieclips[id].moviename)
            }else{
                clearInterval(movieclips[id].animation)
                movieclips[id].animation = null
                //mirar callback
            }
        }else{
            if(data.stop==nuevo_frame){
                movieclips[id].frame = nuevo_frame
                setFotograma(nuevo_frame,movieclips[id].moviename)
                clearInterval(movieclips[id].animation)
                movieclips[id].animation = null
                //mirar callback
                if(data.end!=null&&data.end!=undefined){
                    data.end()
                }
            }else{
                movieclips[id].frame = nuevo_frame
                setFotograma(nuevo_frame,movieclips[id].moviename)
            }
        }
    },50)
}

function spdSetMovieclip(data){
    var id = data.id
    movieclips[id].frame = data.f
    setFotograma(movieclips[id].frame,movieclips[id].moviename)
}