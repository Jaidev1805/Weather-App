import { getForecast } from "./getweather.js";

export async function getForecastUI(city,container) {
    const Fdiv = document.createElement("div");
    Fdiv.className = "Forecast-div";
    container.appendChild(Fdiv);
    
    try {
        const data = await getForecast(city);
        
        data.forecast.forecastday.forEach(day => {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("forecast-day");
        dayDiv.style.boxShadow = "0 2px 4px rgba(255, 255, 255, 0.1)";
        dayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
        
        const date = document.createElement("p");
        date.textContent = `Date: ${day.date}`;
            
        const Temperature = document.createElement("p");
        Temperature.textContent = `Max: ${day.day.maxtemp_c}°C / Min: ${day.day.mintemp_c}°C`;

        const condition = document.createElement("p");
        condition.textContent = `${day.day.condition.text}`;
            
        const icon = document.createElement("img");
        icon.src = `https:${day.day.condition.icon}`;
        icon.alt = day.day.condition.text;
            
        dayDiv.append(date, icon, condition, Temperature);
        Fdiv.appendChild(dayDiv);

        });
    }

    catch (error) {
        console.log("error");
    }
}