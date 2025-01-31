import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { googleLogout } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  //   DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

// import { useNavigate } from "react-router-dom";

const Header = () => {
  //fetch user data from localStorage and parsing to json format
  const user = JSON.parse(localStorage.getItem("user"));

  //to maintain the state of the dialog for login button
  const [openDialog, setOpenDialog] = useState(false);

  //   const navigation = useNavigate();

  useEffect(() => {
    console.log(user);
  });

  //google login method
  const login = useGoogleLogin({
    onSuccess: (respone) => GetUserProfile(respone),
    onError: (err) => console.log(err),
  });

  //geeting user info from google
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
        window.location.reload();
      });
  };

  return (
    <div className="p-2 shadow-sm flex justify-between">
      <img src="/logo.svg" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            {/* since header component is not in react dom in main.jsx
            i have to wrap my-trip button in <a></a> */}

            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>

            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger
                className="bg-transparent p-0 inline-flex
                border-none outline-none"
              >
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>

              {/* when user press logout button it will trigger googleauth logout
              and clear data from localStorage and redirect to the home screen/Hero page */}
              <PopoverContent className="cursor-pointer">
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                    // navigation("/");
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Sign In
          </Button>
        )}
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
};

export default Header;
