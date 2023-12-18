import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useBanners from "../../hooks/banner/useBanners";

export default function Header() {

    const {data:banner = {} , isLoading} = useBanners(`/banners?isActive=true`)
    // console.log(banner)

    if(isLoading) return

    const url = banner?.bannerURL || 'https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg'

    return (
        <div className="hero flex justify-center bg-no-repeat bg-cover bg-center items-center min-h-[80svh]" style={{ backgroundImage: `url(${url})` }}>
            <div className="hero-content text-center text-neutral-content  min-h-[80svh] w-full flex justify-center items-center backdrop-brightness-50">
                <div className="max-w-xl">
                    <Typography variant="h2" color="white">{banner?.bannerTitle}</Typography>
                    <Typography variant="paragraph" className="font-medium text-gray-400">{banner?.bannerDescription}</Typography>
                    
                    <Link to="/allTest"><Button color="green" className="mt-3">Get Start</Button></Link>
                </div>
            </div>
        </div>
    )
}