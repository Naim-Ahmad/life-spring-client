import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import SectionHeader from "../shared/SectionHeader";
import ProfileCard from "./ProfileCard";

export default function Doctors() {
    const [doctors, setDoctors] = useState([])

    useEffect(()=>{
        fetch('doctors.json')
        .then(res=> res.json())
        .then(data=> setDoctors(data))
    },[])

    return (
        <Container>
            <SectionHeader title="Our Doctors"/>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-10">
                {doctors.map((doctor, ind)=> <ProfileCard data={doctor} key={ind}/>)}
            </div>
        </Container>
    )
}