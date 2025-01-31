/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/service/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HistoryCards from "./component/HistoryCards";

function MyTrips() {
  //when page load it will first trigger getUserTrips method
  useEffect(() => {
    GetUserTrips();
  }, []);

  //declaring navigation of react-dom
  const navigation = useNavigate();

  //to store search history of trip which is in firestore
  const [userTrips, setUserTrips] = useState([]);

  //this method will get user from localtorage
  // and throug that will able to get all user histroy from firestore
  const GetUserTrips = async () => {
    //fetching and storing user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    //if no user then it will redirect to home page
    if (!user) {
      navigation("/");
      return;
    }

    //running firebase query to get collection from particular user only, where email matches
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    setUserTrips([]);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());

      setUserTrips((preVal) => [...preVal, doc.data()]);
      // console.log(userTrips);
    });
  }; //end of GetUserTrip method

  return (
    <div className="p-10 md:px-20 lg:px-36">
      <h2 className="font-bold text-3xl">My Trips</h2>

      {/* adding grid class here because this is the who is rendering the objects */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <div key={index}>
                <HistoryCards trip={trip} />
              </div>
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index} 
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
