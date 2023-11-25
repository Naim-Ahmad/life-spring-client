import { Card, CardBody, Typography } from "@material-tailwind/react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useTests from "../../../hooks/tests/useTests";
import TestTable from "./TestTable";

const TABLE_HEAD = ["Test", "Price", "Available Slots", "Action"];

export default function AllTests() {
  const { tests, isPending } = useTests();

  if (isPending) return <LoadingSpinner />;

  //   console.log(data);

  return (
    <div>
      <Card className="h-full w-full">
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
