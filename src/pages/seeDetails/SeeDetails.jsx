import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Container from "../../components/Container";
import SectionHeader from "../shared/SectionHeader";
import { Modal } from "./Modal";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function SeeDetails() {
  const test = useLoaderData();
  // console.log(test?.availableSlots);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <div className="pb-10">
      <SectionHeader title="Service Details" description={<span className="text-green-500">{test?.testName}</span>} />
      <Container>
        <Card className="w-full flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-1/2 shrink-0 rounded-r-none"
          >
            <img
              src={test?.imageURL}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {test?.testName}
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
              {test?.description}
            </Typography>

            <Typography variant="h5" color="blue-gray" className=" font-bold">
              Details
            </Typography>

            <Typography color="gray" className="mb-8 font-normal">
              {test?.details || ""}
            </Typography>

            <Typography color="gray" className="mb-8 font-normal">
              <span className="text-medium font-bold">Available Slots:</span>{" "}
              {test?.availableSlots.length > 0
                ? test?.availableSlots.join(", ")
                : "NO Slot available"}
            </Typography>

            <Typography color="gray" className="mb-8 font-normal">
              <span className="text-medium font-bold">Date:</span>{" "}
              {test?.date || ""}
            </Typography>

            <Typography color="gray" className="mb-8 font-normal">
              <span className="text-medium font-bold">Service Charge:</span> ₹{" "}
              {test?.price}
            </Typography>

            <Button
              disabled={!test?.availableSlots.length}
              color="green"
              className="flex items-center gap-2"
              onClick={handleOpen}
            >
              Book now
            </Button>
          </CardBody>
        </Card>
        {<Elements stripe={stripePromise}>
          <Modal
            open={open}
            handleOpen={handleOpen}
            data={test}
          />
        </Elements>}
      </Container>
    </div>
  );
}
