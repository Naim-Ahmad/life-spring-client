import { Button, Carousel, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Container from "../../components/Container";
import axios from "../../config/axios.config";
import useGetDevice from "../../hooks/useGetDevice";
import SectionHeader from "../shared/SectionHeader";

export default function HealthTips() {

    const [health, setHealth] = useState([])

    const { device } = useGetDevice()

    useEffect(() => {
        axios.get('/recommendations')
            .then(res => {
                setHealth(res.data)
            })
    }, [])

    // console.log(health)

    return (
        <section className="py-16">
            <SectionHeader title="Health Tips" description={<div className=""><span>Our Personal <span className="text-green-500">Recommendation</span></span></div>} />

            <Container>
                <Carousel prevArrow={({ handlePrev }) => (
                    <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handlePrev}
                        className="!absolute top-2/4 left-4 hidden md:block -translate-y-2/4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                    </IconButton>
                )}
                    nextArrow={({ handleNext }) => (
                        <IconButton
                            variant="text"
                            color="white"
                            size="lg"
                            onClick={handleNext}
                            className="!absolute top-2/4 !right-4 hidden md:block -translate-y-2/4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </IconButton>
                    )} transition={{ transition: { type: "tween", duration: 0 } }} className="rounded-xl">
                    {health.map(he => (
                        <div key={he._id} className="relative h-[75svh] w-full">
                            <img
                                src={he.bg_image}
                                alt="image 1"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
                                <div className="md:w-3/4 px-4  text-center">
                                    <Typography
                                        variant="h2"
                                        color="white"
                                        className="mb-4 text-2xl md:text-4xl lg:text-5xl"
                                    >
                                        {he?.title}
                                    </Typography>
                                    <Typography
                                        variant="lead"
                                        color="white"
                                        className="mb-12 opacity-80 text-lg"
                                    >
                                        {he?.content}
                                    </Typography>
                                    <div className="flex justify-center gap-2">
                                        <Button size="lg" color="white">
                                            Explore
                                        </Button>
                                        <Button size="lg" color="white" variant="text">
                                            Gallery
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </Carousel>
            </Container>
        </section>
    )
}