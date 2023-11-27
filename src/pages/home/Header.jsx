import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <div className="hero flex justify-center items-center min-h-[80svh]" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
            <div className="hero-content text-center text-neutral-content  min-h-[80svh] w-full flex justify-center items-center backdrop-brightness-50">
                <div className="max-w-md">
                    <Typography variant="h1" color="white">Hello There</Typography>
                    <Typography variant="paragraph" color="white" className="font-medium">Hello There</Typography>
                    
                    <Link to="/allTest"><Button color="green" className="mt-3">Get Start</Button></Link>
                </div>
            </div>
        </div>
    )
}