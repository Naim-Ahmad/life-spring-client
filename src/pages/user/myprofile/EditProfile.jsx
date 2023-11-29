import { Button, Card, CardBody, Dialog, Input, Option, Select, Spinner, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/users/useUser";

const IMAGE_HOSTING_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
    }`;

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'OB+', 'O-',]

export default function EditProfile({ open, handleOpen }) {

    // const { handleSubmit, register } = useForm();
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { refetch, data: user } = useUser()

    const [district, setDistrict] = useState(user?.district);
    const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup);
    const [upazila, setUpazila] = useState(user?.upazila);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);


    const [avatarName, setAvatarName] = useState('No Image Selected')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const { register: signUp, loading, setLoading, updateUserInfo } = useAuth();

    useEffect(() => {
        fetch("../../../../public/districts.json")
            .then((res) => res.json())
            .then((data) => {
                setDistricts(data[2].data);
            });

        fetch("../../../../public/upazilas.json")
            .then((res) => res.json())
            .then((data) => {
                setUpazilas(data[2].data);
            });
    }, []);

    const handleUpload = () => {
        // avatarRef.click()
        console.log('first')
        document.getElementById('uploadAvatar').click()
    }

    const handleAvatarName = e => {
        setAvatarName(e.target.files[0])
        console.dir(e.target)
    }

    const handleEditProfile = async (data) => {
        // console.log(data);


        const imageData = { image: avatarName };

        // console.log(imageData?.image)


        try {
            setLoading(true)
            console.log(imageData.image)
            if (imageData.image !== "No Image Selected") {
                var res = await axios.post(IMAGE_HOSTING_URL, imageData, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });
            }

            const userData = {
                name: data?.name,
                email: data?.email,
                avatar: imageData.image !== 'No Image Selected' ? res.data?.data?.display_url : user?.avatar,
                bloodGroup: bloodGroup,
                district,
                upazila,
            };
              console.log(userData)

            const updatedData = await axiosSecure.put(`/users/${user?._id}`, userData)
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
            className="bg-transparent shadow-none"
        >

            <Card>
                <CardBody>
                    <Typography variant="h2" className="text-center">Edit Your<span className="text-green-500"> Profile</span></Typography>


                    <Card color="transparent" shadow={false} >

                        <form
                            onSubmit={handleSubmit(handleEditProfile)}
                            className="mt-8 mb-2"
                        >
                            <div className="mb-1 flex flex-col gap-6 w-full">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Your Name
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Name"
                                    defaultValue={user?.name}
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    {...register('name')}
                                />
                                {errors && errors?.password?.type === "required" && (
                                    <Typography
                                        variant="small"
                                        className="-mt-5 font-normal"
                                        color="red"
                                    >
                                        This field is required
                                    </Typography>
                                )}

                              
                    
                                <div className="flex gap-3">

                                    <Select
                                        size="lg"
                                        variant="outlined"
                                        label="Blood Group"
                                        name="bloodGroup"
                                        value={user?.bloodGroup}
                                        onChange={(v) => setBloodGroup(v)}
                                    >
                                        {bloodGroups.map(group => <Option key={group} value={group}>{group}</Option>)}

                                    </Select>

                                

                                    <Select
                                        size="lg"
                                        onChange={(v) => setDistrict(v)}
                                        variant="outlined"
                                        value={user?.district}
                                        label="Select District"
                                    >
                                        {districts.sort().map((district) => (
                                            <Option key={district?.id} value={district?.name}>
                                                {district?.name}
                                            </Option>
                                        ))}
                                    </Select>

                                    {/* {user?.district} */}

                                    <Select
                                        size="lg"
                                        onChange={(v) => setUpazila(v)}
                                        variant="outlined"
                                        value={user?.upazila}
                                        label="Select Upazila"
                                    >
                                        {upazilas.sort().map((upazila) => (
                                            <Option defaultValue={user?.district} key={upazila.id} value={upazila.name}>
                                                {upazila.name}
                                            </Option>
                                        ))}
                                    </Select>

                                </div>

                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        id="uploadAvatar"
                                        hidden
                                        accept="image/*"
                                        onChange={handleAvatarName}

                                    />
                                    <Button onClick={handleUpload} variant="outlined" className="flex items-center gap-3">
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
                                    </Button>
                                    <span className="font-medium">{avatarName.name || user?.avatar}</span>
                                </div>
                            </div>

                            <div className="col-span-2 mt-5">
                                <Button color="green" disabled={loading} type="submit" fullWidth>
                                    {loading ? <div className="flex justify-center"><Spinner /></div> : "save info"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </CardBody>
            </Card>
        </Dialog>
    );
}