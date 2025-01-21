import { useParams } from "react-router-dom";
import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function ViewTrip() {
  const { tripId } = useParams();

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);

    const docSnap = await getDoc(docRef);
  };

  return <div>index: {tripId} </div>;
}

export default ViewTrip;
