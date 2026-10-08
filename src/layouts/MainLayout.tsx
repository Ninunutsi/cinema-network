import { Outlet } from "react-router-dom";
import { Header } from "../components/template/Header";
import Footer from "../components/template/Footer";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
