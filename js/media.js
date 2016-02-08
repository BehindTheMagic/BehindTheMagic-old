/* global HTMLMediaElement */
HTMLMediaElement.prototype.start = function(){
    this.currentTime = 0;
    this.volume = window.BTMsettings.volume;
    this.play();
};

function startVideo(src, actions) {
    //TODO: do what's in callback by default not written in callback parameter.
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

    videoPlayer.play();
    videoPlayer.onended = callback.bind(this, videoPlayer);

}

function startIntro(src, actions){
    /* global updateSettings */

    var nextview = document.querySelector(".active");
    nextview.classList.remove("active");

    if (window.BTMsettings.playIntros || !window.BTMsettings[src]){
        updateSettings(src, true);
        startVideo("/assets/INTRO/"+src, function(){
            nextview.classList.add("active");
            actions();
        });
    } else{
        nextview.classList.add("active");
        actions();
    }

}