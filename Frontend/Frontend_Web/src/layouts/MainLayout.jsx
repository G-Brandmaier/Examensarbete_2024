import { Outlet } from "react-router-dom";
import NavBar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";

import "../styles/index.css";

const MainLayout = () => {
  return (
    <div id="page-container">
      <div id="content-wrap">
        <NavBar />
        <Outlet />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
