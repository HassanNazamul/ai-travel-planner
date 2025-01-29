import { useParams } from "react-router-dom";
import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useEffect, useState } from "react";

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
    <>
      <div>{/* Basic Info Section */}</div>

      <div>{/* Recommeded Hotel */}</div>

      <div>{/* Itenary or daily Plan */}</div>

      <div>{/* Footer */}</div>
    </>
  );
}

export default ViewTrip;
