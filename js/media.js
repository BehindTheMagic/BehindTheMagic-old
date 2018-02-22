/* global HTMLMediaElement */
HTMLMediaElement.prototype.start = function(){
    this.currentTime = 0;
    this.volume = window.BTMsettings.volume;
    this.play();
};

function startVideo(src, actions) {
    var videoPlayer = document.getElementById("videoPlayer");

    var vP_keydown = function(e){
    switch(e.which){
        case 27: //escape
            videoPlayer.pause(); videoPlayer.onended();
        break;

        case 32: //space
            if(videoPlayer.paused){ videoPlayer.play() } else { videoPlayer.pause() }
        break;
    }
}

    var callback = function (videoPlayer) {
        document.removeEventListener("keydown", vP_keydown, false);
        videoPlayer.classList.remove("active");
        //document.getElementById("controlsBar").style.display = "block";
        actions()
    };

    videoPlayer.src = src;
    videoPlayer.classList.add("active");
    //document.getElementById("controlsBar").style.display = "none";

    document.addEventListener("keydown", vP_keydown, false);

    videoPlayer.onended = callback.bind(this, videoPlayer);
    videoPlayer.start();

}

function startIntro(src, actions){
    /* global updateSettings */

    var nextview = document.querySelector(".active");
    nextview.classList.remove("active");

    if (window.BTMsettings.playIntros || !window.BTMsettings[src]){
        updateSettings(src, true);
        startVideo("assets/INTRO/"+src, function(){
            nextview.classList.add("active");
            actions();
        });
    } else{
        nextview.classList.add("active");
        actions();
    }

}

function weapTest(vid){
    var player = document.getElementById("tech_weaptest_vid");
    switch(vid){
        case "ewok":
            player.src = "assets/TECH/WEAPONS/TOPICS/WEAPTEST/ST_ROCK.SNM.mp4";
            player.start();
        break;
        case "blaster":
            player.src = "assets/TECH/WEAPONS/TOPICS/WEAPTEST/ST_BLAST.SNM.mp4";
            player.start();
        break;
        case "lightsaber":
            player.src = "assets/TECH/WEAPONS/TOPICS/WEAPTEST/ST_SABRE.SNM.mp4";
            player.start();
        break;
        case "thermal":
            player.src = "assets/TECH/WEAPONS/TOPICS/WEAPTEST/ST_THERM.SNM.mp4";
            player.start();
        break;
        case "dsray":
            player.src = "assets/TECH/WEAPONS/TOPICS/WEAPTEST/STDAUDIO.SNM.mp4";
            player.start();
            player.onended = function(){ player.src=""}
        break;
        case "init":
            player.style.backgroundImage = 'url("assets/TECH/WEAPONS/TOPICS/WEAPTEST/WTBACK0.JPG")';
            player.src = "assets/TECH/WEAPONS/TOPICS/WEAPTEST/ST_BLAST.SNM.mp4";
            player.currentTime = 22;
            player.volume = window.BTMsettings.volume;
            player.onended = function(){ player.style.backgroundImage = "url('assets/TECH/WEAPONS/TOPICS/WEAPTEST/WT_BACK.JPG')"; }
            player.play()
        break;
    }

}
