import { Avatar, Button, Chip, Tooltip, Typography } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SubmitResult from "./SubmitResult";

export default function ReservationTable({ reservation, index }) {
    const { _id, test, slot, status, user } = reservation;
    // console.log(reservation, slot)

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)

    const axiosSecure = useAxiosSecure()

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
                        // refetch();
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

    // console.log(test)

    const isLast = index === reservation?.length - 1;
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

    return (
        <tr className="even:bg-blue-gray-50/50">
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <Avatar src={user?.avatar} alt={user?.name} size="sm" />
                    <div className="flex flex-col">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {user?.name}
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                        >
                            {user?.email}
                        </Typography>
                    </div>
                </div>
            </td>
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {test?.testName}
                </Typography>
            </td>

            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {test?.date || ""}
                </Typography>
            </td>
            <td className="p-4">
                <div className="w-max">
                    <Chip
                        variant="ghost"
                        size="sm"
                        value={status}
                        color={status !== "pending" ? "green" : "blue-gray"}
                    />
                </div>
            </td>
            <td className="p-4 flex gap-2">
                <Tooltip content="Submit Appointment">
                    <Button onClick={handleOpen} size="sm" color="green" variant="outlined" className="font-medium">
                        {status === 'delivered'? "Re Submit": "Submit"}
                    </Button>
                </Tooltip>
                <Tooltip content="Cancel Appointment">
                    {/* <IconButton>
                        
                    </IconButton> */}
                    <Button onClick={handleCancel} size="sm" variant="text" color="red" className="font-medium">
                        Cancel
                    </Button>
                </Tooltip>
            </td>
            <SubmitResult open={open} handleOpen={handleOpen} data={reservation} />
        </tr>
    )
}