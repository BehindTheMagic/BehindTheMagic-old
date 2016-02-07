window.BTMsettings = {
    "volume": 0.8,
    "playIntros": false, // false: once, true: always
    "charint2.snm.mp4": false,
    "techintr.snm.mp4": false,
    "locintr2.snm.mp4": false,
    "eventint.snm.mp4": false,
    "epi_int.snm.mp4": false,
    "triviaAnswered": 0,
    "triviaCorrect": 0
};

if (!localStorage.getItem("BTMsettings")){
    localStorage.setItem("BTMsettings", JSON.stringify(window.BTMsettings));
} else {
    window.BTMsettings = JSON.parse( localStorage.getItem("BTMsettings") );
}

function updateSettings(key, value){
    window.BTMsettings[key] = value;
    localStorage.setItem("BTMsettings", JSON.stringify(window.BTMsettings));
}
