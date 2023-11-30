import { Outlet } from "react-router-dom";
import Container from "../../components/Container";
import Sidebar from "./Sidebar";

export default function Dashboard() {

  return (
    <Container>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <Outlet></Outlet>
        </div>
      </div>
    </Container>
  );
}
