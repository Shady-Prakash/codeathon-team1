"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { Campaign, Category } from "@prisma/client";
import ReactHtmlParser from 'react-html-parser'


type CampaignWithProgressWithCategory = Campaign & {
  category: Category | null;
  campaigns: { id: string }[];
  progress: number | null;
};

interface CampaignsListProps {
  items: CampaignWithProgressWithCategory[];
}

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  fund: number;
  progress: number | null;
  category: string;
};

const CampaignCard = ({
  id,
  title,
  description,
  imageUrl,
  fund,
  category,
}: CampaignCardProps) => {
  const truncatedBody = description.length > 300 ? `${description.slice(0, 300)}...` : description;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 text-sm flex-1">{ReactHtmlParser(truncatedBody)}</p>
      </div>
      <div className="p-4 border-t border-gray-200 text-center">
        <Link href={`/campaigns/${id}`}>
          <Button className="bg-[#059669] hover:bg-[#037f57] text-white text-sm py-2 px-5 rounded-full">
            Donate now
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Campaigns = ({
  items
 }:CampaignsListProps) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 3; // Adjust this number as needed

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(setData);
  }, []);
  console.log(data)

  const uniqueCategories = Array.from(
    new Set(data&&data.map((campaign) => campaign.category.name))
  );

  const filteredCampaigns = data&&data.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = category === "" || campaign.category.name === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCampaigns?.length / campaignsPerPage);
  const currentCampaigns = filteredCampaigns&&filteredCampaigns.slice(
    (currentPage - 1) * campaignsPerPage,
    currentPage * campaignsPerPage
  );

  return (
    <div>
      <div className="bg-[#059669] text-white text-center py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Donate to BIG Alliance
        </h1>
        <p className="text-base md:text-lg">
          People in crisis need your help. Your donation will change lives.
        </p>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-xs mx-auto">
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-3 rounded-md w-full text-sm pl-12 focus:border-[#059669] focus:ring-[#059669] transition-all"
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 116.15 13.65z"
              />
            </svg>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-md w-full md:w-48 text-sm focus:border-[#059669] focus:ring-[#059669] transition-all"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {currentCampaigns&&currentCampaigns.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  id={campaign.id}
                  title={campaign.title}
                  description={campaign.description}
                  imageUrl={campaign.imageUrl}
                  fund={campaign.fund}
                  category={campaign.category.name}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-8">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-[#059669] hover:bg-[#037f57] text-white text-sm py-2 px-5 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#037f57] focus:ring-opacity-50"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="bg-[#059669] hover:bg-[#037f57] text-white text-sm py-2 px-5 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#037f57] focus:ring-opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No campaigns found. Try adjusting your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
