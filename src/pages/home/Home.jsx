import Discount from "./Discount";
import Featured from "./Featured";
import Header from "./Header";
import HealthTips from "./HealthTips";

export default function Home() {

    return (
        <div>
            <Header/>
            <Discount/>
            <Featured/>
            <HealthTips/>
        </div>
    )
}