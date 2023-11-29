import { Button, Card, CardBody, Dialog, Input, Spinner, Typography } from "@material-tailwind/react";

import { useState } from "react";
import Swal from "sweetalert2";
import useReservation from "../../../hooks/reservation/useReservation";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function SubmitResult({ open, handleOpen, data }) {

    const [loading, setLoading] = useState(false)

    const {refetch} = useReservation()

    const axiosSecure = useAxiosSecure()

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        const form = e.target;
        const resultURL = form.resultURL.value;
        console.log(resultURL)
        axiosSecure?.patch(`/reservations/${data._id}`, {resultURL, status: 'delivered'})
        .then(res=> {
            handleOpen()
            refetch()
            if(res.data._id){
                setLoading(false)
                Swal.fire({
                    icon: "success",
                    title: "Result Submitted Successfully",
                    showConfirmButton: false,
                    timer: 1900
                  });
            }
        })
        .catch(err=> {
            setLoading(false)
            console.log(err)
        })


    }


    return (
        <Dialog
            size="sm"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
        >

            <Card>
                <CardBody>
                    <Typography variant="h4" className="text-center">Submit Test<span className="text-green-500"> Result</span></Typography>


                    <Card color="transparent" shadow={false} >

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 mb-2"
                        >
                            <div className="mb-1 flex flex-col gap-6 w-full">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Patient Result Link
                                </Typography>
                                <Input
                                    size="lg"
                                    name="resultURL"
                                    type="url"
                                    placeholder="Result URL"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}

                                />

                            </div>

                            <div className="col-span-2 mt-5">
                                <Button color="green" disabled={loading} type="submit" fullWidth>
                                    {loading ? <div className="flex justify-center"><Spinner /></div> : "Submit Result"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </CardBody>
            </Card>
        </Dialog>
    )
}