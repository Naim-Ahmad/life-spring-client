import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useTests from "../../../hooks/tests/useTests";
import SectionHeader from "../../shared/SectionHeader";
import TestTable from "./TestTable";

const TABLE_HEAD = ["Test", "Price", "Slots", "Reservation", "Date", "Action"];

export default function AllTests() {
  const { tests, isPending } = useTests();

  if (isPending) return <LoadingSpinner />;

  //   console.log(data);

  return (
    <div className="py-6">
    <SectionHeader title="" description={<span>All Available<span className="text-green-500"> Services</span></span>}/>
      <Card className=" w-full mt-12">
      <CardHeader shadow={false} className="text-center -mt-16">
        <Typography variant="h4">Total Service: {tests.length}</Typography>
      </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD?.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tests?.map((test, index) => (
                <TestTable test={test} index={index} key={test._id} />
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
