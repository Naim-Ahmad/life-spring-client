import { Button, Card, CardBody, Input, Spinner, Textarea, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Container from "../../../components/Container";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRecommendations from "../../../hooks/useRecommendations";
import SectionHeader from "../../shared/SectionHeader";

const IMAGE_HOSTING_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
    }`;

export default function Recommendation() {

    const { data: recommendations, isLoading, refetch } = useRecommendations()

    const { register, handleSubmit, reset } = useForm()

    const [loading, setLoading] = useState(false)

    const axiosSecure = useAxiosSecure()

    const handleAddBanner = async (data) => {
         // console.log(data.bannerURL)
         const imageData = { image: data.bg_image[0] }
         // console.log(data)
         try {
             setLoading(true)
             const uploadedImageData = await axios.post(IMAGE_HOSTING_URL, imageData, {
                 headers: {
                     "content-type": "multipart/form-data",
                 },
             })
             // console.log(uploadedImageData.data.data.display_url)
 
             if (uploadedImageData.data.data) {
                 const bannerData = {
                     ...data,
                     bg_image: uploadedImageData.data?.data?.display_url
                 }
                 console.log('bannerData', bannerData)
 
                 const { data: insertedData } = await axiosSecure.post('/recommendations', bannerData)
                 if (insertedData?._id) {
                     reset()
                     setLoading(false)
                     Swal.fire({
                         icon: "success",
                         title: "Recommendation Saved Successfully!",
                         showConfirmButton: false,
                         timer: 1500
                     });
                 }
             }
         } catch (error) {
             setLoading(false)
             console.log(error)
             toast.error(error.message)
         }
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <SectionHeader title="Health Recommendation" />
            <Container>
            <div>
                <Card className='max-w-4xl mx-auto'>
                    <CardBody>
                        <form onSubmit={handleSubmit(handleAddBanner)}>
                            <Input {...register('title')} label="Recommendation title" className='mb-10' containerProps={{ className: "mb-6" }} />
{/* 
                            <Input {...register('content')} label="Recommendation Content" className='mb-10' containerProps={{ className: "mb-6" }} /> */}

                            <Textarea {...register('content')} label="Recommendation details" containerProps={{ className: "mb-6" }} />

                            <Typography variant='small' className='font-medium'>
                                Select Banner
                            </Typography>

                            <div>
                                <input {...register('bg_image')} type="file" accept='image/*' name="bg_image" id="" className='mt-3 mb-5' />
                            </div>
                            <Button disabled={loading} type='submit' fullWidth color='green'>
                                {loading ? <div className='flex justify-center'><Spinner /></div> : 'Upload Recommendation'}
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
            </Container>
        </>
    )
}