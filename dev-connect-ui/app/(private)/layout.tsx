import NavBar from "./_components/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col space-y-5 justify-center items-center bg-blue-500">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
