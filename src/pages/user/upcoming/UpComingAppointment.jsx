import LoadingSpinner from "../../../components/LoadingSpinner";

import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpComingTable from "./UpComingTable";

const TABLE_HEAD = ["Test Name", "Slot", "Date", "Status", "Action"];

export default function UpComingAppointment() {
  const { user } = useAuth();
  // console.log(loading)

  const axiosSecure = useAxiosSecure();

  const { data=[], isPending, refetch } = useQuery({
    queryKey: ["getBookingByEmail"],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure.get(`/bookings/${user?.email}`);
        return res.data;
      }
    },
  });

  if (isPending) return <LoadingSpinner />;

  console.log(data);

  return (
    <div>
      <h1>Upcoming appinetment</h1>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((booking) => (
              <UpComingTable key={booking._id} refetch={refetch} data={booking} />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
