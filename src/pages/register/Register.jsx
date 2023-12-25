import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Illustration from '../../assets/loginIllustration.json';
import Container from "../../components/Container";
import axiosPublic from "../../config/axios.config";
import useAuth from "../../hooks/useAuth";

const IMAGE_HOSTING_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
  }`;

export default function Register() {
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [upazila, setUpazila] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [avatarName, setAvatarName] = useState('No Image Selected')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register: signUp, loading, setLoading, updateUserInfo } = useAuth();

  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data[2].data);
      });

    fetch("upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazilas(data[2].data);
      });
  }, []);

  const handleRegister = async (data) => {
    setLoading(true)
    const imageData = { image: avatarName };
    console.log(imageData)
    axios
      .post(IMAGE_HOSTING_URL, imageData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const formData = {
          name: data?.name,
          email: data?.email,
          bloodGroup,
          district,
          upazila,
          avatar: res.data.data.display_url,
          status: "active",
        };
        signUp(data?.email, data?.password)
          .then(() => {
            updateUserInfo(data?.name, res.data.data.display_url)
              .then(() => {
                axiosPublic.post("/users", formData)
                  .then(() => {
                    toast.success('Registration successful')
                    state ? navigate(state) : navigate("/");
                  })
                  .catch(err => {
                    setLoading(false)
                    toast.error(err.message)
                    console.log(err)
                  })
              })
              .catch((err) => {
                setLoading(false);
                toast.error(err.message);
                console.log(err);
              });
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.message);
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
        console.log(err);
      });
  };


  const handleUpload = () => {
    // avatarRef.click()
    console.log('first')
    document.getElementById('uploadAvatar').click()
  }

  const handleAvatarName = e => {
    setAvatarName(e.target.files[0])
    // console.dir(e.target)
  }

  return (
    <Container>
      <div className="flex mx-auto flex-col-reverse lg:flex-row py-6 justify-between">
        <Card color="transparent" shadow={false} >
          <Typography variant="h1" color="blue-gray" className="text-center">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="mt-8 mb-2"
          >
            <div className="mb-1 flex flex-col gap-6 w-full">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Input
                size="lg"
                placeholder="Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                error={errors?.password?.type === "required"}
                {...register("name", { required: true })}
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

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                variant="outlined"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                error={errors?.password?.type === "required"}
                {...register("email", { required: true })}
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

              {/* ===========   password    =============*/}

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                error={errors?.password?.type === "required"}
                {...register("password", { required: true })}
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

              <div className="flex gap-3 flex-col lg:flex-row">

                <Select
                  size="lg"
                  variant="outlined"
                  label="Blood Group"
                  name="bloodGroup"
                  onChange={(v) => setBloodGroup(v)}
                >
                  <Option value="A+">A+</Option>
                  <Option value="A-">A-</Option>
                  <Option value="B+">B+</Option>
                  <Option value="B-">B-</Option>
                  <Option value="AB+">AB+</Option>
                  <Option value="AB-">AB-</Option>
                  <Option value="O+">O+</Option>
                  <Option value="O-">O-</Option>
                </Select>

                <Select
                  size="lg"
                  onChange={(v) => setDistrict(v)}
                  variant="outlined"
                  label="Select District"
                >
                  {districts.sort().map((district) => (
                    <Option key={district?.id} value={district?.name}>
                      {district?.name}
                    </Option>
                  ))}
                </Select>

                <Select
                  size="lg"
                  onChange={(v) => setUpazila(v)}
                  variant="outlined"
                  label="Select Upazila"
                >
                  {upazilas.sort().map((upazila) => (
                    <Option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <input
                  required
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
                  Choose Avater
                </Button>
                <span className="font-medium">{avatarName.name}</span>
              </div>
            </div>

            <Button disabled={loading} color="green" type="submit" className="mt-6" fullWidth>
              {loading ? (
                <div className="flex justify-center">
                  {" "}
                  <Spinner />
                </div>
              ) : (
                "sign up"
              )}
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/logIn" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
        <div className="max-w-[400px] min-w-[300px] lg:min-w-[500px] mb-6 mx-auto lg:m-auto">
          <Lottie options={{ animationData: Illustration }} />
        </div>
      </div>
    </Container>
  );
}
