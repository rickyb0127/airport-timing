import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RoutingMachine from './RoutingMachine';
import FlightInfo from './FlightInfo';
import { useNavigate } from "react-router-dom";

function MapView(props) {
  const {selectedFlight, startingLocation, pickupLocation, setRouteSummary, estimatedTimeToLeave, hasCheckedBag, setHasCheckedBag, setEstimatedTimeToLeave} = props;
  const navigate = useNavigate();
  const midPointLocation = pickupLocation ? [startingLocation[0] - (startingLocation[0] - pickupLocation[0])/2, startingLocation[1] - (startingLocation[1] - pickupLocation[1])/2] : startingLocation;

  function ChangeView({ midPointLocation }) {
    const map = useMap();
    map.setView(midPointLocation, map.getZoom());
    return null;
  };

  // TODO fix by saving flight info to local storage
  if(!selectedFlight) {
    navigate("/");
  }

  return (
    <>
      {selectedFlight && 
        <>
          <div className="flex flex-col w-full">
            <div onClick={() => navigate(-1)} className="flex h-[50px] w-[50px] items-center cursor-pointer">
              <FontAwesomeIcon className="" icon="fa-solid fa-chevron-left" />
              <div className="pl-[5px]">Back</div>
            </div>
            <div className="flex items-baseline justify-around">
              <div className="flex flex-col items-center">
                <div className="text-2xl">Flight Info</div>
                {selectedFlight && 
                  <div className="flex flex-col items-center gap-[10px]">
                    <FlightInfo flightObject={selectedFlight} />
                    <div className="flex gap-[5px] items-center">
                      <div className="flex">Checked Bag?</div>
                      <div className="flex h-[50px]">
                        <input 
                          type="checkbox"
                          value={hasCheckedBag}
                          onChange={() => setHasCheckedBag(!hasCheckedBag)}
                        />
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl">Estimated Leave Time</div>
                <div className="flex flex-col">
                  {estimatedTimeToLeave && <div>{estimatedTimeToLeave}</div>}
                </div>
              </div>
            </div>
          </div>
          {!pickupLocation ?
            <MapContainer id="map" center={midPointLocation} zoom={14} scrollWheelZoom={false}>
              <ChangeView midPointLocation={midPointLocation} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={startingLocation}>
                <Popup>
                  You are here!
                </Popup>
              </Marker>
            </MapContainer> :
            <MapContainer id="map" center={midPointLocation} zoom={10} scrollWheelZoom={false}>
              <ChangeView midPointLocation={midPointLocation} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RoutingMachine startingLocation={startingLocation} pickupLocation={pickupLocation} setRouteSummary={setRouteSummary} />
              <Marker position={startingLocation}>
                <Popup>
                  You are here!
                </Popup>
              </Marker>
              <Marker position={pickupLocation}>
                <Popup>
                  {selectedFlight.arrival.airport}
                </Popup>
              </Marker>
            </MapContainer>
          }
        </>
      }
    </>
  )
}

export default MapView;