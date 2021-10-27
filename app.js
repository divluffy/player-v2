const wrapperPlayer = document.querySelector('.wrapper_player')
const fullscreen = document.querySelector('.fullscreen')
const playPause = document.querySelector('.play_pause')
const video = document.querySelector('.video')
const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const rangeProgress = document.querySelector('.range_progress')
const volume = document.querySelector('.volume')
const halfVolume = document.querySelector('.half_volume')
const mute = document.querySelector('.mute')
const rangeVolume = document.querySelector('.range_volume')
const zoomIn = document.querySelector('.zoom_in')
const zoomOut = document.querySelector('.zoom_out')
const current = document.querySelector('.current')
const duration = document.querySelector('.duration')
const timeHover = document.querySelector('.time_hover')

video.addEventListener('timeupdate', ()=>{
    const  VP = (video.currentTime / video.duration) * 100
    rangeProgress.style.setProperty('--seek-before-width', `${VP}%`);
    rangeProgress.value = VP
    current.textContent =  convertTime(Math.round(video.currentTime))
    duration.textContent =  convertTime(Math.round(video.duration))
})

rangeProgress.addEventListener('input', ()=>{
     video.currentTime = (video.duration / 100 ) * rangeProgress.value
     isPlay()
})

rangeProgress.addEventListener('mousemove', (e)=>{
    let time =  (video.duration / 100 ) * (e.offsetX / e.target.clientWidth) *  parseInt(e.target.getAttribute('max'), 10).toFixed(2)
    timeHover.style.display= 'inline'
    timeHover.textContent = convertTime(Math.round(time))
    timeHover.style.left = (e.offsetX / e.target.clientWidth) * 100 + '%'
})

rangeProgress.addEventListener('mouseout', (e)=>{
    timeHover.style.display= 'none'
})

rangeVolume.addEventListener('input', ()=>{
    video.volume   = rangeVolume.value
    if( rangeVolume.value < 0.01 ){
        volume.classList.remove('active')
        halfVolume.classList.remove('active')
        mute.classList.add('active')
    } else if( rangeVolume.value < 0.5 ){
        volume.classList.remove('active')
        halfVolume.classList.add('active')
        mute.classList.remove('active')
    } else{
        volume.classList.add('active')
        halfVolume.classList.remove('active')
        mute.classList.remove('active')
    }
})

function isPlay(){
    pause.classList.add('active')
    play.classList.remove('active')
    video.play()
    playPause.setAttribute('data-play', 'true')
}

function isPlayin(){
    let isPlay = playPause.getAttribute('data-play')
    if(isPlay === 'true'){
        play.classList.add('active')
        pause.classList.remove('active')
        playPause.setAttribute('data-play', 'false')
        video.pause()
    } else{
        pause.classList.add('active')
        play.classList.remove('active')
        playPause.setAttribute('data-play', 'true')
        video.play()
    }
}

function isMute(e){
    let isMute = e.getAttribute('data-mute')
    if(isMute === 'true'){
        e.setAttribute('data-mute', 'false')
        volume.classList.add('active')
        halfVolume.classList.remove('active')
        mute.classList.remove('active')
        video.setAttribute('muted', '')
        video.volume = rangeVolume.value
    }else{
        e.setAttribute('data-mute', 'true')
        volume.classList.remove('active')
        halfVolume.classList.remove('active')
        mute.classList.add('active')
        video.volume = 0
    }
}

function isZoom(){
    let zoom = fullscreen.getAttribute('data-zoom')
    if(zoom === 'true'){
        zoomIn.classList.add('active')
        zoomOut.classList.remove('active')
        fullscreen.setAttribute('data-zoom', 'false')
        document.exitFullscreen()
    } else{
        zoomIn.classList.remove('active')
        zoomOut.classList.add('active')
        wrapperPlayer.requestFullscreen()
        fullscreen.setAttribute('data-zoom', 'true')
    }
}

const convertTime = (seconds) => {
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    return  min + ":" + sec
}
