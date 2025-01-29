/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

/* eslint-disable react/jsx-key */
function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {/* Iteraing hotel Recommendations */}
        {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
          <Link
            to={
              "https://www.google.com/maps/search/?q=" +
              hotel?.hotelName +
              "," +
              hotel?.hotelAddress
            }
            target="_blank"
          >
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img src="/tripPic.jpg" className="rounded-xl" />

              <div className="my-2 flex-col gap-2 ">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">
                  📍{hotel?.hotelAddress}
                </h2>
                <h2 className="text-sm ">💰 {hotel?.price}</h2>
                <h2 className="text-sm ">⭐ {hotel?.rating} stars</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
