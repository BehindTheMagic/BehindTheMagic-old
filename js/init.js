function watchingAppCache() {
    // TODO: switch to UpUp. Application Cache is deprecated
    var loadingSpan = document.getElementById("launcherSpan");
    window.applicationCache.addEventListener("progress", function (e) {
        loadingSpan.innerText = "Loading assets... " + e.loaded + "/" + e.total;
    });
    window.applicationCache.addEventListener("noupdate", showBtn);
    window.applicationCache.addEventListener("cached", showBtn);
    window.applicationCache.addEventListener("updateready", function(){
        window.applicationCache.swapCache();
        window.location.reload();
        }
    )

    function showBtn() {
        loadingSpan.innerHTML = "Star Wars: Behind The Magic is ready.";

        var launcherBtn = document.createElement("button");
        launcherBtn.innerHTML = "Start Star Wars: Behind The Magic";

        launcherBtn.onclick = function () {
            launcherBtn.disabled = "disabled";

            var audio = new Audio();
            audio.src = "assets/launcher/r2beep.mp3";
            audio.play();
            audio.onended = start.bind(this, window.location.hash);
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

    // Init some views
    /* global initGlossary*/ initGlossary("glossary");

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

document.addEventListener('DOMContentLoaded', watchingAppCache);