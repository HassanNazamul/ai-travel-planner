/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import PlaceCard from "./PlaceCard";

/* eslint-disable no-unused-vars */
function Itinerary({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>

      <div>
        {/* Itirating over itinery for to get number of days */}
        {trip?.tripData?.travelPlan?.itinerary.map((item, index) => (
          <div key={index} className="mt-5">
            {/* it show Day */}
            <h2 className="font-medium text-lg">Day {item?.day} </h2>

            {/* this show each day plan */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* itirating on each day plans */}
              {item?.plan.map((place, index) => (
                <div>
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.time}
                  </h2>

                  {/* passing itienary which is a array which contain plans of daily */}
                  <PlaceCard place={place} />
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
