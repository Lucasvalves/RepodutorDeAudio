


let artistaMusic = document.getElementById("artista");
let titleMusic = document.getElementById("title-msc");


let musica = document.getElementById("musica");
let iconeVolume = document.getElementsByTagName("ion-icon")[0];

let srcMsc = document.getElementsByTagName("source")[0];
let srcFoto = document.getElementsByTagName("img")[0];

let VolumeControl = document.getElementById("volume");
let TimingMusic = document.getElementById("barradeTempo");
let tempoatualMusica = document.getElementById("duracao");
let durationTotal = document.getElementById("duracao");

let iconPlay = document.getElementsByTagName("ion-icon")[2];

let IndexMsc = 0;
let musicas = [
    
    {
        srcAudio: './audios/bob.mp3',
        title: 'Is This Love',
        artist: 'Bob Marley',
        srcImg: './images/bob.jpg',
    },
    {
        srcAudio: './audios/cidadeNegra.mp3',
        title: 'Girassol',
        artist: 'Cidade negra',
        srcImg: './images/cidadenegra.jpg',
    },
    {
        srcAudio: './audios/soja.mp3',
        title: 'True Love',
        artist: 'Soja',
        srcImg: './images/sojaImagem.jpg',
    },

];

onload = function(){
    durationTotal.innerHTML = formatacao(Math.round(musica.duration));
}

musica.onloadeddata = function(){
    TimingMusic.setAttribute("max",Math.round(musica.duration));
    durationTotal.innerHTML = formatacao(Math.round(musica.duration));

}

    function toggle() {
        //<ion-icon name="pause-outline"></ion-icon>
        iconPlay.setAttribute("name","pause-outline");
      
}
    function pause() {
        musica.pause();
        mudarAtt(iconPlay,"name","play-outline");
        mudarAtt(iconPlay,"onclick","play()");
}


    function mudarAtt(elemento,att,val){
        elemento.setAttribute(att,val)
    }

    function play() {
        musica.play();
        attDados();
        mudarAtt(iconPlay,"name","pause-outline");
        mudarAtt(iconPlay,"onclick","pause()");
        volumeMsc();
            setInterval(() => {
                TimingMusic.value = Math.round(musica.currentTime);
                tempoatualMusica.innerHTML = formatacao(Math.round(musica.currentTime));

                    if (formatacao(Math.round(musica.currentTime)) == formatacao(Math.round(musica.duration))){
                        prox();
                    }


            }, 1000);





}
    function voltar() {

        musica.load();
        IndexMsc -= 1;

        
            if(IndexMsc < 0){
                IndexMsc = 0;
        }


        TimingMusic.value = 0
        play();
}

    function prox() {

        musica.load();
        IndexMsc += 1;

        
            if(IndexMsc > musicas.length -1){
                IndexMsc = 0;
        }

    
        TimingMusic.value = 0
        play();
}

    function attDados() {

        titleMusic.innerHTML = "";
        titleMusic.innerHTML = musicas[IndexMsc].title;
        artistaMusic.innerHTML = "";
        artistaMusic.innerHTML = musicas[IndexMsc].artist;
        srcMsc.setAttribute('src', musicas[IndexMsc].srcAudio);
        srcFoto.setAttribute('src', musicas[IndexMsc].srcImg);
}

    function setTiming() {
        musica.currentTime = TimingMusic.value;

            if(musica.paused == false){
                musica.play();
        }
}

    function mutar() {
        musica.volume = 0;
        // <ion-icon name="volume-mute-outline"></ion-icon>
        mudarAtt(iconeVolume,"name","volume-mute-outline"); 
        mudarAtt(iconeVolume,"onclick","desmutar()")
}

    function desmutar() {
        musica.volume = 0.20;
        mudarAtt(iconeVolume,"name","volume-high-outline");
        mudarAtt(iconeVolume,"onclick","mutar()") 

}

    function volumeMsc() {
        musica.volume = VolumeControl.value / 100;

        if (musica.volume == 0) {
            mudarAtt(iconeVolume,"name","volume-mute-outline");
        } else {
            mudarAtt(iconeVolume,"name","volume-high-outline");
        }
}
    
    function formatacao(secs, format) {
        let hr = Math.floor(secs / 3600);
        let min = Math.floor((secs - (hr * 3600))/60);
        let sec = Math.floor(secs - (hr * 3600) - (min *60));

            if (min < 10){
                min = "0" + min;
            }
            if (sec < 10){
                sec = "0" + sec;
            }
            return min + ":" + sec;
}