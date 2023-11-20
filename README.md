# Airport Timing
This project was created to help figure out the best time to leave your house to pick up someone from the airport. This project uses maps from [leaftlet](https://leafletjs.com/) and flight tracking data from [aviationstack](https://aviationstack.com/).

## Known Issues/Future Fixes
- currently only works with direct flights
- enhance search to include city and state (currently only searches by exact airport name)
- calculate better estimated leave time
	- adjust for real time traffic
	- adjust for airport volume both normally and seasonally
- utilize local storage for persisting entered data on page refresh