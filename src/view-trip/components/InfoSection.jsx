/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
// import { tripPic } from "@/assets/tripPic.jpg";

function InfoSection({ trip }) {
  return (
    <div>
      <img
        src="/tripPic.jpg"
        alt=""
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
