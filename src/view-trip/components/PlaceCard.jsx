/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// import { Button } from "@/components/ui/button";
// import { FaMapLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PHOTO_REF_URL, getPlaceDetail } from "@/service/GlobalApi";

function PlaceCard({ place }) {
  //to store the url of the photo
  const [photoUrl, setPhotoUrl] = useState();

  //when page is loaded with trip, then it will call the method to fetch photo and display it
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  //this a method which call getPlaceDetail method from service package
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
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
    <Link
      to={"https://www.google.com/maps/search/?q=" + place?.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "/tripPic.jpg"}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />

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
