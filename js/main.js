let inputSearch = document.getElementById("inputSearch")
let searchBtn = document.getElementById("searchBtn")
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"]
let date = new Date();
async function getData(type){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${type}&days=3`);
    let data = await response.json();
    let list = data.forecast.forecastday
    displayCurrentDay(data)
    displaySecoundDay(list)
    displayThreeDay(list)
}
getData("cairo")
// searchBtn.addEventListener("click",()=>{
//     if(validCity() == true){
//         getData(inputSearch.value)
//     }
//     else{
//         displayAlert()
//     }
// })
inputSearch.addEventListener("keyup" , (x)=>{
    if(validCity() == true){
        getData(x.target.value)
    }
    else{
        displayAlert()
    }
})
function displayCurrentDay( data){
    let temp=`<div class="col-lg-4 col-sm-12">
                <div class=" item px-0 item-bg">
                <div class="header d-flex justify-content-between p-2 text-white">
                    <span>${days[date.getDay()]}</span>
                    <span>${date.getDate() + monthNames[date.getMonth()]}</span>
                </div>
                <div class="body px-3 py-4">
                    <h3 class="location text-white">${data.location.name}</h3>
                    <h1 class="temp-num text-white pt-2 m-0">${data.current.temp_c}<sup>o</sup>C</h1>
                    <div class="row justify-content-between">
                        <img src="https:${data.current.condition.icon}" alt="icon" class="image">
                        <p class="text-white w-50 align-self-center m-0">${data.current.condition.text}</p>
                    </div>
                    <div class="info py-2">
                        <span class="text-white me-3"><img src="image/icon-umberella.png" alt="icon-umberella"> ${data.current.wind_degree}%</span>
                        <span class="text-white me-3"><img src="image/icon-wind.png" alt="icon-umberella"> ${data.current.wind_kph}</span>
                        <span class="text-white me-3"><img src="image/icon-compass.png" alt="icon-umberella"> ${data.current.wind_dir}</span>
                    </div>
                </div>
            </div>`
    document.getElementById("myRow").innerHTML = temp 
}
function displaySecoundDay(list){


    console.log(list);
    let temp = ""
    for(let i=1; i<list.length-1 ;i++){
        let dateDay = new Date(list[i].date).getDay()

        temp +=`<div class="col-lg-4 col-sm-12">
        <div class=" item text-center px-0 item-bg h-100">
        <div class="header p-2 text-white">
            <span>${days[dateDay]}</span>
        </div>
        <div class="body px-3 py-5">
            <img src="https:${list[i].day.condition.icon}" alt="sun">
            <h2 class="text-white pt-4">${list[i].day.maxtemp_c}<sup>o</sup>C</h2>
            <h6 class="text-white">${list[i].day.mintemp_c}<sup>o</sup></h6>
            <p class="text-white pt-3">${list[i].day.condition.text}</p>
        </div>
    </div>`
    }
        
    document.getElementById("myRow").innerHTML += temp
}
function displayThreeDay(list){
    let temp = ""
    for(let i=2; i<list.length ;i++){
        temp +=`<div class="col-lg-4 col-sm-12">
        <div class=" item text-center px-0 item-bg h-100">
        <div class="header p-2 text-white">
            <span>${days[date.getDay()+i]}</span>
        </div>
        <div class="body px-3 py-5">
            <img src="https:${list[i].day.condition.icon}" alt="sun">
            <h2 class="text-white pt-4">${list[i].day.maxtemp_c}<sup>o</sup>C</h2>
            <h6 class="text-white">${list[i].day.mintemp_c}<sup>o</sup></h6>
            <p class="text-white pt-3">${list[i].day.condition.text}</p>
        </div>
    </div>`
    }
    document.getElementById("myRow").innerHTML += temp
}
function displayAlert(){
    let temp =`<div class="alert text-center text-white">
                <div>   
                    <h5> <i class="fa-regular fa-face-dizzy me-2"></i> your city not found <i class="fa-regular fa-face-dizzy ms-2"></i></h5>
                    <p>plase enter frist 3 letter from your city</p>
                </div> 
              </div>`
    document.getElementById("myRow").innerHTML = temp
}
$(window).ready(function(){
    $(".landing").fadeOut(1000)
})
function validCity(){
    var reg = /^[a-zA-Z]{3,10}$/
    if (reg.test(inputSearch.value) == true){
        return true
    }
    else{
        return false
    }
}