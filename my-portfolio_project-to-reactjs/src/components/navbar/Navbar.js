import "./style.css";

import { NavLink } from "react-router-dom";
import BtnDarkMode from "../btnDarkMode/BtnDarkMode";

const Navbar = () => {

    const activeLink = "nav-list__link nav-list__link--active"
    const normalLink = "nav-list__link"


    return (    
    
    <nav className="nav">
     <div className="container">
         <div className="nav-row">

            <NavLink to="/Main" className="logo">
            <strong>My</strong> portfolio
            </NavLink>

            <BtnDarkMode/>

             <ul className="nav-list">
             <NavLink to="/Main" className={({isActive}) => isActive ? activeLink : normalLink}>
                Project
             </NavLink>
             <NavLink to="/Skills" className={({isActive}) => isActive ? activeLink : normalLink}>
                Skills
             </NavLink>
             <NavLink to="/Contacts" className={({isActive}) => isActive ? activeLink : normalLink}>
                Contacts
             </NavLink>
             </ul> 
         </div>
     </div> 
    </nav>  );
}
 
export default Navbar;