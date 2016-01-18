"use strict";
function watchingAppCache() {
    var loadingSpan = document.getElementById("launcherSpan");
    window.applicationCache.addEventListener("progress", function (e) {
        loadingSpan.innerText = "Loading assets... " + e.loaded + "/" + e.total;
    });
    window.applicationCache.addEventListener("noupdate", showBtn);
    window.applicationCache.addEventListener("cached", showBtn);

    function showBtn() {
        loadingSpan.innerHTML = "Star Wars: Behind The Magic is ready.";

        var launcherBtn = document.createElement("button");
        launcherBtn.innerHTML = "Start Star Wars: Behind The Magic";

        launcherBtn.onclick = function () {
            launcherBtn.disabled = "disabled";

            var audio = new Audio();
            audio.src = "assets/launcher/r2beep.mp3";
            audio.play();
            audio.onended = start.bind(this, location.hash);
        };

        loadingSpan.parentNode.appendChild(launcherBtn);
    }
}

function start(href) {
    // All assets are loaded, Remove the launcher div
    var divLauncher = document.querySelector(".launcher");
    divLauncher.parentNode.removeChild(divLauncher);

    //Render HTML chunks commented inside views
    /* global renderViews */ renderViews();

    if (href == "" || href == "#mainMenu") {
        //Start the intro video and switch to MainMenu when it ends or on skip
        /* global startVideo */
        startVideo("/assets/INTRO/intrbtm.mp4", function () {
            switchTo("#mainMenu");
        });
    }
    else {
        /* global switchTo */
        switchTo(href);
    }
}

document.addEventListener('DOMContentLoaded', watchingAppCache);/* global HTMLMediaElement */
HTMLMediaElement.prototype.start = function(){
    this.currentTime = 0;
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

var viewsOBJ = {}, modalsOBJ = {};
function renderViews() {
    var app = document.createElement("div");
    app.id = "app";

    var videoPlayer = document.createElement('video');
    videoPlayer.classList.add("view");
    videoPlayer.id = "videoPlayer";

    var templates = document.querySelectorAll('script[type="text/html"]');

    for (var i=0; i< templates.length; i++) {
        var div = document.createElement("div");
        div.className = templates[i].dataset.class;
        div.id = templates[i].dataset.id;
        div.innerHTML = templates[i].innerHTML;

        var obj2append = {
            selector: app.appendChild(div),
            focus: templates[i].onsubmit,
            blur: templates[i].onreset
        };

        if(div.className.indexOf("view") > -1 ){
            viewsOBJ[div.id] = obj2append ;
        }else if (div.className.indexOf("modal") > -1 ){
            modalsOBJ[div.id] = obj2append;
        }

        templates[i].parentElement.removeChild(templates[i]);
    }
    app.appendChild(videoPlayer);
    document.body.appendChild(app);
}

function switchTo(hash, isFromEvent) {
    hash = hash.slice(1) // no # in views object
    isFromEvent = isFromEvent || false;

    if (!isValidHash(hash)) {
        console.log("Moving to #mainMenu because a switch to an unknown hash has been attempted: #" + hash||"[empty hash, no problem]");
        hash = "mainMenu";
    }

    if (switchTo.active !== "") {
        viewsOBJ[switchTo.active].blur();
        viewsOBJ[switchTo.active].selector.classList.remove("active");
    }

    viewsOBJ[hash].focus();
    viewsOBJ[hash].selector.classList.add("active");
    if(!isFromEvent){ location.hash = hash }
    switchTo.active = hash;
}
switchTo.active = "";

function isValidHash(hash) {
    // Valid until now, need to say yes when there is characters/weapons/vehicles name in the hash
    return (viewsOBJ.hasOwnProperty(hash));
}

window.addEventListener("hashchange", function(hashchange){
    var videoPlayer = document.getElementById("videoPlayer");
    if( videoPlayer.classList.contains("active") ){
        videoPlayer.pause();
        videoPlayer.classList.remove("active");
    }
    switchTo(location.hash, true);
})