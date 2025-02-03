import React, { Fragment, useContext, useState } from "react";
import '../src/Daysforecast.css';
import { Mycontext } from "./App";

export default function Dayforecast() {
    console.log('Dayforecast rendered');
    const datas = useContext(Mycontext);
    const [selectedDayIndex, setSelectedDayIndex] = useState(null); 

    const handleDayClick = (index) => {
        setSelectedDayIndex(index); 
        console.log("Selected day:", index);
    };

    return (
        <Fragment>
            <div className="Dayscontainer">
                <div className="days">
                    <ul className="list">
                        {datas.forecast.forecastday.map((days, index) => (
                            <li 
                                key={index} 
                                className={`listitem ${selectedDayIndex===index? 'active':''}`}
                                onClick={() => handleDayClick(index)}
                            >
                                {days.date}
                            </li>
                        ))}
                    </ul>
                  
                </div>
                
                <div className="hours">
                       {selectedDayIndex!==null&&datas.forecast.forecastday[selectedDayIndex].hour.map((hour,index)=>(
                        
                       <div key={index} className="perhour">
                        <div className="conditionbox">
                       <h1 className="time">@{hour.time} </h1>
                       <img src={hour.condition.icon} className="icon2"/>
                       <p className="text2">Condition : {hour.condition.text}</p>
                       </div>
                       <div className="tempbox2">
                        <h1 className="hourtemp">{hour.temp_c}°c</h1>
                 
                       </div>
                       </div>
                       ))}
                    </div>
               
           
            </div>
        </Fragment>
    );
}
