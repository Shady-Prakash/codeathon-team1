import NavBar from "./_components/navbar"

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return ( 
    <>
      <NavBar/>
      <main>
        {children}
      </main>
    </>
   );
}

export default HomeLayout;