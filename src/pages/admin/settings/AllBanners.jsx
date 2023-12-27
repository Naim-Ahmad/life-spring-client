
import Container from "../../../components/Container";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useBanners from "../../../hooks/banner/useBanners";
import SectionHeader from "../../shared/SectionHeader";
import Banner from "./Banner";

export default function AllBanners() {



    const { data: banners, isLoading, refetch } = useBanners()

    if (isLoading) return <LoadingSpinner />

    // console.log(banners)


    return (
        <div className="py-16 pt-6">
            <SectionHeader title="All Banners" description={<span>You Can select any <span className="text-green-500">banners</span></span>} />
            <Container>
                <div className="grid grid-cols-3 gap-6">
                    {banners?.map(banner => <Banner banner={banner} refetch={refetch} key={banner._id} />)}
                </div>
            </Container>
        </div>
    )
}

