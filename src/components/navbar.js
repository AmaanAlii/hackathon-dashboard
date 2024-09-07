import { NavLink } from "react-router-dom";
import MainLogo from "../assets/MainLogo.png";
import internalLinks from "../routes/routes";

function NavBar() {
  return (
    <nav className=" w-full h-[50px] flex justify-between items-center px-20 ">
      <NavLink to={internalLinks.home}>
        <img className=" w-[80px]" src={MainLogo} alt="Logo" />
      </NavLink>

      <ul className=" flex justify-center items-center gap-5">
        <NavLink to={internalLinks.home}>
          <li
            className=" w-[120px] py-1 rounded-md font-medium  
            text-[#083145] bg-transparent border-2 
            border-[#083145] hover:border-none hover:text-white hover:bg-[#083145] "
          >
            Dashboard
          </li>
        </NavLink>
        <NavLink to={internalLinks.addEvent}>
          <li
            className=" w-[120px] py-1 rounded-md font-medium  
            text-[#083145] bg-transparent border-2 
            border-[#083145] hover:border-none hover:text-white hover:bg-[#083145] "
          >
            Create Event
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;
