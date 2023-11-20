import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-routing-machine';

const createRoutineMachineLayer = (props) => {
  const {startingLocation, pickupLocation, setRouteSummary} = props;

  const instance = new L.Routing.control({    
    waypoints: [
      L.latLng(startingLocation),
      L.latLng(pickupLocation)
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    }
  });

  instance.on('routesfound', (e) => {
    const routes = e.routes;
    const summary = routes[0].summary;

    setRouteSummary(summary);
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;