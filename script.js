//ALL OF THE FORM FUNCTIONS//
document.getElementById("go-button").addEventListener("click", getImages);
var form = document.getElementById("art-style");
var choice = form.elements['style'];
var colorForm =  document.getElementById("color-pick");

function printColors(){
    
    var blue = document.createElement("button");
    blue.setAttribute("style", "background-color: #4279DB");
    blue.setAttribute("name", "color");
    blue.setAttribute("type", "button");
    blue.setAttribute("value", "%20%234279DB");
    blue.setAttribute("id", "blue");
    blue.addEventListener("click", getColor);

    var purple = document.createElement("button");
    purple.setAttribute("style", "background-color: #4019B1");
    purple.setAttribute("type", "button");
    purple.setAttribute("name", "color");
    purple.setAttribute("value", "%20%234019B1&f.dating.period=20");
    purple.setAttribute("id", "purple");
    purple.addEventListener("click", getColor);

    var yellow = document.createElement("button");
    yellow.setAttribute("style", "background-color: #FFEB00");
    yellow.setAttribute("type", "button");
    yellow.setAttribute("name", "color");
    yellow.setAttribute("value", "%20%23FFEB00");
    yellow.setAttribute("id", "yellow");
    yellow.addEventListener("click", getColor);

    var red = document.createElement("button");
    red.setAttribute("style", "background-color: #981313");
    red.setAttribute("type", "button");
    red.setAttribute("name", "color");
    red.setAttribute("value", "%20%23981313");
    red.setAttribute("id", "red");
    red.addEventListener("click", getColor);

    var green = document.createElement("button");
    green.setAttribute("style", "background-color: #62AD77");
    green.setAttribute("type", "button");
    green.setAttribute("name", "color");
    green.setAttribute("value", "%20%2362AD77");
    green.setAttribute("id", "green");
    green.addEventListener("click", getColor);

    colorForm.appendChild(blue);
    colorForm.appendChild(purple);
    colorForm.appendChild(yellow);
    colorForm.appendChild(red);
    colorForm.appendChild(green);


}
function paintColors(){

    var darkGreen = document.createElement("button");
    darkGreen.setAttribute("style", "background-color: #367614");
    darkGreen.setAttribute("type", "button");
    darkGreen.setAttribute("name", "color");
    darkGreen.setAttribute("value", "%20%23367614");
    darkGreen.setAttribute("id", "dark-green");
    darkGreen.addEventListener("click", getColor);

    var peach = document.createElement("button");
    peach.setAttribute("style", "background-color: #F49B7A");
    peach.setAttribute("type", "button");
    peach.setAttribute("name", "color");
    peach.setAttribute("value", "%20%23F49B7A");
    peach.setAttribute("id", "peach");
    peach.addEventListener("click", getColor);

    var lightGreen = document.createElement("button");
    lightGreen.setAttribute("style", "background-color: #62AD77");
    lightGreen.setAttribute("type", "button");
    lightGreen.setAttribute("name", "color");
    lightGreen.setAttribute("value", "%20%2362AD77");
    lightGreen.setAttribute("id", "light-green");
    lightGreen.addEventListener("click", getColor);

    var orange = document.createElement("button");
    orange.setAttribute("style", "background-color: #B35A1F");
    orange.setAttribute("type", "button");
    orange.setAttribute("name", "color");
    orange.setAttribute("value", "%23B35A1F");
    orange.setAttribute("id", "orange");
    orange.addEventListener("click", getColor);

    var cream = document.createElement("button");
    cream.setAttribute("style", "background-color: #FBF6E1");
    cream.setAttribute("type", "button");
    cream.setAttribute("name", "color");
    cream.setAttribute("value", "%20%23FBF6E1&f.dating.period=19");
    cream.setAttribute("id", "cream");
    cream.addEventListener("click", getColor);


    colorForm.appendChild(darkGreen);
    colorForm.appendChild(peach);
    colorForm.appendChild(lightGreen);
    colorForm.appendChild(orange);
    colorForm.appendChild(cream);
    
}
var submitColor = document.getElementById("color-pick");
function getColor(Event) {
    Event.preventDefault();
    var colorName = Event.target.value;
    submitColor.setAttribute("name", colorName);
}
function createUrl(){
    var type = choice.value;
    var color = submitColor.name;
    //console.log( color +" " + type + " this is coming from createUrl");
    var finishedUrl = "https://www.rijksmuseum.nl/api/en/collection/?key=3mwC1jzj&ps=50&f.normalized32Colors.hex="+ color + "&type=" + type + "&imgonly=True";
    console.log(finishedUrl);
    return finishedUrl;
}

//API FUNCTIONS//
function getImages(){
    var url = createUrl();
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("format", "application/json");
    xhttp.send();
    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 || this.readyStatus == 200){
            var information = JSON.parse(this.responseText);
            var howMany = information.count
            var collageList = information.artObjects;
            postImages(collageList, howMany);
        }
    }
}
var colorArray = colorForm.elements;
//COLLAGE FUNCTIONS
var collageSpace = document.getElementById("collage-section");
var displayCollage = document.getElementById("container");
function postImages(collageList, howMany){
    var order = randomCollageOrder();
    container.setAttribute("class","display-collage");
    for (i=0;i <= order.length-1; i++){
        var picture = document.createElement("img");
        picture.setAttribute("class", "posted-pic");
        if (order[i] == 0) {
            var randomPicUrl = pickRandImg(collageList, howMany);
            picture.setAttribute("src", randomPicUrl);
            collageSpace.appendChild(picture);
        } else if (order[i] == 1){
            var localImg = getLocalImgUrl();
            picture.setAttribute("src", localImg);
            collageSpace.appendChild(picture); 
        }
    }  
    // var warning =document.getElementById("warning");
    // var addWarning = document.createElement("p");
    // addWarning.innerText = "SCROLL UP TO SEE YOUR COLLAGE -- Warning: If you reload this page your collage will delete";
    // warning.appendChild(addWarning);
}
function pickRandImg(list, number){
    if(number > list.length){
        number = 50;
    }
    var random = Math.floor(Math.random()* number);
    var picked = list[random];
    var siteLink = picked.webImage.url;
    return siteLink;
}

function getLocalImgUrl(){
    var color = submitColor.name;
    for(c=0;c<colorArray.length; c++){
        if(color == colorArray[c].value){
            var imgFolder = colorArray[c].id;
             var randomColor = Math.floor(Math.random() * 8);
             var localUrl = "images/" + imgFolder + "/" + randomColor + ".png";
             return localUrl;
         }
    }
    return localUrl;
}

function randomCollageOrder(){
    const option0 = [1,0,1,1,0,1,0,1,1,0,1,0];
    const option1 = [1,0,1,0,0,1,0,1,1,0,1,0];
    const option2 = [1,0,1,0,0,1,0,0,1,0,1,1];
    var whatOption = Math.floor(Math.random() * 3);
    if(whatOption == 0 ){
        return option0;
    }else if (whatOption == 1) {
        return option1;
    }else if(whatOption == 2){
        return option2;
    }

}