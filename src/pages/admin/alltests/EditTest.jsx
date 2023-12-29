import {
    Button,
    Card,
    CardBody,
    Checkbox,
    Dialog,
    Input,
    List,
    ListItem,
    ListItemPrefix,
    Spinner,
    Textarea,
    Typography
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import UploadButton from "../../../components/UploadButton";
import useTests from "../../../hooks/tests/useTests";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionHeader from "../../shared/SectionHeader";

const timeSlots = [
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
];

import { IMAGE_HOSTING_URL } from '../../register/Register';

// console.log(IMAGE_HOSTING_URL)

export default function EditTest({ open, handleOpen, test }) {
    const [imageData, setImgData] = useState({ name: test?.imageURL })
    const { handleSubmit, register } = useForm();
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { refetch } = useTests()
    // console.log(imageData)

    const handleEditTest = async (data) => {
        // console.log(data);
        // console.log(checkboxRef.current)
        const dataEntries = Object.entries(data);
        const availableSlots = [];
        dataEntries.forEach((data) => {
            if (data[1] === true) {
                availableSlots.push(data[0]);
            }
        });

        // console.log(imageData)

        // let res = null;

        try {
            setLoading(true)
            if (imageData?.type) {
                console.log('if')
                const res = await axios.post(IMAGE_HOSTING_URL, { image: imageData }, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });

                const testData = {
                    testName: data?.testName,
                    description: data?.description,
                    price: data?.price,
                    imageURL: res?.data?.data?.display_url,
                    availableSlots,
                    date: new Date(data?.date)
                };


                const updatedData = await axiosSecure.put(`/tests/${test?._id}`, testData)
                handleOpen()
                refetch()
                if (updatedData?.data?._id) {
                    Swal.fire({
                        title: "Saved!",
                        text: "Saved Test Info Successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setLoading(false)
                }

            }else{

                console.log('else')

                const testData = {
                    testName: data?.testName,
                    description: data?.description,
                    price: data?.price,
                    imageURL: test?.imageURL,
                    availableSlots,
                    date: new Date(data?.date)
                };
               
    
                const updatedData = await axiosSecure.put(`/tests/${test?._id}`, testData)
                handleOpen()
                refetch()
                if (updatedData?.data?._id) {
                    Swal.fire({
                        title: "Saved!",
                        text: "Saved Test Info Successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setLoading(false)
                }
            }

            // console.log(imageData?.type)

            // console.log(res)


        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false)
        }
    };

    return (
        <Dialog
            size="lg"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none h-[90svh] overflow-y-scroll"
        >

            <Card>
                <CardBody>
                    <SectionHeader title="" description={<span>Edit the <span className="text-green-500">Service</span></span>} />
                    <form
                        className="grid lg:grid-cols-2 gap-6  mx-auto"
                        onSubmit={handleSubmit(handleEditTest)}
                    >
                        <div className="col-span-2 lg:col-auto">
                            <div className="mb-12">
                                <Input
                                    variant="static"
                                    label="Test Name"
                                    defaultValue={test?.testName}
                                    {...register("testName")}
                                />
                            </div>

                            <div className="mb-12">
                                <Input
                                    variant="static"
                                    type="number"
                                    label="Price"
                                    defaultValue={test?.price}
                                    {...register("price")}
                                />
                            </div>
                            <div className="mb-12">
                                <Input
                                    variant="static"
                                    type="date"
                                    label="Date"
                                    defaultValue={test?.date}

                                    {...register("date")}
                                />
                            </div>
                            <div className="col-span-2 lg:col-auto">
                                <UploadButton label="Choose Image" imgData={imageData} setImgData={setImgData} />
                                {/* <input {...register("imageURL")} type="file" accept="image/*" /> */}
                            </div>
                        </div>

                        {/* =====================================
                            time slot checkbox
                            =====================================
                        */}

                        <div className="relative col-span-2 lg:col-auto">
                            <div className="">
                                <Typography variant="h6" color="blue-gray" className="">
                                    Available Time Slots
                                </Typography>
                                <List className="grid grid-cols-2">
                                    {timeSlots.map((time) => (
                                        <ListItem key={time} className="p-0">
                                            <label
                                                htmlFor="vertical-list-react"
                                                className="flex w-full cursor-pointer items-center px-3 py-2"
                                            >
                                                <ListItemPrefix className="mr-3">
                                                    <Checkbox
                                                        id="vertical-list-react"
                                                        ripple={false}
                                                        className="hover:before:opacity-0"
                                                        defaultChecked={test?.availableSlots.includes(time)}
                                                        containerProps={{
                                                            className: "p-0",
                                                        }}
                                                        {...register(time)}
                                                    />
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="font-medium">
                                                    {time}
                                                </Typography>
                                            </label>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </div>


                        <div className="col-span-2">
                            <Textarea
                                defaultValue={test?.description}
                                label="Test Description"
                                {...register("description")}
                            />
                        </div>

                        <div className="col-span-2">
                            <Button color="green" disabled={loading} type="submit" fullWidth>
                                {loading ? <div className="flex justify-center"><Spinner /></div> : "save info"}
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>


        </Dialog>
    );
}
