import LoadingSpinner from "../../../components/LoadingSpinner";

import { Card, Typography } from "@material-tailwind/react";
import useReservationById from "../../../hooks/reservation/useReservationById";
import SectionHeader from "../../shared/SectionHeader";
import UpComingTable from "./UpComingTable";

const TABLE_HEAD = ["Test Name", "Slot", "Date", "Status", "Action"];

export default function UpComingAppointment() {

  const { reservations, isPending, refetch } = useReservationById()

  if (isPending) return <LoadingSpinner />;

  // console.log(data);

  return (
    <div>
      <SectionHeader title="" description={<span>Upcoming <span className="text-green-500">Appointment</span></span>}/>
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
            {reservations.map((reservation) => ( reservation?.status !== 'delivered' &&
              <UpComingTable key={reservation._id} refetch={refetch} data={reservation} />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
