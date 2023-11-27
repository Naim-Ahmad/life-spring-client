import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionHeader from "../../shared/SectionHeader";
import UsersTable from "./UsersTable";

const TABLE_HEAD = ["User", "Status", "Role", "Action"];

export default function AllUsers() {
  const axiosSecure = useAxiosSecure();
  const { data, isPending } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isPending) return <LoadingSpinner />;

  //   console.log(data);

  return (
    <>
    <SectionHeader title="" description={<span>All <span className="text-green-500">Users</span></span>}/>
      <Card className=" w-full">
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
              {data?.map((data, index) => (
                <UsersTable user={data} index={index} key={data._id} />
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}
