
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionHeader from "../shared/SectionHeader";
import FeaturedCard from "./FeaturedCard";

export default function Featured() {

    const axiosSecure = useAxiosSecure()

    const {data = []} = useQuery({
        queryKey: ['popularServices'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/popularServices')
            return res.data;
        }
    })

    return (
        <Container>
            <SectionHeader title="Featured" description={<span>Our Most Used <span className="text-green-500">Services</span></span>} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map(d=> <FeaturedCard data={d} key={d._id}/>)}
            </div>
        </Container>
    )
}