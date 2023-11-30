import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useBanners from "../../hooks/banner/useBanners";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/users/useUser";

const messageObject = {
  success: '',
  error: ''
}

export function Modal({ handleOpen, open, data }) {
  //   console.log(slots);
  const [error, setError] = useState("");
  const [slot, setSlot] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(data?.price);

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useUser()
  // console.log(user)

  const { data: banner = {} } = useBanners(`/banners?isActive=true`)

  const [promo, setPromo] = useState('')
  const [message, setMessage] = useState(messageObject)
  const [isApplied, setIsApplied] = useState(false)

  const { mutateAsync } = useMutation({
    mutationKey: ["reservation"],
    mutationFn: async (reservationInfo) => {
      const res = await axiosSecure.post(
        `/reservations/${user?.email}`,
        reservationInfo
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allTests"]);
    },
  });

  //   console.log(mutateAsync,  mutate)

  useEffect(() => {
    axiosSecure
      .post("/create_payment_intent", { price: data?.price })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, []);

  const handlePromo = () => {
    if (banner.promoCode.toLowerCase() === promo.toLowerCase() && !isApplied) {
      const finalTotal = (totalAmount / 100) * 80
      setTotalAmount(finalTotal)
      // console.log(finalTotal)
      setMessage({ ...messageObject, success: 'Applied' })
      setIsApplied(true)
    } else {
      setMessage({ ...messageObject, error: 'Invalid Coupon' })
      // toast.error('Invalid Coupon Code')
    }
  }

  //   console.log(stripe, stripeElement);
  const handleChange = (v) => {
    setSlot(v);
    console.log(v);
  };

  const handlePay = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card === null) return;

    setLoading(true);

    const { error, paymentMethod } = stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setLoading(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setError(confirmError.message);
      setLoading(false);
    } else {
      console.log("payment intent", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        const reservationInfo = {
          transactionId: paymentIntent?.id,
          slot,
          date: data?.date,
          paymentAmount: paymentIntent?.amount / 100,
          testId: data?._id,
          user: user?._id
        };
        console.log("reservationInfo Object", reservationInfo);
        handleOpen();
        try {
          await mutateAsync(reservationInfo);

          // console.log("reservationData", reservationData);
          // console.log("responseData", data);


          navigate("/dashboard/upComingAppointment");
          Swal.fire({
            title: "Payment Successful!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          setLoading(false);

        } catch (error) {
          setLoading(false);
          toast.error(error.message);
        }
      }
    }
  };

  //   console.log(clientSecret)

  return (
    <>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handlePay}>
          <Card className="mx-auto w-full max-w-[30rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Pay Some Advance to reservation
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Enter your card info and select a slot to reservation.
              </Typography>

              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              {error && (
                <Typography variant="small" color="red" className="mb-4">
                  {error}
                </Typography>
              )}

              {/* {console.log(data)} */}
              <div className="mt-3">
                <Select onChange={handleChange} label="Select available slot">
                  {data?.availableSlots?.map((slot) => (
                    <Option key={slot} value={slot}>
                      {slot}
                    </Option>
                  ))}
                </Select>
              </div>

              <Typography variant="small" className="font-bold">
                Total Amount: <span className={message.success && 'text-green-500'}>{totalAmount}</span>
              </Typography>

              <div>
                <div className=" flex gap-4">
                  <Input
                    containerProps={{ className: "min-w-[6rem] max-w-[7rem]" }}
                    size="md"
                    label="Promo Code"
                    onChange={(e) => {
                      setPromo(e.target.value)
                      setMessage(messageObject)
                    }}
                  />
                  <Button disabled={isApplied} onClick={handlePromo} variant="text" size="sm">
                    Apply
                  </Button>
                </div>
                {message.error && <Typography variant="small" color="red">{message.error}</Typography>}
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                color="green"
                variant="gradient"
                // onClick={handleOpen}
                fullWidth
                disabled={loading || !clientSecret || !stripe || !elements}
              >
                {loading ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
