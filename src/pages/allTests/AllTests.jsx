import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Container";
import LoadingSpinner from "../../components/LoadingSpinner";
import SectionHeader from "../shared/SectionHeader";
import Pagination from "./Pagination";

import { Button, CardHeader, Input, Typography } from "@material-tailwind/react";

import { useEffect, useState } from "react";
import axios from "../../config/axios.config";
import TestCard from "./TestCard";

export default function AllTests() {
  const [tests, setTests] = useState([])
  const [searchDate, setSearchDate] = useState('')

  const { data, isPending, status } = useQuery({
    queryKey: ['getLimitedPageData'],
    queryFn: async () => {
      const res = await axios.get('/getPageData?skip=0')
      return res.data;
    }
  })


  useEffect(() => {
    if (status === 'success') {
      setTests(data)
    }
  }, [status, data])

  const handleSearch = (e) => {
    e.preventDefault()
    const searchDate = e.target.date.value;
    setSearchDate(searchDate)
    // console.log(searchDate)
    axios.get(`/getPageData?date=${searchDate}`)
      .then(res => {
        // console.log(res.data)
        setTests(res.data)
      })

  }

  if (isPending) return <LoadingSpinner />;

  var currentDate = new Date();
  var formattedDate = currentDate.toLocaleDateString().split('/');
  formattedDate.splice(0, 0, formattedDate[2])
  formattedDate.pop()
  // console.log(formattedDate.join('-'));
  // console.log(data)
  // console.log(tests);

  return (
    <main className="py-10">
      <SectionHeader title="All Tests" description={<span>Explore our all <span className="text-green-500">services</span></span>} />
      <Container>
        <CardHeader shadow={false} className="text-center flex -mt-4 mb-10 flex-row-reverse pt-6 items-center justify-around ">
          <form onSubmit={handleSearch} className="relative flex w-full max-w-[24rem] ">
            <Input
              type="date"
              label="Search By Date"
              name="date"
              // min={formattedDate.join('-')}
              className="pr-24"
            // containerProps={{
            //   className: "min-w-0",
            // }}
            />
            <Button type="submit" size="sm" color='green' className="!absolute right-1 top-1 rounded">
              Search
            </Button>
          </form>
        </CardHeader>

        {tests.length
          ? (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-16  content-center">
            {tests.map((test) => (
              <TestCard test={test} key={test._id} />
            ))}
          </div>) :
          (<div className="flex justify-center min-h-[50svh] ">
            <Typography className="mt-16 text-lg text-center md:text-2xl lg:text-3xl" variant="h2">No Service Found from {searchDate === '' ? 'Today' : new Date().toLocaleDateString()} , Please Select another Date.</Typography>
          </div>)}
        <Pagination state={setTests} />
      </Container>
    </main>
  );
}
