import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Avatar, Chip, IconButton, Typography } from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EditTest from "./EditTest";

export default function TestTable({ test, index }) {
  //   console.log(Object.keys(test).join(','));
  // console.log(test)
  const {
    _id,
    testName,
    description,
    imageURL,
    price,
    date,
    reservation,
    availableSlots,
  } = test;
  const isLast = index === test?.length - 1;
  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

  const [open, setOpen] = useState(false)

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, status: deleteStatus } = useMutation({
    mutationKey: ["deleteTest", _id],
    mutationFn: async () => {
      const res = await axiosSecure.delete(`/tests/${_id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allTests"]);
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
        if (deleteStatus === "success") {
          Swal.fire({
            title: "Deleted!",
            icon: "success",
          });
        }
      }
    });
  };

  const handleOpen = () => setOpen(!open)

  return (
    <tr>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar src={imageURL} alt={testName} size="sm" />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {testName}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {description.length > 40
                ? `${description.slice(0, 40)}...`
                : description}
            </Typography>
          </div>
        </div>
      </td>


      <td className={classes}>
        <div className="w-max">
          <Chip variant="ghost" size="sm" value={`₹${price}`} color={"green"} />
        </div>
      </td>

      <td className={classes}>
        <div className="w-max">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            <Chip variant="ghost" size="sm" value={availableSlots.length} color={"green"} />
          </Typography>
        </div>
      </td>

      <td className={`${classes}`}>
        <div className="w-max pl-5">
          <Chip variant="ghost" size="sm" value={reservation.length} color={"green"} />
        </div>
      </td>

      <td>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {date}
        </Typography>
      </td>

      <td className={classes}>
        <IconButton onClick={handleOpen} variant="text">
          <PencilIcon className="h-4 w-4" />
        </IconButton>
        <IconButton onClick={handleDelete} variant="text">
          <TrashIcon className="h-4 w-4" />
        </IconButton>
      </td>
      <EditTest open={open} handleOpen={handleOpen} test={test} />
    </tr>
  );
}
