import {
  InformationCircleIcon,
  NoSymbolIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CiMenuKebab } from "react-icons/ci";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function UsersTable({ user, index }) {
  //   console.log(user);
  const { _id, avatar, name, email, status, role } = user;
  const isLast = index === user?.length - 1;
  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, status: updateStatus } = useMutation({
    mutationKey: ["blockUser", _id],
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/users/${_id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  const handleBlock = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Block this!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate({ status: "block" });
        if (updateStatus === "success") {
          Swal.fire({
            title: "Blocked!",
            icon: "success",
          });
        }
      }
    });
  };

  const handleUnblock = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unblock this!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate({ status: "active" });
        if (updateStatus === "success") {
          Swal.fire({
            title: "Unblocked!",
            icon: "success",
          });
        }
      }
    });
  };

  const handleMakeUser = () => {
    mutate({ role: "user" });
    if (updateStatus === "success") {
      Swal.fire({
        title: `${name} User Now!`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleMakeAdmin = () => {
    mutate({ role: "admin" });
    if (updateStatus === "success") {
      Swal.fire({
        title: `${name} admin Now!`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <tr>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar src={avatar} alt={name} size="sm" />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {name}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {email}
            </Typography>
          </div>
        </div>
      </td>

      <td className={classes}>
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={status}
            color={status === "active" ? "green" : "blue-gray"}
          />
        </div>
      </td>

      <td className={classes}>
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={role}
            color={role === "admin" ? "green" : "blue-gray"}
          />
        </div>
      </td>

      <td className={classes}>
        <Menu placement="bottom-end">
          <MenuHandler>
            <IconButton variant="text">
              <CiMenuKebab className="h-4 w-4" />
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem className="items-center gap-2 flex">
              {" "}
              <InformationCircleIcon className="h-4 w-4" /> See Info
            </MenuItem>

            {status === "block" || (
              <div>
                {role === "admin" ? (
                  <MenuItem
                    onClick={handleMakeUser}
                    className="flex items-center gap-2"
                  >
                    <UserGroupIcon className="h-4 w-4" /> Make User
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={handleMakeAdmin}
                    className="flex items-center gap-2"
                  >
                    <UserIcon className="h-4 w-4" /> Make Admin
                  </MenuItem>
                )}
              </div>
            )}

            {status === "active" ? (
              <Typography variant="small" className="font-medium" color="red">
                <MenuItem
                  onClick={handleBlock}
                  className="flex items-center gap-2"
                >
                  <NoSymbolIcon className="h-4 w-4" />
                  Block
                </MenuItem>
              </Typography>
            ) : (
              <MenuItem
                onClick={handleUnblock}
                className="flex items-center gap-2"
              >
                <NoSymbolIcon className="h-4 w-4" />
                Unblock
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}
