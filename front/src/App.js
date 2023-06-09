import './App.css';
import React, { useState } from 'react';

import StationsFilter from './AppComponents/StationsFilter/StationsFilter';
import StationsMap from './AppComponents/StationsMap/StationsMap';
import StationsTable from './AppComponents/StationsTable/StationsTable';
import ReactSlider from "react-slider";
import  { useEffect } from "react";



export default function App() {
  const APIURL = "http://127.0.0.1:8000";
  const [stationsData, setStationsData] = useState([]);
  const [latCity, setLatCity] = useState(0);
  const [lonCity, setLonCity] = useState(0);
  const [latCircle, setLatCircle] = useState([]);
  const [lonCircle, setLonCircle] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState(5);
  const [citySearch, setCitySearch] = useState("");
  const [gasTypeSearch, setGasTypeSearch] = useState("");
  const [apiError, setApiError] = useState(false);
  const ApiCallAndUpdateState = (gasType, postalCode) => {
    fetch(`${APIURL}/stations?oil_type=${gasType}&postal_code=${postalCode}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Problem with the API...");
    }
    return res.json();
  })
    .then((data) => {
      setStationsData([...data["station_infos"]]);
      setLonCity(data["lon"]);
      setLatCity(data["lat"]);
      setLonCircle([...data["circle_lon"]]);
      setLatCircle([...data["circle_lat"]]);
      setGasTypeSearch(gasType);
      setCitySearch(data["city"]);
    })  .catch((error) => {
      setApiError(true);
    });
    ;
  }

  useEffect(() => {
    ApiCallAndUpdateState("SP98","75001")
  }, [])


  return (
    <div className="App">
      <header className="header">
        <h1 className="h1-searchbar">Gas Station Finder</h1>
      </header>
      <div className="main-components">
        <div className="left-section">
          <StationsFilter   
 ApiCallAndUpdateState={ApiCallAndUpdateState} 
          />

<ReactSlider
  className="horizontal-slider"
  markClassName="example-mark"
  thumbClassName="example-thumb"
  trackClassName="example-track"
  min={1}
  max={30}
  value={distanceFilter}
  renderThumb={(props, state) => (
    <div {...props}>{state.valueNow}</div>
  )}
  onAfterChange={(e) => setDistanceFilter(e)}
/>

<h2 style={{ padding: "1px", margin: "5px", textAlign: "center" }}>
    {citySearch} - {gasTypeSearch}
  </h2>
          <StationsTable stationsData={stationsData} />
        </div>
        <StationsMap   stationsData={stationsData}
                      latCircle={latCircle}
                      lonCircle={lonCircle}
                      lonCity={lonCity}
                      latCity={latCity}  />
      </div>
    </div>
  );
}