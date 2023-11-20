import { useEffect, useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { DateTime } from 'luxon';
import MapView from "./components/MapView";
import { Route, Routes } from "react-router-dom";
import FlightSearchBox from "./components/FlightSearchBox";

function App() {
  const [departingAirport, setDepartingAirport] = useState(null);
  const [arrivingAirport, setArrivingAirport] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedAirline, setSelectedAirline] = useState(selectedFlight ? selectedFlight.airline : "");
  const defaultStartingLocation = [39.8282, -98.5796];
  const [startingLocation, setStartingLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [routeSummary, setRouteSummary] = useState(null);
  const [hasCheckedBag, setHasCheckedBag] = useState(false);
  const [estimatedTimeToLeave, setEstimatedTimeToLeave] = useState(null);

  useEffect(() => {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = [position.coords.latitude, position.coords.longitude];

        setStartingLocation(currentPosition);
      });
    } else {
      setStartingLocation(defaultStartingLocation);
    }
  },[]);

  useEffect(() => {
    if(selectedFlight && routeSummary) {
      // TODO also account for real time traffic
      const baggageClaimMinutes = hasCheckedBag ? 20 : 0;
      const estimatedLeaveTimestamp = DateTime.fromISO(selectedFlight.arrival.scheduled).toUTC().minus({second: routeSummary.totalTime}).plus({minutes: baggageClaimMinutes});
      const estimatedLeaveTime = estimatedLeaveTimestamp.toLocaleString(DateTime.TIME_SIMPLE);
      setEstimatedTimeToLeave(estimatedLeaveTime);
    }
  },[selectedFlight, routeSummary, hasCheckedBag]);

  useEffect(() => {
    if(arrivingAirport) {
      const newPickupLocation = [arrivingAirport.latitude, arrivingAirport.longitude];
      setPickupLocation(newPickupLocation);
    }
  },[arrivingAirport]);

  return (
    <>
      <div className="w-full mobile:max-w-[500px] tablet:max-w-[800px] desktop:max-w-[1200px] h-full max-h-[100%] mx-auto pt-[80px] mobile:px-[5px] tablet:px-[0px] desktop:px-[0px]">
        <Routes>
          <Route path="/" element={ <FlightSearchBox selectedAirline={selectedAirline} setSelectedAirline={setSelectedAirline} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} departingAirport={departingAirport} arrivingAirport={arrivingAirport} setDepartingAirport={setDepartingAirport} setArrivingAirport={setArrivingAirport} /> } />
          <Route path="/map" element={ <MapView selectedFlight={selectedFlight} startingLocation={startingLocation} pickupLocation={pickupLocation} setRouteSummary={setRouteSummary} estimatedTimeToLeave={estimatedTimeToLeave} setEstimatedTimeToLeave={setEstimatedTimeToLeave} hasCheckedBag={hasCheckedBag} setHasCheckedBag={setHasCheckedBag} /> } />
        </Routes>
      </div>
    </>
  )
}

export default App;
library.add(fab, fas, far);