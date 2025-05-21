import Slider from './_components/slider';
import Campaign from './_components/campaign';
import About from './_components/about';

interface SearchProps {
  searchParams: Promise<{
    title: string;
    categoryId?: string;
  }>
}

const page = async (props: SearchProps) => {
  const searchParams = await props.searchParams;

  return (
    <>
      <Slider />
      <Campaign searchProps={searchParams} />
      <About />
    </>
  );
};

export default page;
