import { Button, Card, CardBody, Input, Textarea, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import Container from "../../components/Container";
import SectionHeader from "../shared/SectionHeader";

export default function Contacts() {

    const { handleSubmit, register, formState: { errors } } = useForm()

    const handleForm = (data) => {

    }

    return (
        <section className="contact-section">
            <SectionHeader title="Contact Us" description={<span></span>} />

            <Container>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-16 text-center">
                    <Card className="mt-6">
                        <CardBody>
                            <FaPhone size={40} className="mb-5 mx-auto" color="green" />
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Phone Number
                            </Typography>
                            <Typography variant="lead" className="font-medium">
                                01231231234143
                            </Typography>
                        </CardBody>

                    </Card>
                    <Card className="mt-6">
                        <CardBody>
                            <FaEnvelope size={40} className="mb-5 mx-auto" color="green" />
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Send Email
                            </Typography>
                            <Typography variant="lead" className="font-medium">
                                lifeSpring@info.com
                            </Typography>
                        </CardBody>
                    </Card>
                    <Card className="mt-6">
                        <CardBody>
                            <FaWhatsapp size={40} className="mb-5 mx-auto" color="green" />
                            <Typography variant="h5" color="blue-gray" className="mb-2 mx-auto">
                                Whats App
                            </Typography>
                            <Typography variant="lead" className="font-medium">
                                3248929384u3924
                            </Typography>
                        </CardBody>

                    </Card>
                </div>
                <div className="flex flex-col md:flex-row gap-16 justify-between items-center">

                    <div className="flex-1">
                        <Card className="mt-6">
                            <CardBody>
                                <HiOutlineOfficeBuilding size={50} className="mb-5" color="green" />
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Central Office
                                </Typography>
                                <Typography>
                                    Nam eu mi eget velit vulputate tempor gravida quis massa. In malesuada condimentum ultrices. Sed et mauris a purus fermentum elementum. Sed tristique semper enim, et gravida orci iaculis et. Nulla facilisi.
                                </Typography>
                            </CardBody>

                        </Card>

                    </div>

                    <div className="flex-1 w-full">
                        <form
                            onSubmit={handleSubmit(handleForm)}
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


                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Your Message
                                </Typography>

                                <Textarea
                                    size="lg"
                                    placeholder="Your Message"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    error={errors?.password?.type === "required"}
                                    {...register("message", { required: true })}
                                />
                                {errors && errors?.password?.type === "required" && (
                                    <Typography
                                        variant="small"
                                        className="-mt-5 font-normal"
                                        color="red"
                                    >

                                    </Typography>
                                )}






                            </div>

                            <Button type="submit" color="green">
                                Send Message
                            </Button>

                        </form>
                    </div>
                </div>
            </Container>
        </section>
    )
}