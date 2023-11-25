import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

export default function useUser() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, isPending, refetch } = useQuery({
    queryKey: ["userByEmail", user?.email],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure.get(`/users/${user?.email}`);
        return res.data;
      }
    },
  });

  return{ data, isLoading, refetch , isPending};
}
