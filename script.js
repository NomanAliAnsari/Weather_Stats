document.addEventListener('DOMContentLoaded', ()=>{
    const dom = {
        // form
        form : document.querySelector('.searchContainer'),
        button : document.querySelector(".searchButton"),
        searchBox : document.querySelector("#searchBox"),

        // intro box
        crossIcon : document.querySelector("#crossIcon"),
        introBox : document.querySelector(".introBox"),
        
        // upper left box
        tempVal : document.querySelector("#tempVal"),
        feelsLikeVal : document.querySelector("#feelsLikeVal"),
        mainIcon : document.querySelector(".mainIcon"),
        desc : document.querySelector(".desc"),
        location : document.querySelector("#location"),
        countryCode : document.querySelector("#countryCode"),

        // upper rigjt stats list
        humidityVal : document.querySelector("#humidityVal"),
        VisibilityVal : document.querySelector("#VisibilityVal"),
        speedVal : document.querySelector("#speedVal"),

        // fore cast grid
        jsListItem1 : document.querySelector(".jsListItem1"),
        jsListItem2 : document.querySelector(".jsListItem2"),
        jsListItem3 : document.querySelector(".jsListItem3"),
        jsListItem4 : document.querySelector(".jsListItem4"),
        jsListItem5 : document.querySelector(".jsListItem5"), // 'All' the cards 

        // to remove these 
        content : document.querySelector(".content"),    // the main weather box
        stats : document.querySelectorAll(".stats"),// the text of the frecast card -- 'All' the cards 

    };


    dom.form.addEventListener('submit', (e)=>{
        e.preventDefault(); // pevents from reload
        const cityName = dom.searchBox.value.trim();
        dom.searchBox.value = '';

        if(!cityName){
            alert(`No Place has No Weather \n          Good Day! 😉`);
            return;
        }
        console.log(cityName);

        // call API
        updateStats(cityName);
        foreCast(cityName);
    });


    // const now = new Date();
    // // console.log(now);
    // const now2 = Date.now();
    // const date2 = new Date(now2);
    // const day = date2.toLocaleDateString('en-us', {weekday : "short"});
    // console.log(day);


    async function updateStats(city){
        console.log("Inside the update function");
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fbb3c9a1721f9e8dbab73f0dc887b2a6&units=metric`;

        let apiData = await fetch(url);
        if(!apiData.ok){
            alert("City not Found. Check spelling or Try nearby Location.");
            return;
        }

        // to remove 
        dom.content.classList.remove("removeJs"); // now the box is visible


        let data = await apiData.json();
        // console.log(data);


        //upper left box
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const iconCode = data.weather[0].icon;
        console.log("icon code " + iconCode);
        const mainDesc = data.weather[0].description;
        const cty = data.name;
        const cntryID = data.sys.country;

        //upper right stats list
        const visVal = data.visibility /1000; //so that in km
        const speed = data.wind.speed;
        // console.log("vis " + visVal);


        //update the html;
        // upper left box
        dom.tempVal.textContent = temp + " °C";
        dom.feelsLikeVal.textContent = feelsLike + " °C";
        dom.humidityVal.textContent = humidity +" %";
        addIcon(dom.mainIcon, iconCode);
        dom.desc.textContent = mainDesc;
        dom.location.textContent = cty + ", ";
        dom.countryCode.textContent = cntryID;

        // upper right Stats List
        dom.VisibilityVal.textContent = visVal + " km";
        dom.speedVal.textContent = speed + " km/h";
    };
   
    // handling the intoduction box remove 
    dom.crossIcon.addEventListener('click', ()=>{
        dom.introBox.classList.add('javaRemove');
    });
    

    // icon add function
    function addIcon(element, code){
        const url = `https://openweathermap.org/img/wn/${code}@2x.png`;
        element.src = url;
    }
    


    // update the html. ui  for foreCAst  card
    function updateForecast(day, jsListItem, minTemp, maxTemp, humidity, icon){
        const newMaxTemp = maxTemp + 1;
        jsListItem.querySelector(".dayText").textContent = day;
        jsListItem.querySelector(".temperature").textContent = "Temperature " + minTemp + " - " + newMaxTemp + " °C";
        jsListItem.querySelector(".humidity").textContent = "Humidity " + humidity + " %";
        const url =  `https://openweathermap.org/img/wn/${icon}@2x.png`;
        jsListItem.querySelector(".foreCastImg").src = url;
        // console.log(url);
    }


    async function foreCast(city){
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fbb3c9a1721f9e8dbab73f0dc887b2a6&units=metric`;

        let response = await fetch(url);
        
        if(!response.ok){
            // alert("City not Found. Check spelling or Try nearby Location.");   comment since one alert above
            return;
        }
        for(const el of dom.stats){
            el.classList.remove("removeJs2");
        }

        let data = await response.json();  // the time is in UTC(in sec), but new Date(time) needs time in millisec . so  * by 1000;
        // console.log(data);



        //tomorow. day 1
        const date1 = new Date(data.list[5].dt * 1000);
        const day1 = date1.toLocaleDateString('en-us', {weekday: 'long'});
        const minTemp1 = Math.trunc(data.list[5].main.temp_min);
        const maxTemp1 = Math.trunc(data.list[5].main.temp_max);
        const humid1 = Math.trunc(data.list[5].main.humidity);
        const icon1 = data.list[5].weather[0].icon;
        // day 2
        const date2 = new Date(data.list[13].dt * 1000);
        const day2 = date2.toLocaleDateString('en-us', {weekday: 'long'});
        const minTemp2 = Math.trunc(data.list[13].main.temp_min);
        const maxTemp2 = Math.trunc(data.list[13].main.temp_max);
        const humid2 = Math.trunc(data.list[13].main.humidity);
        const icon2 = data.list[13].weather[0].icon;

        // day 3
        const date3 = new Date(data.list[21].dt * 1000);
        const day3 = date3.toLocaleDateString('en-us', {weekday: 'long'});
        const minTemp3 = Math.trunc(data.list[21].main.temp_min);
        const maxTemp3 = Math.trunc(data.list[21].main.temp_max);
        const humid3 = Math.trunc(data.list[21].main.humidity);
        const icon3 = data.list[21].weather[0].icon;

        // day 4
        const date4 = new Date(data.list[29].dt * 1000);
        const day4 = date4.toLocaleDateString('en-us', {weekday: 'long'});
        const minTemp4 = Math.trunc(data.list[29].main.temp_min);
        const maxTemp4 = Math.trunc(data.list[29].main.temp_max);
        const humid4 = Math.trunc(data.list[29].main.humidity);
        const icon4 = data.list[29].weather[0].icon;

        // day 5
        const date5 = new Date(data.list[37].dt * 1000);
        const day5 = date5.toLocaleDateString('en-us', {weekday: 'long'});
        const minTemp5 = Math.trunc(data.list[37].main.temp_min);
        const maxTemp5 = Math.trunc(data.list[37].main.temp_max);
        const humid5 = Math.trunc(data.list[37].main.humidity);
        const icon5 = data.list[37].weather[0].icon;



        // update the html, ui
        updateForecast(day1, dom.jsListItem1, minTemp1, maxTemp1, humid1, icon1);
        updateForecast(day2, dom.jsListItem2, minTemp2, maxTemp2, humid2, icon2);
        updateForecast(day3, dom.jsListItem3, minTemp3, maxTemp3, humid3, icon3);
        updateForecast(day4, dom.jsListItem4, minTemp4, maxTemp4, humid4, icon4);
        updateForecast(day5, dom.jsListItem5, minTemp5, maxTemp5, humid5, icon5);
    }
    // foreCast("delhi");
})