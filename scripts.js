var example = ["10", "11", "12", "media", "exame", "exameConta?", "CFD"];
var disciplinas = ["portugues", "lingua", "filosofia", "especifica", "bienal1", "bienal2","opcaoC1", "opcaoC2", "EF",];
var clearInputs = 0;
var erros;

var geralPT = [];
var geralLingua = [];
var geralFIL = [];
var geralEF = [];
var Específica = [];
var bienal1 = [];
var bienal2 = [];
var opcaoC1 = [];
var opcaoC2 = [];
var disciplinasArray = [geralPT, geralLingua, geralFIL, Específica, bienal1, bienal2, opcaoC1, opcaoC2, geralEF];

var FisicsCounts = true;


function change(disciplina, content, input){
    //check value
    if(parseInt(input.value) < parseInt(input.min) || parseInt(input.value) > parseInt(input.max)) return input.style.borderColor = "red"
    input.style.borderColor = "black"
    if(content === '4' && parseInt(input.value) <= 20) input.style.borderColor = "red"
    
    array = switchMe(disciplina)[0];
    array[content] = parseInt(input.value);
    CalMediaDisciplina()
}

function checkInput(disciplina, input){  
    array = switchMe(disciplina)[0];
    if(input.checked){array[5] = true} else {array[5] = false}
    CalMediaDisciplina();
}

function FisicsEducationWeight(){
    var FisicsInput = document.querySelector("#FisicsEducationWeight");
    if(FisicsInput.checked){
        FisicsCounts = true
    }else{
        FisicsCounts = false;
    }
    CalAllMedias();
}

    function CalMediaDisciplina(){
        disciplinas.forEach( (disciplina, index) =>{
              
            array = switchMe(disciplina)[0];
            type = switchMe(disciplina)[1];
            
            //if(!array.lenght >= 3) error = "Campos por prencher"; return false;
            var media = 0;

            if(type == 4) media = array[2];
            else {
                for(i=0; i<type; i++){
                    media = media + array[i];
                }
                media = Math.round(media / type);
            }

            //display media
            if(array.length >= type || (type == 4 && array.length >= 3)){
                /*Media Interna*/
                array[3] = media;
                if(isNaN(array[3])) media = ""; // se a media for NaN
                //animation e apenas se mudar a media
                if(parseInt(document.querySelector(`.class${index}`).children[4].innerHTML) !== media){
                    document.querySelector(`.class${index}`).children[4].style.opacity = 0;
                    setTimeout(function(){
                        document.querySelector(`.class${index}`).children[4].innerHTML = media;
                        document.querySelector(`.class${index}`).children[4].style.opacity = 1;
                    },150);

                }

                /*CFD*/
                var CDF = media;
                /* Modificação Covid */
                /* if(array.length >= 4 && array[4] !== "" && !isNaN(array[4]) && array[4] > 0){
                    var exame =  Math.round(array[4]/10);
                    CDF = CIF x 0,7 + CE x 0,3. 
                    var CDF = Math.round((media * 7 + exame * 3) / 10);
                }else {CDF = array[3]}; */

                array[6] = CDF;
                if(isNaN(array[6])) CDF = ""; 

                if(parseInt(document.querySelector(`.class${index}`).children[7].innerHTML) !== CDF){
                    document.querySelector(`.class${index}`).children[7].style.opacity = 0;
                    setTimeout(function(){
                        document.querySelector(`.class${index}`).children[7].innerHTML = CDF;
                        document.querySelector(`.class${index}`).children[7].style.opacity = 1;
                        },150);

                    }
                
                CalAllMedias();
            }

        })
    }
    function CalMediaGeral(){
        var HowMany = 0;
        var Soma = 0;
        
        /* Somar as medias de todas as disciplinas e número total de disciplinas*/
        disciplinasArray.forEach(array => {
            if(array == geralEF && !FisicsCounts){}else{
                if(array.length >= 6 && !(isNaN(array[6]))){
                    Soma = Soma + array[6];
                    HowMany++;
                }
            }
        })
        /* Calcular media geral */
        var MediaGeral = Math.trunc((Soma / HowMany) * 10);
        document.querySelector(".mCFS").innerHTML = MediaGeral;
        setLocalSotorage();
    }
    function CalMediaCIF(){
        var HowMany = 0;
        var Soma = 0;
        disciplinasArray.forEach(array => {
            if(array == geralEF && !FisicsCounts){}else{
                if(array.length >= 3 && !(isNaN(array[3]))){
                    Soma = Soma + array[3];
                    HowMany++;
                }
            }
        })
        var MediaGeral = (Soma / HowMany).toFixed(2);
        document.querySelector(".mCIF").innerHTML = MediaGeral;
        setLocalSotorage();
    }
    function CalMediaSuperior(){
        var HowMany = 0;
        var Soma = 0;
        var HowManyExames = 0;
        var SomaExames = 0;
        /* Somar medias e numero de disciplinas */
        disciplinasArray.forEach(array => {
            if(array == geralEF && !FisicsCounts){}else{
                if(array.length >= 6 && !(isNaN(array[6]))){
                    Soma = Soma + array[6];
                    HowMany++;
                }
            }
        })  
        /* Somar exames e numero de exames */      
        disciplinasArray.forEach(array => {
            if(array.length >= 5 && array[5] && !(isNaN(array[4]))){
                SomaExames = SomaExames + array[4];
                HowManyExames++;
            }
        })
        var MediaGeral = Math.trunc((Soma / HowMany) * 10); //errado
        var ExameGeral = (SomaExames / HowManyExames); //correto
        var ExamWeight = document.querySelector("#ExamWeight").value;
        var MedSuperior = (((ExameGeral * ExamWeight * 0.01 + MediaGeral * (100-ExamWeight) * 0.01) * 10) / 100).toFixed(2)
        if(isNaN(ExameGeral)) MedSuperior = "";
        document.querySelector(".mCES").innerHTML = MedSuperior;
        setLocalSotorage();
    }
    function CalAllMedias(){
        CalMediaGeral();
        CalMediaCIF();
        CalMediaSuperior();
    }
    function display(){
        disciplinas.forEach( (disciplina, index) =>{
            array = switchMe(disciplina)[0];
            type = switchMe(disciplina)[1];
            var elements = document.querySelector(`.class${index}`).children;
            var elements = Array.prototype.slice.call(elements);
            elements.forEach( (el, index2) =>{
                if(el.tagName.toLowerCase() === "input" && !(el.disabled)){
                    if(el.type == "checkbox" && disciplinasArray[index][index2-1] == true) el.checked = true;
                    el.value = disciplinasArray[index][index2-1];
                }
            })
            CalMediaDisciplina();
        })
    }
      //ONCLICK change the array values
      //calculate media of disciplina 



      function switchMe(disciplina){
        switch(disciplina){
            case "portugues":
            return [geralPT, 3];
            case "lingua":
            return [geralLingua, 2];
            case "filosofia":
            return [geralFIL, 2];
            case "especifica":
            return [Específica, 3];
            case "bienal1":
            return [bienal1, 2];
            case "bienal2":
            return [bienal2, 2];
            case "opcaoC1":
            return [opcaoC1, 4];
            case "opcaoC2":
            return [opcaoC2, 4];
            case "EF":
            return [geralEF, 3];
        }
    }
    ThelocalStorage();

    function ThelocalStorage(){
        if (typeof(Storage) !== "undefined") {
            if(localStorage.getItem("theArray")){
                geralPT = JSON.parse(localStorage.getItem("theArray"))[0];
                geralLingua = JSON.parse(localStorage.getItem("theArray"))[1];
                geralFIL = JSON.parse(localStorage.getItem("theArray"))[2];
                Específica = JSON.parse(localStorage.getItem("theArray"))[3];
                bienal1 = JSON.parse(localStorage.getItem("theArray"))[4];
                bienal2 = JSON.parse(localStorage.getItem("theArray"))[5];
                opcaoC1 = JSON.parse(localStorage.getItem("theArray"))[6];
                opcaoC2 = JSON.parse(localStorage.getItem("theArray"))[7];
                geralEF = JSON.parse(localStorage.getItem("theArray"))[8];
                disciplinasArray = [geralPT, geralLingua, geralFIL, Específica, bienal1, bienal2, opcaoC1, opcaoC2, geralEF];
                display();
                //function foreach selecionar coluna -> para cada input da coluna atribuir valor que está dentro da array
            }else{
                setLocalSotorage();
            }
        }
    }

    function setLocalSotorage(){
        disciplinasArray = [geralPT, geralLingua, geralFIL, Específica, bienal1, bienal2, opcaoC1, opcaoC2, geralEF];
        localStorage.setItem("theArray", JSON.stringify(disciplinasArray));
    }