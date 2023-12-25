import { IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Dashboard() {

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen((open) => !open)
  }

  return (

    <div className="lg:grid grid-cols-12 transition relative min-h-screen">
       <div className="lg:hidden">
       {!open ? <IconButton color="green" variant="outlined" className="fixed top-2 left-2 z-20" onClick={handleOpen}><MdMenu className="w-6 h-6 "/></IconButton> :  <IconButton color="green" variant="text" className="absolute top-5 left-56 z-20" onClick={handleOpen}><MdClose className="w-6 h-6 "/></IconButton>}
       </div>

      <div className={`col-span-3 absolute transition-all z-10 ${open ? "left-0" : "-left-96"} lg:left-0 lg:sticky top-0 h-[90svh]`}>
     
        <Sidebar />
      </div>

      <div className="col-span-9">
        <Outlet></Outlet>
      </div>
    </div>

  );
}
