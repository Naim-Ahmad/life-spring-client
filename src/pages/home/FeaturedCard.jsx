import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function FeaturedCard({ data }) {
    // console.log(data?.imageURL)

    return (
        <Card
            shadow={false}
            className="relative flex min-h-[15rem] w-full hover:shadow-2xl hover:scale-105 transition items-center justify-center overflow-hidden text-center"
        >
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
                style={{ backgroundImage: `url('${data?.imageURL}')` }}
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative px-6">
                <Typography
                    variant="h4"
                    color="white"
                    className="mb-4 font-medium text-shadow"
                >
                    {data?.testName}
                </Typography>

                <Typography
                    variant="small"
                    color="gray"
                    className="mb-4 font-medium text-shadow"
                >
                    {data?.description}
                </Typography>
                <Link to={`/tests/seeDetails/${data._id}`}>
                    <Button color="green" size="sm" >
                        See Details
                    </Button>
                </Link>
            </CardBody>
        </Card>
    )
}