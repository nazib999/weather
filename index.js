const apiKey = '428d5e1dd87d4a5c921194105240312';
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a valid city!");
        return;
    }

    try {
        const res = await fetch(apiUrl + `&q=${city}`);

        if (!res.ok) {
            throw new Error("City not found. Please enter a valid city.");
        }

        let data = await res.json();
        if (data.error) {
            throw new Error("City not found. Please enter a valid city.");
        }

        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°c";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";
    
        if(data.current.condition.text == "Partly cloudy"){
         weatherIcon.src = "images/clouds.png"
        }
        else if(data.current.condition.text == "Clear"){
            weatherIcon.src = "images/clear.png"
           }
           else if(data.current.condition.text == "Rain"){
            weatherIcon.src = "images/rain.png"
           }
           else if(data.current.condition.text == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
           }
           else if(data.current.condition.text == "Mist"){
            weatherIcon.src = "images/mist.png"
           }
    
         searchBox.value="";
       
    } catch (error) {
       alert(error.message); 
    }
    

   

   
}

searchBtn.addEventListener("click",()=>{
  checkWeather(searchBox.value);
})
searchBox.addEventListener("keypress",(e)=>{

    if (e.key === "Enter") {
        // Cancel the default action, if needed
        e.preventDefault();
        // Trigger the button element with a click
        checkWeather(searchBox.value);
      }
   
  })

