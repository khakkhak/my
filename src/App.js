import background from "./images/khmer.jpg";
import { useEffect, useState } from "react";
import axios from 'axios';


function App() {
  const [result, setResult] = useState();
  const [keyWord, setKeyWord] = useState("");
  const getWeather = (search) => {

    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const key = "6c7cb9a22a0e47118cb111627231601";
      const url = search ? `http://api.weatherapi.com/v1/current.json?q=${search}&&key=${key}` : `http://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&&key=${key}`;
      const response = await axios.get(url);
      console.log(response.data);
      setResult(response.data);
    });
  }

  useEffect(() => {
    getWeather("");
  }, []);
  return (
    <>
      <img src={background} className="w-full h-screen object-cover -z-50 top-0 left-0 fixed" />
      <div className="w-full h-screen bg-black opacity-40 fixed -z-40 top-0 left-0"></div>
      <div className="flex items-center overflow-hidden">
        <div className="w-[60%] px-10 py-5 lg:py-10 relative h-screen">
          <h1 className="text-white lg:text-lg">the.weather</h1>
          <div className="absolute bottom-20 lg:flex lg:items-center">
            <h1 className="text-white text-3xl lg:text-9xl">{result?.current.temp_c}&#176;</h1>
            <div className="lg:mx-5">
              <h1 className="text-white font-semibold text-2xl">{result?.location.name}, {result?.location.country}</h1>
              <p className="text-white">{result?.current.last_updated}</p>
            </div>
            <h1 className="text-white">{result?.current.condition.text}</h1>
          </div>
        </div>
        <div className="w-[40%] backdrop-blur-md px-5 lg:px-20 py-20 border-l-[1px] border-l-gray-300 h-screen">
          <input placeholder="Search Another City" className="outline-none bg-transparent text-white placeholder:text-white placeholder:text-sm lg:placeholder:text-lg" onChange={e => setKeyWord(e.target.value)} value={keyWord} />
          <button onClick={() => getWeather(keyWord)}>Search</button>
          <hr className="mt-2" />
          <div className="mt-10">
            <p className="text-white cursor-pointer text-sm lg:text-md mt-2 hover:underline" onClick={() => getWeather("New York")}>New York</p>
            <p className="text-white cursor-pointer text-sm lg:text-md mt-2 hover:underline" onClick={() => getWeather("Paris")}>Paris</p>
            <p className="text-white cursor-pointer text-sm lg:text-md mt-2 hover:underline" onClick={() => getWeather("Bangkok")}>Bangkok</p>
            <p className="text-white cursor-pointer text-sm lg:text-md mt-2 hover:underline" onClick={() => getWeather("Tokyo")}>Tokyo</p>
          </div>
          <hr className="mt-10" />
          <div className="mt-5">
            <p className="text-white text-sm lg:md">Weather detail</p>
            <div className="mt-10">
              <div className="flex justify-between items-center mt-2">
                <p className="text-white capitalize text-sm lg:text-md">Wind Degree</p>
                <p className="text-white capitalize text-sm lg:text-md">{result?.current.wind_degree}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-white capitalize text-sm lg:text-md">Vis Km</p>
                <p className="text-white capitalize text-sm lg:text-md">{result?.current.vis_km}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-white capitalize text-sm lg:text-md">Pressure</p>
                <p className="text-white capitalize text-sm lg:text-md">{result?.current.pressure_mb}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
