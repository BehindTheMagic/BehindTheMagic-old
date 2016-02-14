function initGlossary(){
    var selectCategory = document.getElementById("glossary-category")
    , selectTerms = document.getElementById("glossary-terms")
    , buttonFprev = document.getElementById("glosfprev")
    , buttonFnext = document.getElementById("glosfnext")
    , inputSearch = document.getElementById("glossary-search")
    , buttonPrevEntry = document.getElementById("glosprevent")
    , buttonNextEntry = document.getElementById("glosnextent")
    , spanName = document.getElementById("glosname")
    , placeholderPicture = document.getElementById("glospicture")
    , pDescription = document.getElementById("glosdescription")
    , aTopic = document.getElementById("glostopic")
    , divAppears = document.getElementById("glosappears")
    , btnDivAppears = document.getElementById("btnglosappears");


    function clearSelectTerms(){
        while(selectTerms.firstChild){
            selectTerms.removeChild(selectTerms.firstChild);
        }
    }

    function constructSelectTerms(array, indexes){
        var glosLength = array.length;
        indexes = indexes || [];
        for(var i = 0; i != glosLength; i++){
            var option = document.createElement("option");
            option.innerHTML = array[i].name;
            option.value = indexes[i] || i;
            selectTerms.appendChild(option);
        }
    }

    function addSources(acronymsSTR){
        var acronymsArr = acronymsSTR.split(",");
        acronymsArr = acronymsArr.map(function(el){
            return el.trim();
        });
        var ul = document.createElement("ul");
        for(var i=0; i<acronymsArr.length; i++){
            /* global acronyms */
            if(acronyms[ acronymsArr[i] ]){
                var value = acronyms[ acronymsArr[i] ];
                var li = document.createElement("li");
                li.innerHTML = '<i>'+value+'</i>';
                ul.appendChild(li);
            }
        }
        divAppears.appendChild(ul);
    }

    function displayFile(index){
        var file = glossary[index];
        spanName.innerHTML = file.name;
        pDescription.innerHTML = file.description;

        if (file.picture){
            placeholderPicture.style.display ="block";
            placeholderPicture.style.backgroundImage ='url("/assets/GLOSSARY/STILLS/'+file.picture+'")';
        } else { placeholderPicture.style.display = 'none'}

        if (file.topic){
            aTopic.href = file.topic;
            aTopic.style.display = "block";
        } else { aTopic.style.display= "none" }

        if (file.appearance){
            divAppears.innerHTML = '<span>References in the Expanded Universe</span><button id="glosAppearsCLOSE" onclick="document.getElementById(\'glosappears\').style.display = \'none\';">X</button>';
            addSources(file.appearance);
            btnDivAppears.style.display = "block";
        } else { btnDivAppears.style.display = "none"; }
    }

    function search(str, direction){

    }

    /* global glossary */
    selectCategory.onchange = function(){
        var category = selectCategory.value;
        var indexes = [];
        if(category != ""){
            var gloscategorized = glossary.filter(function(element, index){
                if(element.category == category){
                    indexes.push(index);
                    return true;
                }
            });
        } else { var gloscategorized = glossary }
        clearSelectTerms();
        constructSelectTerms(gloscategorized, indexes);
        selectTerms.selectedIndex = 0; selectTerms.onchange(); //Trigger the onchange event
    };

    selectTerms.onchange = function(){
        displayFile(selectTerms.value);
    };

    buttonPrevEntry.onclick = function(){
        if(selectTerms.selectedIndex){
            selectTerms.selectedIndex--;
            selectTerms.onchange()
        }
    }
    buttonNextEntry.onclick = function(){
        if(selectTerms.selectedIndex != (selectCategory.childElementCount - 1) ){
            selectTerms.selectedIndex++;
            selectTerms.onchange();
        }
    }

    inputSearch.onkeypress = function(evt){
        if(evt.which == 13){
            buttonFnext.click();
        }
    };
    buttonFnext.onclick = function(){
        search(inputSearch.value, 1);
    }
    buttonFprev.onclick = function(){
        search(inputSearch.value, -1);
    }



    constructSelectTerms(glossary);
    selectTerms.selectedIndex = 0;
    displayFile(0);
}

