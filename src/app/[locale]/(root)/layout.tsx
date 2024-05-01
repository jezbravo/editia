import Footer from "@/src/components/shared/Footer";
import LanguageSwitcher from "@/src/components/shared/LanguageSwitcher";
import MobileNav from "@/src/components/shared/MobileNav";
import Sidebar from "@/src/components/shared/Sidebar";
import { Toaster } from "@/src/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      {/* <ClientSidebar /> */}
      <Sidebar />
      <MobileNav />
      <div className="root-container">
        <LanguageSwitcher />
        <div className="wrapper">{children}</div>
      </div>
      <Footer />
      <Toaster />
    </main>
  );
};

export default Layout;
