import React from 'react'
import axios from "axios";

async function weatherKey(city) {

       try{
            const key = "28438b310e57c8bd78fccee03dfa51ed"
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
            return res.data
       }catch(err){
                return err

       }
}

export default weatherKey