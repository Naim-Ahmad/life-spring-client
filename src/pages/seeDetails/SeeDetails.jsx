import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { useLoaderData } from "react-router-dom";

export default function SeeDetails() {
  const test = useLoaderData();
  console.log(test);

  return (
    <div>
      <Typography variant="h2" color="blue-gray" className="mb-2">
        Details of {test?.testName}
      </Typography>
      {/* <div className="grid grid-cols-2">
                <div>
                    <Image test={test} />
                </div>
                <div></div>
            </div> */}

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
            {test?.details}
          </Typography>

          <Typography color="gray" className="mb-8 font-normal">
            <span className="text-medium font-bold">Available Slots:</span> {test?.availableSlots.join(', ')}
          </Typography>

          <Typography color="gray" className="mb-8 font-normal">
            <span className="text-medium font-bold">Date:</span> {test?.date}
          </Typography>

          <Typography color="gray" className="mb-8 font-normal">
            <span className="text-medium font-bold">Service Charge:</span> ₹ {test?.price}
          </Typography>
          
            <Button className="flex items-center gap-2">
              Book now
            </Button>
         
        </CardBody>
      </Card>
    </div>
  );
}
