import { Button, Chip, Tooltip, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function UpComingTable({ data: reservation, refetch }) {
  const { _id, test, slot, status } = reservation;

  // const status = 'canceled'
  console.log(test)

  const axiosSecure = useAxiosSecure();

  const handleCancel = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/reservations/${_id}`);
          console.log(res.data);
          if (res.data._id) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "Canceled appointment Successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            // setLoading(false)
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <tr className="even:bg-blue-gray-50/50">
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {test?.testName}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {slot}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {new Date(test?.date).toLocaleDateString() || ""}
        </Typography>
      </td>
      <td className="p-4">
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={status}
            color={status !== "pending" ? status === 'canceled' ? "red" : "green" : "blue-gray"}
          />
        </div>
      </td>
      <td className="p-4">
        <Tooltip content={status === 'pending' ? "Cancel Appointment" : "Delete Appointment"}>
          <Button onClick={handleCancel} variant="text" color="red" size="sm" className="font-medium">
            {status === 'pending' ? 'Cancel' : 'Delete'}
          </Button>
        </Tooltip>
      </td>
    </tr>

  );
}
