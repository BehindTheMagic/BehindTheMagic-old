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

    viewsOBJ[hash].selector.classList.add("active");
    viewsOBJ[hash].focus();
    if(!isFromEvent){ location.hash = hash }
    switchTo.active = hash;
}
switchTo.active = "";

function isValidHash(hash) {
    // Valid until now, need to say yes when there is characters/weapons/vehicles name in the hash
    return (viewsOBJ.hasOwnProperty(hash));
}

function createModalText(options){
    options = {
        "title": options.title || "Modal Window",
        "background": options.background || "black",
        "content": options.content || ""
    }

    document.getElementById("modal-text-title").innerHTML = options.title;
    var inner = document.getElementById("modal-text-inner");
    inner.style.background = options.background;
    inner.innerHTML = "";
    inner.appendChild(options.content);
    modalsOBJ["modal-text"].selector.classList.add("modal-active");
}

window.addEventListener("hashchange", function(hashchange){
    var videoPlayer = document.getElementById("videoPlayer");
    if( videoPlayer.classList.contains("active") ){
        videoPlayer.pause();
        videoPlayer.classList.remove("active");
    }
    switchTo(location.hash, true);
})