import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Dialog,
    DialogBody,
    Typography
} from "@material-tailwind/react";


export default function UserInfo({ handleOpen, open, data: user }) {
    // console.log(Object.keys(data).join(','))
    // const { _id, name, avatar, email, bloodGroup, district, upazila, status, role, reservation, } = data;
    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogBody>
                    <Card shadow={false} className="w-full p-10 max-w-[48rem] flex justify-center">
                        <CardHeader
                            shadow={false}
                            floated={false}
                            className="m-0"
                        >
                            <div className="flex justify-center flex-col items-center">
                                <Avatar
                                    size="xxl"
                                    src={
                                        user?.avatar
                                            ? user?.avatar
                                            : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                    }
                                    alt="avatar"
                                />
                                <Typography variant="h5" color="blue-gray">
                                    {user?.name}
                                </Typography>
                                <Typography className=" flex  gap-2 font-normal">
                                    <span className="font-bold"></span> {user?.email}
                                </Typography>
                            </div>
                        </CardHeader>
                        <div className="flex justify-evenly">
                            <CardBody className="grid grid-cols-2 gap-x-8">
                                <Typography className=" flex  gap-2 font-normal">
                                    <span className="font-bold">Blood Group: </span>{" "}
                                    {user?.bloodGroup}
                                </Typography>

                                <Typography className=" flex  gap-2 font-normal">
                                    <span className="font-bold">District: </span> {user?.district}
                                </Typography>

                                <Typography className=" flex  gap-2 font-normal">
                                    <span className="font-bold">Upazila: </span> {user?.upazila}
                                </Typography>
                                <Typography className=" flex  gap-2 font-normal">
                                    <span className="font-bold">Reservation: </span> {user?.reservation?.length}
                                </Typography>
                                <Typography className="capitalize flex  gap-2 font-normal">
                                    <span className="font-bold ">Status: </span> {user?.status}
                                </Typography>
                                <Typography className="capitalize flex  gap-2 font-normal">
                                    <span className="font-bold">Role: </span> {user?.role}
                                </Typography>
                            </CardBody>
                        </div>
                    </Card>
                    <div className="flex justify-end">
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    </div>
                </DialogBody>
                
            </Dialog>
        </>
    );
}