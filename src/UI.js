import { getWeather } from "./getweather.js";

export async function UIgenerate(city,container) {
  const weatherDiv = document.createElement("div");
  weatherDiv.className = "main-data";
  container.appendChild(weatherDiv);

  const weatherDiv1 = document.createElement("div");
  weatherDiv1.className = "main-data-1";
  weatherDiv.appendChild(weatherDiv1);

  const weatherDiv2 = document.createElement("div");
  weatherDiv2.className = "main-data-2";
  weatherDiv.appendChild(weatherDiv2);

  const weatherDiv3 = document.createElement("div");
  weatherDiv3.className = "temp-info";
  container.appendChild(weatherDiv3);

  const weatherDiv4 = document.createElement("div");
  weatherDiv4.className = "additional-info";
  weatherDiv2.appendChild(weatherDiv4);

  try {
    const data = await getWeather(city);

    if (!data || !data.location) {
      const para = document.createElement("p");
      para.innerHTML = `City not found or API error.<br>
                        Please enter a major city around your location or try again later`;
      para.style.color = "red";
      para.style.textAlign = "center";
      weatherDiv.innerHTML = para.outerHTML;
      return;
    }

    const cityName = document.createElement("h3");
    cityName.textContent = `${data.location.name}`;

    const time = document.createElement("p");
    time.textContent = `${data.location.localtime}`;

    const icon = document.createElement("img");
    icon.src = `https:${data.current.condition.icon}`;
    icon.style.width = "128px";
    
    const Temperature = document.createElement("p");
    Temperature.textContent = `${data.current.temp_c}°C`;

    const condition = document.createElement("p");
    condition.textContent = `${data.current.condition.text}`;

    const Precipitation = document.createElement("p");
    Precipitation.textContent = `Precipitation: ${data.current.precip_mm} mm`;

    const wind = document.createElement("p");
    wind.textContent = `Wind: ${data.current.wind_kph} kph`;

    weatherDiv4.append( condition, Precipitation, wind);
    weatherDiv3.append(icon, Temperature);
    weatherDiv1.append(cityName, time,);
    weatherDiv2.append( weatherDiv3, weatherDiv4);

    let hour = parseInt(data.location.localtime.split(" ")[1].split(":")[0]);
    const temp = Number(data.current.temp_c);

    let bgColor;
    let textColor;
    let shadowColor;

    if (temp < 25) {
        if (hour >= 6 && hour < 18) {
            bgColor = "#708090";
            textColor = "white";
        } else {
            bgColor = "#2A3B47";
            textColor = "white";
        }
    } else {
        if (hour >= 6 && hour < 12) {
            bgColor = "#FFF7CC";
            textColor = "black";
        } else if (hour >= 12 && hour < 18) {
            bgColor = "#FFD580";
            textColor = "black";
        } else {
            bgColor = "#001f3f";
            textColor = "white";
        }
    }

    if (textColor === 'white') {
        shadowColor = "rgba(255, 255, 255, 0.1)";
    } else {
        shadowColor = "rgba(0, 0, 0, 0.1)";
    }

    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
    weatherDiv.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
    weatherDiv.style.boxShadow = `0 2px 4px ${shadowColor}`;

  } catch (error) {
    weatherDiv.innerHTML = `Error fetching weather data. Please try again later.`;    console.error("Error fetching weather data:", error);    console.error("UIgenerate error:", error);
    weatherDiv.textContent = "Something went wrong.";
  }
}
