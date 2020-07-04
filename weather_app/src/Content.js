import React from "react";
import './App.css';

const Content=({temp,desc,city})=>{
    return(

            <div className="weather-card">
            <h6>*Sorry, It will take 5-10 seconds to load HD background</h6>
            <h1>Temperature: {temp} Celsius</h1>
            <h2>Weather Conditions: {desc}</h2>
            <h2>Place: {city}</h2>
            </div>
    );
};

export default Content