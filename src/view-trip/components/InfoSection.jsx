/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { getPlaceDetail } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { PHOTO_REF_URL } from "@/service/GlobalApi";
// import { tripPic } from "@/assets/tripPic.jpg";

function InfoSection({ trip }) {
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
    <div>
      <img
        src={photoUrl ? photoUrl : "/tripPic.jpg"}
        className="h-[340px] w-full object-cover rounded-xl"
      />

      {/* place basic info */}
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {trip?.userSelection?.location?.label}
        </h2>

        <div className="flex justify-between items-center">
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfdays} days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💸 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 {trip?.userSelection?.traveller} traveller
            </h2>
          </div>

          <Button>
            <IoIosSend />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
