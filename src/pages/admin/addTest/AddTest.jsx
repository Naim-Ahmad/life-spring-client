import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import UploadButton from "../../../components/UploadButton";
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

const IMAGE_HOSTING_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
  }`;

export default function AddTest() {
  const { handleSubmit, register } = useForm();
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)

  const [imageData, setImgData] = useState(null)

  const handleAddTest = async (data) => {
    // console.log(data);
    // console.log(checkboxRef.current)
    // console.log(new Date(data?.date))

    const dataEntries = Object.entries(data);
    const availableSlots = [];
    dataEntries.forEach((data) => {
      if (data[1] === true) {
        availableSlots.push(data[0]);
      }
    });

    const imageData = { image: data.imageURL[0] };

    try {
      setLoading(true)
      const res = await axios.post(IMAGE_HOSTING_URL, imageData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const testData = {
        testName: data?.testName,
        description: data?.description,
        price: data?.price,
        imageURL: res.data?.data?.display_url,
        availableSlots,
        date: new Date(data?.date)
      };
      // console.log(new Date(data?.date))

      const insertedData = await axiosSecure.post('/tests', testData)
      if (insertedData?.data?._id) {
        Swal.fire({
          title: "Added Test!",
          text: "Added Test Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 2000
        });
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false)
    }
  };

  return (
    <Card className="mx-auto pt-16">
      <CardHeader shadow={false}>
        <SectionHeader title="" description={<span>Add a <span className="text-green-500">Service</span></span>} />
      </CardHeader>
      <CardBody>
        <form
          className="grid md:grid-cols-2 gap-6  mx-auto"
          onSubmit={handleSubmit(handleAddTest)}
        >
          <div className="col-span-2 md:col-auto">
            <div className="mb-12">
              <Input
                variant="static"
                label="Test Name"
                {...register("testName")}
              />
            </div>

            <div className="mb-12">
              <Input
                variant="static"
                type="number"
                label="Price"
                {...register("price")}
              />
            </div>
            <div className="mb-12">
              <Input
                variant="static"
                type="date"
                label="Price"
                {...register("date")}
              />
            </div>
            <div className="">

              {/* <input {...register("imageURL")} type="file" accept="image/*" /> */}
              
                {/* <Button  variant="outlined" className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  Choose Avatar
                </Button> */}
                <UploadButton label="Choose Thumbnail" imgData={imageData} setImgData={setImgData}/>
            </div>
          </div>

          {/* =====================================
            time slot checkbox
            ============================================
        */}

          <div className="relative col-span-2 md:col-auto"> 
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
              label="Test Description"
              {...register("description")}
            />
          </div>

          <div className="col-span-2">
            <Button color="green" disabled={loading} type="submit" fullWidth>
              {loading ? <div className="flex justify-center"><Spinner /></div> : "Add Test"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
