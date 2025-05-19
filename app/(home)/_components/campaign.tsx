'use client';

import { useEffect, useState } from 'react';
import { Campaign, Category } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type CampaignWithProgressWithCategory = Campaign & {
  category: Category | null;
};

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  fund: number;
  category: string;
}

const CampaignCard = ({
  id,
  title,
  description,
  imageUrl,
}: CampaignCardProps) => {
  const truncatedBody =
    description.length > 300 ? `${description.slice(0, 300)}...` : description;

  return (
    <div className='bg-white border overflow-hidden'>
      <img src={imageUrl} alt={title} className='w-full h-48 object-cover ' />
      <div className='p-4 flex flex-col'>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: truncatedBody }} className='text-gray-700 text-sm flex-1' />
      </div>
      <div className='p-4 border-t border-gray-200 text-center'>
        <Link href={`/campaigns/${id}`}>
          <Button className='bg-[#059669] hover:bg-[#037f57] text-white text-sm py-2 px-5 rounded-full'>
            Donate now
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [data, setData] = useState<CampaignWithProgressWithCategory[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("")

      try {
        const response = await fetch("/api/campaigns");
        const data = await response.json();
        setData(data);

      } catch {
        setError("Error fetching campaigns.");

      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  const uniqueCategories = Array.from(
    new Set(data && data.map((campaign) => campaign?.category?.name))
  );

  const filteredCampaigns =
    data &&
    data.filter((campaign) => {
      const matchesSearch = campaign.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        category === '' || campaign?.category?.name === category;
      return matchesSearch && matchesCategory;
    });

  const totalPages = Math.ceil(filteredCampaigns?.length / campaignsPerPage);
  const currentCampaigns =
    filteredCampaigns &&
    filteredCampaigns.slice(
      (currentPage - 1) * campaignsPerPage,
      currentPage * campaignsPerPage
    );

  if (loading) return (
    <div className="grid min-h-[300px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <svg className="w-16 h-16 animate-spin text-gray-900/50" viewBox="0 0 64 64" fill="none"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path
          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
        </path>
        <path
          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
        </path>
      </svg>
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className='bg-emerald-800 text-white text-center py-12'>
        <h1 className='text-3xl md:text-4xl font-bold mb-2'>Our Campaigns</h1>
      </div>
      <div className='p-6 mt-6'>
        <div className='flex flex-col md:flex-row md:justify-between mb-12 space-y-4 md:space-y-0 md:space-x-4'>
          <div className='relative flex justify-between'>
            <input
              type='text'
              placeholder='Search by title'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='border p-3 rounded-md w-full text-sm pl-12 focus:border-emerald-600 focus:ring-emerald-600 transition-all'
            />
            <svg
              className='absolute left-3 top-3 h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 116.15 13.65z'
              />
            </svg>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border p-3 rounded-md w-full md:w-48 text-sm focus:border-[#059669] focus:ring-[#059669] transition-all'>
            <option value=''>All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {currentCampaigns && currentCampaigns.length > 0 ? (
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {currentCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  id={campaign.id}
                  title={campaign.title}
                  description={campaign.description!}
                  imageUrl={campaign.imageUrl!}
                  fund={campaign.fund!}
                  category={campaign?.category?.name || ""}
                />
              ))}
            </div>
            <div className='flex justify-center items-center gap-8 mt-12'>
              <Button
                variant='success'
                border='rounded'
                size='lg'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='min-w-[120px]'>
                Previous
              </Button>


              <Button
                variant='success'
                border='rounded'
                size='lg'
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className='min-w-[120px]'>
                Next
              </Button>
            </div>
          </div>
        ) : (
          <p className='text-center text-gray-600 mt-10'>
            No campaigns found. Try adjusting your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
