export async function getWeather(city) {
    const apiKey = "9fe15fec1b6347bdb22141423252610"; 
    const BaseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try{
        let response = await fetch(BaseUrl);
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
    }
}

export async function getForecast(city){
    const apiKey = "9fe15fec1b6347bdb22141423252610";
    const FutureUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

    try{
        let response = await fetch(FutureUrl);
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
    }
}