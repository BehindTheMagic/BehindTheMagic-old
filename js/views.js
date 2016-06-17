// Is useful for conditionals in switchTo, use either ES6 includes or a personal includes function
String.prototype.includes = String.prototype.includes || function (it) {
    return this.indexOf(it) != -1;
};

var viewsOBJ = {},
    modalsOBJ = {};

function renderViews() {
    var app = document.createElement("div");
    app.id = "app";

    var videoPlayer = document.createElement('video');
    videoPlayer.classList.add("view");
    videoPlayer.id = "videoPlayer";

    var templates = document.querySelectorAll('script[type="text/html"]');

    for (var i = 0; i < templates.length; i++) {
        var div = document.createElement("div");
        div.className = templates[i].dataset.class;
        div.id = templates[i].dataset.id;
        div.innerHTML = templates[i].innerHTML;

        var obj2append = {
            selector: app.appendChild(div),
            focus: templates[i].onsubmit,
            blur: templates[i].onreset
        };

        if (div.className.indexOf("view") > -1) {
            viewsOBJ[div.id] = obj2append;
        }
        else if (div.className.indexOf("modal") > -1) {
            modalsOBJ[div.id] = obj2append;
        }

        templates[i].parentElement.removeChild(templates[i]);
    }
    app.appendChild(videoPlayer);
    document.body.appendChild(app);
}

function switchTo(hash, isFromEvent) {
    hash = hash.slice(1); // no # in views object
    isFromEvent = isFromEvent || false;
    var optionalArg=[];

    if (!viewsOBJ.hasOwnProperty(hash)) {
        // this hash is not a real view, let's try to locate the real one for this hash.

        // make a "best match" system: regex on the complete hash for static route-part,
        //then apply conditions to distinguish the data or to invalid the route

        /* global characters_main */
        var routes = {
            "characters/main/(.+?)/(explore/)?": function (match) {
                if (!characters_main[match[1]]) {
                    return false;
                }
                if (!!match[2]) {
                    return ["explore", [ characters_main, match[1] ] ];
                }
                else {
                    return ["overview", [ characters_main, match[1] ] ];
                }
            }
        };

        // Find which regex matches
        var results = (function(){
            for (var key in routes) {
                if (!routes.hasOwnProperty(key)) continue;
                var route_match = hash.match(RegExp(key));
                if(!!route_match) return routes[key](route_match);
            }
        })();



        if (!results) {
            console.log("Moving to #mainMenu because a switch to an unknown hash has been attempted: #" + hash || "[empty hash, no problem]");
            hash = "mainMenu";
        }
        else {
            hash = results[0];
            optionalArg = results[1];
        }
    }


    if (switchTo.active !== "") {
        var el = viewsOBJ[switchTo.active];
        el.blur.call(viewsOBJ[switchTo.active].selector);
        el.selector.classList.remove('enableAnimation');
        el.selector.classList.remove("active");
    }

    el = viewsOBJ[hash];
    el.selector.classList.add("active");
    el.focus.call(viewsOBJ[hash].selector, optionalArg);

    /* These piece of code is hack.
    Transitions don't fire when there is display:none to block on the element
    Workaround is to add custom class which will trigger transitions after DOM has rendered the element
    */
    setTimeout(function () {
        el.selector.classList.add('enableAnimation');
    }, 10);

    if (!isFromEvent && !optionalArg) {
        window.location.hash = hash;
    }
    switchTo.active = hash;
}
switchTo.active = "";

//TODO Refactor this?
function createModalText(options) {
    options = {
        "title": options.title || "Modal Window",
        "background": options.background || "black",
        "content": options.content || ""
    };

    document.getElementById("modal-text-title").innerHTML = options.title;
    var inner = document.getElementById("modal-text-inner");
    inner.style.background = options.background;
    inner.innerHTML = "";
    inner.appendChild(options.content);
    modalsOBJ["modal-text"].selector.classList.add("modal-active");
}

window.addEventListener("hashchange", function (hashchange) {
    var videoPlayer = document.getElementById("videoPlayer");
    if (videoPlayer.classList.contains("active")) {
        videoPlayer.pause();
        videoPlayer.classList.remove("active");
    }
    switchTo(window.location.hash, true);
})

function make_overview(content){
    var database = content[0];
    var match = content[1];

    var file = database[match];

    var _overview = viewsOBJ.overview.selector;
    var _pane = _overview.querySelector(".pane")
    var _name = document.getElementById("overview-name");
    var _shortdesc = document.getElementById("overview-shortdesc");
    var _explore = document.getElementById("overview-explore");
    var _n = document.getElementById("overview-n");
    var _ne = document.getElementById("overview-ne");
    var _e = document.getElementById("overview-e");
    var _se = document.getElementById("overview-se");
    var _s = document.getElementById("overview-s");
    var _so = document.getElementById("overview-so");
    var _o = document.getElementById("overview-o");
    var _no = document.getElementById("overview-no");

    _overview.style.backgroundImage = "url('"+database.location+match+"/"+match+"01AB.JPG')";
    file.introductionRight ? _pane.classList.add("pane-right") : _pane.classList.remove("pane-right");
    _name.innerHTML = file.name;
    _shortdesc.innerHTML = file.shortdesc;
    _explore.href = window.location.hash+"explore/";

    /* global getTopRoute */
    var topRoute = getTopRoute(window.location.hash)
    if(file.relations.n){
        _n.classList.remove("bullet-hidden");
        _n.href = topRoute + file.relations.n + "/";
        _n.innerHTML = database[file.relations.n].shortname;
    }else{
        _n.classList.add("bullet-hidden");
    }

    if(file.relations.ne){
        _ne.classList.remove("bullet-hidden");
        _ne.href = topRoute + file.relations.ne + "/";
        _ne.innerHTML = database[file.relations.ne].shortname;
    }else{
        _ne.classList.add("bullet-hidden");
    }

    if(file.relations.e){
        _e.classList.remove("bullet-hidden");
        _e.href = topRoute + file.relations.e + "/";
        _e.innerHTML = database[file.relations.e].shortname;
    }else{
        _e.classList.add("bullet-hidden");
    }

    if(file.relations.se){
        _se.classList.remove("bullet-hidden");
        _se.href = topRoute + file.relations.se + "/";
        _se.innerHTML = database[file.relations.se].shortname;
    }else{
        _se.classList.add("bullet-hidden");
    }

    if(file.relations.s){
        _s.classList.remove("bullet-hidden");
        _s.href = topRoute + file.relations.s + "/";
        _s.innerHTML = database[file.relations.s].shortname;
    }else{
        _s.classList.add("bullet-hidden");
    }

    if(file.relations.so){
        _so.classList.remove("bullet-hidden");
        _so.href = topRoute + file.relations.so + "/";
        _so.innerHTML = database[file.relations.so].shortname;
    }else{
        _so.classList.add("bullet-hidden");
    }

    if(file.relations.o){
        _o.classList.remove("bullet-hidden");
        _o.href = topRoute + file.relations.o + "/";
        _o.innerHTML = database[file.relations.o].shortname;
    }else{
        _o.classList.add("bullet-hidden");
    }

    if(file.relations.no){
        _no.classList.remove("bullet-hidden");
        _no.href = topRoute + file.relations.no + "/";
        _no.innerHTML = database[file.relations.no].shortname;
    }else{
        _no.classList.add("bullet-hidden");
    }
}