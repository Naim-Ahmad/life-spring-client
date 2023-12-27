import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useUser from "../../../hooks/users/useUser";
import EditProfile from "./EditProfile";

export default function MyProfile() {
  const { data: user, isLoading, isPending } = useUser();
  const [open, setOpen] = useState(false)

  const handleOpen = ()=>{
    setOpen(!open)
  }

  if ((isLoading, isPending)) return <LoadingSpinner />;
  // console.log(user);

  return (
    <div>
      <div className="flex justify-center items-center pt-32">
        <Card className="w-full p-10 max-w-[48rem] flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 flex justify-center shrink-0 rounded-r-none"
          >
            <div className="flex flex-col gap-3 justify-center items-center">
              <Avatar
                size="xxl"
                src={
                  user?.avatar
                    ? user?.avatar
                    : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                }
                alt="avatar"
              />
              <Button onClick={handleOpen} color="green" size="sm">Edit Profile</Button>
            </div>
          </CardHeader>
          <CardBody>
            <Typography className="mb-3 font-normal">
              <span className="font-bold">Full Name: </span> {user?.name}
            </Typography>
            <Typography className="mb-3 font-normal">
              <span className="font-bold">Email: </span> {user?.email}
            </Typography>

            <Typography className="mb-3 font-normal">
              <span className="font-bold">Blood Group: </span>{" "}
              {user?.bloodGroup}
            </Typography>

            <Typography className="mb-3 font-normal">
              <span className="font-bold">District: </span> {user?.district}
            </Typography>

            <Typography className="mb-3 font-normal">
              <span className="font-bold">Upazila: </span> {user?.upazila}
            </Typography>
          </CardBody>
        </Card>
      </div>
      <EditProfile open={open} handleOpen={handleOpen}/>
    </div>
  );
}
