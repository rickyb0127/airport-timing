import { useNavigate } from "react-router-dom";
import FlightInfo from "./FlightInfo";

function FlightSelection(props) {
  const {selectableFlights, selectedFlight, setSelectedFlight} = props;
  const navigate = useNavigate();

  const flightsView = selectableFlights.map((flightObject) => {
    return (
      <div key={flightObject.id} className={`flex mobile:flex-col tablet:flex-row desktop:flex-row px-[25px] h-[70px] cursor-pointer items-center border border-gray-100 rounded shadow-sm justify-between ${flightObject.id === selectedFlight?.id ? "border-sky-500" : "hover:border-gray-300"}`} onClick={() => setSelectedFlight(flightObject)} role="option">
        <FlightInfo flightObject={flightObject} />
      </div>
    )
  });

  return (
    <div className="flex flex-col gap-[5px]">
      {selectableFlights && selectableFlights.length ?
        <>
          {flightsView}
          <div className="flex w-[80px] h-[50px] self-end">
            <button onClick={() => navigate("/map")} className="w-full rounded bg-sky-500 text-white">Next</button>
          </div>
        </>:
        <div className="flex self-center">No Available Flights</div>
      }
    </div>
  )
}

export default FlightSelection;