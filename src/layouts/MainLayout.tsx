import { Outlet } from "react-router-dom";
import { Header } from "../components/template/Header";
import Footer from "../components/template/Footer";

export const MainLayout = () => {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
