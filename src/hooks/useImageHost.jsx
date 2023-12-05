import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const IMAGE_HOSTING_URL = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMGBB_API_KEY
}`;
export default function useImageHost() {
  const {data, isPending, mutateAsync, mutate, isError, error , status} = useMutation({
    mutationKey: ["imageHost"],
    mutationFn: async (imageData) => {
      const response = await axios.post(IMAGE_HOSTING_URL, imageData, {
        headers: {
          "content-type": "reservationrt/form-data",
        },
      });
      return response.data;
    },
  });

  return {data, isPending, mutateAsync, mutate, isError, error, status}
}
