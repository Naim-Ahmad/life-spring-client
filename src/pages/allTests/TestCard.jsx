import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function TestCard({ test }) {
  const {_id, imageURL, price, testName, description } = test;
  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader className="min-h-[200px] " floated={false} color="blue-gray">
        <img src={imageURL} alt={testName} />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-bold">
            {testName}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-bold"
          >
            ₹ {price}
          </Typography>
        </div>
        <Typography color="gray">{description}</Typography>
      </CardBody>
      <CardFooter className="pt-3">
        <Link to={`/tests/seeDetails/${_id}`}>
          <Button color="green" size="lg" fullWidth={true}>
            See Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
