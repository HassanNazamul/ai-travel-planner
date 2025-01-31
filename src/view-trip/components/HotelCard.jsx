/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaceDetail } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";

function HotelCard({ hotel }) {
  //to store the url of the photo
  const [photoUrl, setPhotoUrl] = useState();

  //when page is loaded with trip, then it will call the method to fetch photo and display it
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  //this a method which call getPlaceDetail method from service package
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
    <div>
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
          <img
            src={photoUrl}
            className="rounded-xl h-[180px] w-full object-cover"
          />

          <div className="my-2 flex-col gap-2 ">
            <h2 className="font-medium">{hotel?.hotelName}</h2>
            <h2 className="text-xs text-gray-500">📍{hotel?.hotelAddress}</h2>
            <h2 className="text-sm ">💰 {hotel?.price}</h2>
            <h2 className="text-sm ">⭐ {hotel?.rating} stars</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCard;
