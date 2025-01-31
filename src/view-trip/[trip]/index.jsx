/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import InfoSection from "../components/infoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";
import Footer from "../components/Footer";

// this is page will show thw trip data
function ViewTrip() {
  //using url to recieve trip ID
  const { tripId } = useParams();

  //variable to store trip data i,e docSnap.data();
  const [trip, setTrip] = useState([]);

  //this will trigger everytime we enter to view-trip page
  //and it will call GetTripData method below
  useEffect(() => {
    //making condintion that whenever trip id is there then only it will call method
    tripId && GetTripData();
  }, [tripId]);

  //this method fetch the data from firebase Database provided tripID
  //code help is provided in firestore document
  const GetTripData = async () => {
    //stroing the doc (data) reference, collection name, and ID
    const docRef = doc(db, "AITrips", tripId);

    //fetching single doc from the collection
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document: ", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No data");
      toast("No trip Found");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Basic Info Section */}
      <div>
        {/* //paasing trip data to the infoSection */}
        <InfoSection trip={trip} />
      </div>

      {/* Recommeded Hotel */}
      <div>
        <Hotels trip={trip} />
      </div>

      {/* Itenary or daily Plan */}
      <div>
        <Itinerary trip={trip} />
      </div>

      <div>
        <Footer trip={trip} />
      </div>
    </div>
  );
}

export default ViewTrip;
