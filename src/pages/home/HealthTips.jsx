import { Button, Carousel, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Container from "../../components/Container";
import axios from "../../config/axios.config";
import SectionHeader from "../shared/SectionHeader";

export default function HealthTips() {

    const [health, setHealth] = useState([])

    useEffect(() => {
        axios.get('/recommendations')
            .then(res => {
                setHealth(res.data)
            })
    }, [])

    console.log(health)

    return (
        <section className="py-16">
            <SectionHeader title="Health Tips" description={<span>Our Personal <span className="text-green-500">Recommendation</span></span>} />
            
            <Container>
                <Carousel className="rounded-xl">
                    {health.map(he => (
                        <div key={he._id} className="relative h-[75svh] w-full">
                            <img
                                src={he.bg_image}
                                alt="image 1"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
                                <div className="w-3/4 text-center md:w-2/4">
                                    <Typography
                                        variant="h1"
                                        color="white"
                                        className="mb-4 text-3xl md:text-4xl lg:text-5xl"
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