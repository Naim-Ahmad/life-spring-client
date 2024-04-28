import { useQuery } from "@tanstack/react-query";


import axios from "axios";
import Container from "../../components/Container";
import LoadingSpinner from "../../components/LoadingSpinner";
import SectionHeader from "../shared/SectionHeader";
import TestimonialCard from "./TestimonialCard";

export default function Testimonial() {

  const {data, isLoading} = useQuery({
    queryKey: ['stories'],
    queryFn: async ()=> {
      const res = await axios.get('https://click-jobs-server.vercel.app/stories')
      return res.data
    }
  })

  if(isLoading)return <LoadingSpinner/>

  return (

      <Container>
  
        <SectionHeader title="Review" description={<span>What client say  <span className="text-green-500">about us</span></span>} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          
         {data?.map(d=> <TestimonialCard key={d._id} data={d}/>)}
        </div>
      </Container>
  );
}
