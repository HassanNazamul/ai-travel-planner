/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { getPlaceDetail } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

/* eslint-disable no-unused-vars */
function HistoryCards({ trip }) {
  //to store the url of the photo
  const [photoUrl, setPhotoUrl] = useState();

  //when page is loaded with trip, then it will call the method to fetch photo and display it
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  //this a method which call getPlaceDetail method from service package
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    const result = await getPlaceDetail(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);

      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(photoUrl);
    });
  };

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all ">
        <img
          src={photoUrl ? photoUrl : "tripPic.jpg"}
          className="object-cover rounded-xl h-[220px] w-full"
        />

        <div>
          <h2 className="font-bold text-lg">
            {trip.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfdays} days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default HistoryCards;
