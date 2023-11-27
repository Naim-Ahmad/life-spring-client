import { Card, CardBody, Typography } from '@material-tailwind/react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import useReservation from '../../../hooks/reservation/useReservation';
import SectionHeader from '../../shared/SectionHeader';
import ReservationTable from './ReservationTable';

const TABLE_HEAD = ["User", "Test Name", "Status", "Role", "Action"];
export default function Reservation() {

    const { data: reservations = [], isPending } = useReservation()

    if (isPending) return <LoadingSpinner />

    return (

        <>
            <SectionHeader title="" description={<span>All <span className='text-green-500'>Reservation</span></span>} />

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

                            {reservations.map(reservation => <ReservationTable reservation={reservation} key={reservation._id} />)}

                        </tbody>
                    </table>
                </CardBody>
            </Card>


        </>
    )
}