import "./StationsFilter.css";
import React, { useState } from "react";

export default function StationsFilter(props) {

  

  //FUEL TYPES SELECTION BEGINS

  const fuelTypes = ["E10", "E85", "Gazole", "GPLc", "SP95", "SP98"];

  const [gasType, setGasType] = useState("SP95");

  const handleChangeDropdown = (event) => {
    setGasType(event.target.value);
  };

  //FUEL TYPES SELECTION ENDS

    //POSTAL CODE  SELECTION BEGINS
  const [postalCode, setPostalCode] = useState("");

  const handleChangeTextArea = (event) => {
    const newValue = event.target.value;

    if (/^\d{0,5}$/.test(newValue)) {
      setPostalCode(newValue);
    }
  };



//POSTAL CODE  SELECTION ENDS

// Button PRESS BEGINS

const handleButtonClick = () => {

  props.ApiCallAndUpdateState(gasType, postalCode)
};

// BUTTON PRESS ENDS 
  return (
    <form className="search-form">
      <input type="text" placeholder="Postal Code" className={"general-input" + (props.apiError ? " input-error" : "")}
        onChange={handleChangeTextArea}  value={postalCode} />

      <select  value={gasType}  className="general-input" onChange={handleChangeDropdown}>
    <option value="E10">E10</option>
    <option value="E85">E85</option>
    <option value="Gazole">Gazole</option>
    <option value="GPLc">GPLc</option>
    <option value="SP95">SP95</option>
    <option value="SP98">SP98</option>
</select>
      <button className="send-request-button"  onClick={handleButtonClick} >Find Stations</button>
    </form>
  );
}