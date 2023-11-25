import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Dashboard() {

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <Sidebar />
      </div>
      <div className="col-span-9">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
