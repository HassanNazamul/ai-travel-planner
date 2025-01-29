/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function Itinerary({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>

      <div>
        {/* Itirating over itinery for to get number of days */}
        {trip?.tripData?.travelPlan?.itinerary.map((item, index) => (
          <div key={index}>
            <h2 className="font-medium  text-lg">Day {item?.day} </h2>

            <div>
              {/* itirating on each day plans */}
              {item?.plan.map((place, index) => (
                <div>
                  <h2 key={index}>{place.placeName}</h2>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
