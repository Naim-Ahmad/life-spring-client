import { Button, Card, CardBody, CardHeader, Input, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import useReservation from '../../../hooks/reservation/useReservation';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionHeader from '../../shared/SectionHeader';
import ReservationTable from './ReservationTable';

const TABLE_HEAD = ["Patient", "Test Name", "Date", "Status", "Action"];
export default function Reservation() {
    const [reservations, setReservations] = useState([])
    const { data, isPending, status } = useReservation()
    const [searchText, setSearchText] = useState('')
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    useEffect(()=>{
        if(status==='success'){
            setReservations(data)
        }
    },[data, status])

    if (isPending) return <LoadingSpinner />

    // console.log(reservations)
    const handleSearch = async()=>{

        try {
            const userData = await axiosSecure.get(`/users/${user?.email}?search=${searchText}`)
            // console.log(userData.data)
            const reservationData = await axiosSecure.get(`/reservations/${userData.data._id}`)
            console.log(reservationData.data)
            setReservations(reservationData.data)
            
        } catch (error) {
            console.log(error)
        }
    
    }

    return (

        <div className='pt-6'>
            <SectionHeader title="" description={<span>All <span className='text-green-500'>Reservation</span></span>} />

            <Card className=" w-full">
                <CardHeader shadow={false} className="text-center flex flex-row-reverse pt-6 items-center justify-around ">
                    <div className="relative flex w-full max-w-[24rem]">
                        <Input
                            type="search"
                            label="Search By Email"
                            className="pr-20"
                            onChange={(e)=> setSearchText(e.target.value)}
                            value={searchText}
                            containerProps={{
                                className: "min-w-0",
                            }}
                        />
                        <Button onClick={handleSearch} size="sm" color='green' className="!absolute right-1 top-1 rounded">
                            Search
                        </Button>
                    </div>
                    <Typography variant="h4">Total Reservation: {reservations.length}</Typography>
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

                            {reservations.map((reservation, index) => <ReservationTable reservation={reservation} index={index} key={reservation._id} />)}

                        </tbody>
                    </table>
                </CardBody>
            </Card>


        </div>
    )
}