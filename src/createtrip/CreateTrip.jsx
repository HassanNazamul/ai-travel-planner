import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { useEffect, useState } from "react"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { toast } from "sonner";

function CreateTrip() {

    const [place, setPlace] = useState();

    const [formData, setFormData] = useState([]);

    const handleInputChange = (name, value) => {

        if (name == 'noOfdays' && value > 5) {
            console.log('Please enter days < 5')
        }

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])


    const OnGenerateTrip = () => {
        if (formData?.noOfdays > 5 || (!formData?.location || !formData?.budget || !formData?.traveller)) {
            // to show toast method
            toast("Please fill all details");
            return;
        }

        console.log(formData)
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 m-20 ">

            <h2 className="font-bold text-3xl">Tell us your travel preference</h2>
            <p className="mt-3 text-gray-500 text-xl">Just provide some basic info, and our trip planner will
                generate a customized itinery based on your perference</p>


            <div className="mt-20 flex flex-col gap-10">

                {/* this is one is for destination */}
                <div>
                    <h2 className="text-xl my-3 font-medium">What is your destination?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (value) => {
                                setPlace(value);
                                handleInputChange("location", value);
                                // console.log(value)
                            }
                        }}
                    />
                </div>

                {/* this is for days */}
                <div>
                    <h2 className="text-xl my-3 font-medium">How many days?</h2>
                    <Input placeholder={'Example: 3 Days'} type="number"
                        onChange={(e) => handleInputChange("noOfdays", e.target.value)}
                    />
                </div>

                {/* this is to get budget */}
                <div>
                    <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((item, index) => (

                            <div key={index}
                                onClick={() => handleInputChange("budget", item.title)}
                                className="p-4 border rounded-lg hover:shadow-lg cursor-pointer">
                                <h2 className="text-4xl"> {item.icon} </h2>
                                <h2 className="font-bold text-lg"> {item.title} </h2>
                                <h2 className="text-sm text-gray-500"> {item.desc} </h2>
                            </div>
                        ))}
                    </div>
                </div>


                {/* to get traveller and accompany details */}
                <div>
                    <h2 className="text-xl my-3 font-medium">Who do you plan on travelling with on your next trip</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectTravelList.map((item, index) => (

                            <div key={index}
                                onClick={() => handleInputChange("traveller", item.people)}
                                className="p-4 border rounded-lg hover:shadow-lg cursor-pointer">
                                <h2 className="text-4xl"> {item.icon} </h2>
                                <h2 className="font-bold text-lg"> {item.title} </h2>
                                <h2 className="text-sm text-gray-500"> {item.desc} </h2>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="my-10 justify-end flex">
                <Button onClick={OnGenerateTrip}>Generate Trip</Button>
            </div>

        </div>

    )
}

export default CreateTrip