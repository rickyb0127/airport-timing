import { useState } from "react";
import { DateTime } from 'luxon';
import { airlines } from "../assets/airlines";
import { airports } from "../assets/airports";
import TextInput from "./TextInput"
import SelectDropdown from "./SelectDropdown";
import FlightSelection from "./FlightSelection";

function FlightSearchBox(props) {
  const { selectedAirline, setSelectedAirline, selectedFlight, setSelectedFlight, departingAirport, arrivingAirport, setDepartingAirport, setArrivingAirport} = props;
  const today = DateTime.local().day;
  const aviationStackApiKey = import.meta.env.VITE_AVIATION_STACK_API_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const [departingAirportInput, setDepartingAirportInput] = useState(departingAirport ? departingAirport.iata_code : "");
  const [arrivingAirportInput, setArrivingAirportInput] = useState(arrivingAirport ? arrivingAirport.iata_code : "");
  const [filteredDepartingAirports, setFilteredDepartingAirports] = useState(null);
  const [filteredArrivingAirports, setFilteredArrivingAirports] = useState(null);
  const [flightNumber, setFlightNumber] = useState("");
  const [selectableFlights, setSelectableFlights] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState(null);

  const validateForm = () => {
    let newErrorMessage = "";
    let newErrorType = null;

    if(!selectedAirline) {
      newErrorMessage = "Selected airline is required";
      newErrorType = "AIRLINE";
    } else if(!departingAirport) {
      newErrorMessage = "Departing airline is required";
      newErrorType = "DEPARTING_AIRPORT";
    } else if(!arrivingAirport) {
      newErrorMessage = "Arriving airline is required";
      newErrorType = "ARRIVING_AIRPORT";
    }

    const isValidForm = !newErrorMessage && !newErrorType;
    setErrorMessage(newErrorMessage);
    setErrorType(newErrorType);
    return isValidForm;
  };

  const getFlights = () => {
    async function fetchFlights() {
      try {
        // TODO currently only works with direct flights
        let params = `&airline_name=${selectedAirline.airline_name}&dep_iata=${departingAirport.iata_code}&arr_iata=${arrivingAirport.iata_code}`;
        flightNumber ? params+=flightNumber : params = params;

        const response = await fetch(`http://api.aviationstack.com/v1/flights?access_key=${aviationStackApiKey}${params}`);
        const json = await response.json();

        let flights = json.data.map((flight, index) => {
          return {
            id: index,
            ...flight
          }
        });

        flights = flights.filter((flight) => {
          const flightDay = DateTime.fromISO(flight.flight_date).day;

          return flightDay >= today;
        });

        setSelectableFlights(flights);
      } catch(err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if(validateForm()) {
      setIsLoading(true);
      fetchFlights();
    }
  };

  const runAirportAutocomplete = (value, valueType) => {
    if(valueType === "DEPARTING_AIRPORT") {
      if(value.length >= 3) {
        let updatedFilteredAirports = [...airports];

        updatedFilteredAirports = updatedFilteredAirports.filter((airport) => {
          return airport.airport_name.toLowerCase().includes(value.toLowerCase()) || airport.iata_code.toLowerCase().includes(value.toLowerCase())
        });

        setFilteredDepartingAirports(updatedFilteredAirports);
      } else {
        setFilteredDepartingAirports(null);
      }

      setDepartingAirportInput(value);
    } else if(valueType === "ARRIVING_AIRPORT") {
      if(value.length >= 3) {
        let updatedFilteredAirports = [...airports];

        updatedFilteredAirports = updatedFilteredAirports.filter((airport) => {
          return airport.airport_name.toLowerCase().includes(value.toLowerCase()) || airport.iata_code.toLowerCase().includes(value.toLowerCase())
        });

        setFilteredArrivingAirports(updatedFilteredAirports);
      } else {
        setFilteredArrivingAirports(null);
      }

      setArrivingAirportInput(value);
    }
  };

  const airportSelectedFromList = (value, valueType) => {
    if(valueType === "DEPARTING_AIRPORT") {
      setDepartingAirportInput(value.iata_code);
      setDepartingAirport(value);
      setFilteredDepartingAirports(null);
    } else if(valueType === "ARRIVING_AIRPORT") {
      setArrivingAirportInput(value.iata_code);
      setArrivingAirport(value);
      setFilteredArrivingAirports(null);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className={`flex mobile:flex-col tablet:flex-row desktop:flex-row gap-[20px] self-center pb-[40px] ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
        <div className="flex gap-[20px]">
          <div className="flex flex-col w-[220px]">
            <SelectDropdown optionsList={airlines} selectedOption={selectedAirline} selectedTextProp={"airline_name"} labelText={"Select an Airline"} onOptionSelected={setSelectedAirline} />
            {errorType === "AIRLINE" && <div className="flex pt-[5px] text-[14px] text-red-500">{errorMessage}</div>}
          </div>
          <div className="flex w-[140px]">
            <TextInput labelText={"Flight # (Optional)"} value={flightNumber} valueType={"FLIGHT_NUMBER"} placeholder={null} onChangeCallback={(val) => {setFlightNumber(val)}} optionsList={null} onOptionSelected={null} selectedTextProp={null} />
          </div>
        </div>
        <div className="flex gap-[20px]">
          <div className="flex flex-col w-[140px]">
            <TextInput labelText={"Depart"} value={departingAirportInput} valueType={"DEPARTING_AIRPORT"} placeholder={null} onChangeCallback={runAirportAutocomplete} optionsList={filteredDepartingAirports} onOptionSelected={airportSelectedFromList} selectedTextProp={"airport_name"} />
            {errorType === "DEPARTING_AIRPORT" && <div className="flex pt-[5px] text-[14px] text-red-500">{errorMessage}</div>}
          </div>
          <div className="flex flex-col w-[140px]">
            <TextInput labelText={"Arrive"} value={arrivingAirportInput} valueType={"ARRIVING_AIRPORT"} placeholder={null} onChangeCallback={runAirportAutocomplete} optionsList={filteredArrivingAirports} onOptionSelected={airportSelectedFromList} selectedTextProp={"airport_name"} />
            {errorType === "ARRIVING_AIRPORT" && <div className="flex pt-[5px] text-[14px] text-red-500">{errorMessage}</div>}
          </div>
        </div>
        <div className="flex w-[80px] pt-[26px]">
          <button onClick={() => getFlights()} className="h-[50px] w-full rounded bg-sky-500 cursor-pointer text-white">Search</button>
        </div>
      </div>
      {selectableFlights && 
        <FlightSelection selectableFlights={selectableFlights} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} />
      }
    </div>
  )
}

export default FlightSearchBox;