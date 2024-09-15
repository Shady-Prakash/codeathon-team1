import NavBar from './_components/navbar';
import Footer from './_components/footer';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
