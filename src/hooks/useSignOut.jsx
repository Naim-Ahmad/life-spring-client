import toast from "react-hot-toast";
import useAuth from "./useAuth";

export default function useSignOut() {

  const {logOut} = useAuth()
  
  const handleSignOut = () => {
    const toastId = toast.loading("Loading...");
    logOut()
      .then(() => {
        toast.success("Log out successful", {
          id: toastId,
        });
      })
      .catch((err) => {
        // setLoading(false)
        toast.error(err.message, {
          id: toastId,
        });
        console.log(err);
      });
  };

  return handleSignOut
}