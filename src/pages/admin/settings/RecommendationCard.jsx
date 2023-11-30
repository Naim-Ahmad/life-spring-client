import { TrashIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardBody,
    IconButton,
    Tooltip
} from "@material-tailwind/react";
import React from "react";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function RecommendationCard({ recommendation, refetch }) {

    const { _id } = recommendation;

    const [open, setOpen] = React.useState(false);


    const handleOpen = () => setOpen((cur) => !cur)

    const url = recommendation?.bg_image || 'https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg'

    const axiosSecure = useAxiosSecure()

    const handleDelete = id => {

            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Delete it!",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  const res = await axiosSecure.delete(`/banners/${id}`)
                  console.log(res.data);
                  if (res.data._id) {
                    refetch();
                    Swal.fire({
                      title: "Deleted!",
                      text: "Banner Deleted Successfully",
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
              }
            });
    }

    const handleSetBanner = () => {
        axiosSecure.patch(`/banners/${_id}`, { isActive: true })
            .then(res => {
                if (res.data._id) {
                    refetch()
                    Swal.fire('Set Banner Successfully')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <Card
                className="h-64 cursor-pointer group overflow-hidden relative transition-opacity hover:opacity-90 "
                key={recommendation._id}
            >
                <img
                    alt="nature"
                    className="h-full w-full object-cover object-center"
                    src={recommendation?.bg_image}
                />
                <CardBody className="absolute opacity-0 group-hover:opacity-100 group-hover:transition flex justify-center items-center h-full w-full hover:backdrop-brightness-50">
                    <div className="flex gap-2">
                        <Tooltip content="Preview">
                            <IconButton variant="text" onClick={handleOpen}>
                                <MdOutlineRemoveRedEye color="white" size={30} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Banner">
                            <IconButton onClick={() => handleDelete(_id)} variant="text">
                                <TrashIcon className="h-6 w-6" color="white" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip content="Set As Banner">
                            <IconButton onClick={handleSetBanner} variant="text">
                                <CiImageOn className="h-6 w-6" color="white" />
                            </IconButton>
                        </Tooltip>


                    </div>
                </CardBody>
            </Card>
{/* 
            <Dialog open={open} handler={handleOpen} size="xl" >
                <DialogHeader className="flex justify-end">
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>

                <DialogBody>

                    <div className="hero flex justify-center bg-no-repeat bg-cover bg-center items-center min-h-[80svh]" style={{ backgroundImage: `url(${url})` }}>
                        <div className="hero-content text-center text-neutral-content  min-h-[80svh] w-full flex justify-center items-center backdrop-brightness-50">
                            <div className="max-w-md">
                                <Typography variant="h1" color="white">{banner?.bannerTitle}</Typography>
                                <Typography variant="paragraph" color="white" className="font-medium">{recommendation?.bannerDescription}</Typography>
                                <Button color="green" className="mt-3">Get Start</Button>
                            </div>
                        </div>
                    </div>
                </DialogBody>

            </Dialog> */}
        </>
    )
}