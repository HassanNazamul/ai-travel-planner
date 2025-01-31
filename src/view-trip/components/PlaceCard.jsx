/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  return (
    <Link
      to={"https://www.google.com/maps/search/?q=" + place?.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img src="/tripPic.jpg" className="w-[130px] h-[130px] rounded-xl" />

        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-500">{place.placeDetail}</p>
          <h2 className="mt-2"> 🕛 {place.travelTime}</h2>
          {/* <Button size="sm"><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
