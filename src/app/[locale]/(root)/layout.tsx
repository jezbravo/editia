import MobileNav from "@/src/components/shared/MobileNav";
import Sidebar from "@/src/components/shared/Sidebar";
import { Toaster } from "@/src/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
