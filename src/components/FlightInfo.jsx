import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';

function FlightInfo(props) {
  const {flightObject} = props;

  return (
    <>
      <div className="flex">{flightObject.flight.iata}</div>
      <div className="flex items-center gap-[20px]">
        <div className="flex">{DateTime.fromISO(flightObject.departure.actual ? flightObject.departure.actual : flightObject.departure.scheduled).toUTC().toLocaleString(DateTime.DATETIME_MED)}</div>
        <div className="flex">
          <FontAwesomeIcon className="" icon="fa-solid fa-arrow-right" />
        </div>
        <div className="flex">{DateTime.fromISO(flightObject.arrival.actual ? flightObject.arrival.actual : flightObject.arrival.scheduled).toUTC().toLocaleString(DateTime.DATETIME_MED)}</div>
      </div>
      <div className="flex">{flightObject.flight_status}</div>
    </>
  )
}

export default FlightInfo;