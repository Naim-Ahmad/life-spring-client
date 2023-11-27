import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import SectionHeader from "../shared/SectionHeader";

export default function Featured() {

    return (
        <section>
            <SectionHeader title="Featured" description={<span>Our Most Used <span className="text-green-500">Services</span></span>} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <Card
                    shadow={false}
                    className="relative flex min-h-[15rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
                >
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                    >
                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                    </CardHeader>
                    <CardBody className="relative px-6">
                        <Typography
                            variant="h4"
                            color="white"
                            className="mb-4 font-medium text-shadow"
                        >
                            How we design and code open-source projects?
                        </Typography>
                        <Button color="green" variant="gradient" size="sm">Book Now</Button>
                    </CardBody>
                </Card>
            </div>
        </section>
    )
}