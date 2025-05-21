
import { db } from '@/lib/db';

import { getCampaigns } from '@/actions/get-campaigns';
import { SearchInput } from '@/components/search-input';
import { CampaignsList } from '@/components/campaigns-list';
import Categories from '../campaigns/[id]/_components/categories';

interface SearchProps {
  searchProps: Promise<{
    title: string
  }>
}

const Campaigns = async ({ searchProps }: SearchProps) => {

  const searchParams = await searchProps;

  const campaigns = await getCampaigns({
    ...searchParams,
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  return (
    <>
      <div className='bg-emerald-800 text-white text-center py-12'>
        <h1 className='text-3xl md:text-4xl font-bold mb-2'>Our Campaigns</h1>
      </div>
      <div className="px-6 pt-12 flex-col md:flex md:flex-row justify-between gap-6">
        <SearchInput />
        {
          categories.length !== 0 &&
          <Categories items={categories} />
        }
      </div>
      <div className="p-6 mt-6 space-y-4">
        <CampaignsList items={campaigns} />
      </div>
    </>
  );
};

export default Campaigns;
