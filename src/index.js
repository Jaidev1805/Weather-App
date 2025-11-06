import {UIgenerate} from "./UI.js"
import {getForecastUI} from "./FUI.js"
import "./styles.css";

const weather = document.querySelector("#location");
const submitBtn = document.querySelector("#submit");
const container = document.querySelector("#container");

submitBtn.addEventListener("click", ()=>{
    container.innerHTML = "";
    UIgenerate(weather.value,container);
    getForecastUI(weather.value,container);
})

const enterKey = document.querySelector("#location");
enterKey.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        container.innerHTML = "";
        UIgenerate(weather.value,container);
        getForecastUI(weather.value,container);
    }
});