import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/users/useUser";
import SectionHeader from "../../shared/SectionHeader";
import ResultTable from "./ResultTable";

const TABLE_HEAD = ["Test Name", "Slot", "Date", "Status", "Action"];

export default function TestResult() {

    const { data:user } = useUser()
    // console.log(loading)

    const axiosSecure = useAxiosSecure();

    const { data = [], isPending, refetch } = useQuery({
        queryKey: ["getReservationByEmail", user?._id],
        queryFn: async () => {
            if (user) {
                const res = await axiosSecure.get(`/reservations/${user?._id}`);
                return res.data;
            }
        },
    });

    if (isPending) return <LoadingSpinner />;
    console.log(data)
    return (
        <div>
            <SectionHeader title="" description={<span>Test <span className="text-green-500">Result</span></span>} />
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                        {data.map((reservation) => reservation?.status === 'delivered' && <ResultTable key={reservation._id} refetch={refetch} data={reservation} />
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}