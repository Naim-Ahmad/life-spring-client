import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Spinner,
    Typography
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {logIn, loading, setLoading} = useAuth()


  const handleLogin = (data) => {
    console.log(data);
    
    logIn()
    .then(()=> {
        toast.success('Log in successful!')
    })
    .catch(err=> {
        setLoading(false)
        toast.error(err.message)
        console.log(err)
    })
  };

  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit(handleLogin)}>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            {...register("email", { required: true })}
            error={typeof(errors?.email) === 'object'}
          />

          {errors && errors?.email?.type === "required" && (
            <Typography
              variant="small"
              className="-mt-2 font-normal"
              color="red"
            >
              This field is required
            </Typography>
          )}
          <Input
            label="Password"
            type="password"
            size="lg"
            {...register("password", { required: true })}
            error={typeof(errors?.password)==='object'}
          />
          {errors && errors?.password?.type === "required" && (
            <Typography
              variant="small"
              className="-mt-2 font-normal"
              color="red"
            >
              This field is required
            </Typography>
          )}
          
        </CardBody>
        <CardFooter className="pt-0">
          <Button disabled={loading} type="submit" variant="gradient" fullWidth>
            {loading ? <div className="flex justify-center"><Spinner/></div>: 'Sign In'}
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link to="/register">
              <Typography
                as="span"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </form>
    </Card>
  );
}
