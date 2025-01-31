import axios from "axios";

// Api url from google place api - search with text
const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    // this helps data to return in json format
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,

    // this field mask is to make request what data you want
    "X-Goog-FieldMask": "places.id,places.displayName,places.photos",
  },
};

export const getPlaceDetail = (data) => axios.post(BASE_URL, data, config);

export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
