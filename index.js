class temp {
    constructor(temp, feelslike, Humidity) {
        this.temp = Math.round((temp - 273.15)*10)/10;
        this.feelsLike = Math.round((feelslike - 273.15)*10)/10;
        this.Humidity = Humidity;
    }
}
class others {
    constructor(desc, sunrise, sunset, icon) {
        this.description = desc;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.icon = icon;
    }
}
class weather {
    constructor(loc, temp, others) {
        this.loc = loc;
        this.temp = temp; // temp, feelsLike, Humidity
        this.others = others; //description, sunrise, sunset
    }
    DisplayLoc() {
        document.body.getElementsByClassName("Location")[0].innerHTML = this.loc;
    }
    DisplayTemprature() {
        const tempDiv = document.body.getElementsByClassName("temprature")[0];
        tempDiv.innerText = this.temp.temp + '°C' ;

        const wrapper = document.body.getElementsByClassName("wrapper")[0];
        const wicon = document.getElementById("icon");
        wicon.src = `https://openweathermap.org/img/wn/${this.others.icon}.png`;

        const card = document.body.getElementsByClassName("card")[0];
        const desc = document.body.getElementsByClassName("description")[0];
        desc.innerHTML = `Feels like ${this.temp.feelsLike}°C | ${this.others.description} | Humidity: ${this.temp.Humidity}%`;
    }
    DisplayOthers() {
        const othersDiv = document.body.getElementsByClassName("others")[0];
        var sunRiseTime = new Date(this.others.sunrise*1000).toLocaleTimeString();
        var sunSetTime = new Date(this.others.sunset*1000).toLocaleTimeString();
        othersDiv.innerHTML = `Sunrise: ${sunRiseTime} | ${sunSetTime}`
    }
}
function DrawApp(Weather) {
    Weather.DisplayLoc();
    Weather.DisplayTemprature();
    Weather.DisplayOthers();
}
async function WeatherApiRequest(place) {
    try {
    response  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=701c80bfac8d5b30f7437cf8ffcde8c6`)
    data = response.json()
    .then(function(data) {
        console.log(data)
        let temprature = new temp(data.main.temp, data.main.feels_like, data.main.humidity);
        let loc = data.name + ',' + data.sys.country;
        let otherInfo = new others(data.weather[0].description, data.sys.sunrise, data.sys.sunset, data.weather[0].icon);
        DrawApp(new weather(loc, temprature, otherInfo));
    });
    }
    catch (error){
        console.log(error);
    }
}

const GetValue = () => {
    const locInput = document.getElementById("Location-input");
    locInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && locInput.value != '') {
            WeatherApiRequest(locInput.value);
        }
    })
}

// Start listening for input
GetValue();
// Mock request for London
WeatherApiRequest('London');
