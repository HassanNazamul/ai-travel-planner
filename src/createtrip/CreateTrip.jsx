import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  //   DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  //all the state const are here
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    if (name == "noOfdays" && value > 5) {
      console.log("Please enter days < 5");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //const state last

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  //all the method are below

  //google login method
  const login = useGoogleLogin({
    onSuccess: (respone) => GetUserProfile(respone),
    onError: (err) => console.log(err),
  });

  //geeting user info from google
  //this method can be store in Google_API in service file
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  //generating the trip from Gemini
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    //if user is not  logged in then it will open the login dialog box
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      formData?.noOfdays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      // to show toast method
      toast("Please fill all details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfdays)
      .replace("{travellers}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfdays);
    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    // console.log(result?.response?.text());

    setLoading(false);
    // saving the ai trip plan to the database
    SaveAiTrip(result?.response.text());
  };

  //saving the trip to the database
  const SaveAiTrip = async (tripData) => {
    const user = JSON.parse(localStorage.getItem("user"));

    setLoading(true);
    const docID = Date.now().toString();
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docID,
    });

    setLoading(false);

    navigate("/view-trip/" + docID);
  };

  //method last area

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 m-20 ">
      <h2 className="font-bold text-3xl">Tell us your travel preference</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic info, and our trip planner will generate a
        customized itinery based on your perference
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* this is one is for destination */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value);
                handleInputChange("location", value);
                // console.log(value)
              },
            }}
          />
        </div>

        {/* this is for days */}
        <div>
          <h2 className="text-xl my-3 font-medium">How many days?</h2>
          <Input
            placeholder={"Example: 3 Days"}
            type="number"
            onChange={(e) => handleInputChange("noOfdays", e.target.value)}
          />
        </div>

        {/* this is to get budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
            ${
              formData?.budget === item.title ? "shadow-md border-gray-400" : ""
            }`}
              >
                <h2 className="text-4xl"> {item.icon} </h2>
                <h2 className="font-bold text-lg"> {item.title} </h2>
                <h2 className="text-sm text-gray-500"> {item.desc} </h2>
              </div>
            ))}
          </div>
        </div>

        {/* to get traveller and accompany details */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with on your next trip
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${
                    formData?.traveller === item.people
                      ? "shadow-md border-gray-400"
                      : ""
                  }`}
              >
                <h2 className="text-4xl"> {item.icon} </h2>
                <h2 className="font-bold text-lg"> {item.title} </h2>
                <h2 className="text-sm text-gray-500"> {item.desc} </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign in Google</h2>
              <p>Sign in to the App with Google Authentication </p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                {" "}
                <FcGoogle className="h-7 w-7" />
                Sign in
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
