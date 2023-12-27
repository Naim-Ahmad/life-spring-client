import { Button, Card, CardBody, CardHeader, Input, Tab, Tabs, TabsHeader, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UsersTable from "./UsersTable";

const TABLE_HEAD = ["User", "Status", "Role", "Action"];

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Blocked",
    value: "Blocked",
  },
];

export default function AllUsers() {

  const axiosSecure = useAxiosSecure();
  const { data, isPending } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const [searchText, setSearchText]= useState('')

  const handleSearch = ()=> {
    
  }



  if (isPending) return <LoadingSpinner />;

  return (
    <>
      {/* <div className="">
          <SectionHeader title="" description={<span className="text-4xl">All <span className="text-green-500">Users</span></span>} />
        </div> */}
      <Card className="w-full py-6">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-center text-center gap-8">
            <div>
              <Typography variant="h4" color="blue-gray">
                <span className="text-green-500">Users</span> list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Users
              </Typography>
            </div>

          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <div className="relative flex w-full max-w-[24rem]">
                <Input
                  type="search"
                  label="Search By Email"
                  className="pr-20"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Button onClick={handleSearch} size="sm" color='green' className="!absolute right-1 top-1 rounded">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody className="overflow-scroll lg:overflow-x-hidden px-0">
          <table className=" w-full min-w-max table-auto text-left">

            <thead>
              <tr>
                {TABLE_HEAD?.map((head) => (
                  <th
                    key={head}
                    className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4`}
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
