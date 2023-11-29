import { Button, Card, CardBody, Input, Spinner, Textarea, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionHeader from '../../shared/SectionHeader';

const IMAGE_HOSTING_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
    }`;
export default function AddBanner() {

    const { register, handleSubmit } = useForm()

    const [loading, setLoading] = useState(false)

    const axiosSecure = useAxiosSecure()

    const handleAddBanner = async (data) => {
        // console.log(data.bannerURL)
        const imageData = { image: data.bannerURL[0] }
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
                    bannerURL: uploadedImageData.data.data.display_url
                }
                console.log('bannerData', bannerData)

                const { data: insertedData } = await axiosSecure.post('/banners', bannerData)
                if (insertedData?._id) {
                    setLoading(false)
                    Swal.fire({
                        icon: "success",
                        title: "Banner Saved Successfully!",
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

    return (
        <div>
            <SectionHeader title="Add Banner" description={<span className='text-lg text-gray-600'>Fill Banner Info to <span className='text-green-500'>Upload Banner</span> </span>} />
            <div>
                <Card className='max-w-4xl mx-auto'>
                    <CardBody>
                        <form onSubmit={handleSubmit(handleAddBanner)}>
                            <Input {...register('bannerTitle')} label="Hero Title" className='mb-10' containerProps={{ className: "mb-6" }} />
                            <Textarea {...register('bannerDescription')} label="Hero Description" containerProps={{ className: "mb-6" }} />

                            <Typography variant='small' className='font-medium'>
                                Select Banner
                            </Typography>
                            <div>
                                <input {...register('bannerURL')} type="file" accept='image/*' name="bannerURL" id="" className='mt-3 mb-5' />
                            </div>
                            <Button disabled={loading} type='submit' fullWidth color='green'>{loading ? <div className='flex justify-center'><Spinner /></div> : 'Upload Banner'}</Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}