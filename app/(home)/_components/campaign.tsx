"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { campaigns } from "../../data/campaigns";

type CampaignProps = {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
  category: string;
};

const CampaignCard: React.FC<CampaignProps> = ({
  id,
  title,
  body,
  imageSrc,
  category,
}) => {
  const truncatedBody = body.length > 300 ? `${body.slice(0, 300)}...` : body;

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 text-sm flex-1">{truncatedBody}</p>
      </div>
      <div className="p-4 border-t border-gray-200 text-center">
        <Link href={`/campaigns/${id}`}>
          <Button className="bg-[#059669] hover:bg-[#037f57] text-white text-sm py-2 px-5 w-36 mx-auto rounded-full">
            Donate now
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Campaigns: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const uniqueCategories = Array.from(
    new Set(campaigns.map((campaign) => campaign.category))
  );

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = category === "" || campaign.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="bg-[#059669] text-white text-center py-12">
        <h1 className="text-4xl font-bold mb-2">Donate to BIG Alliance</h1>
        <p className="text-lg">
          People in crisis need your help. Your donation will change lives.
        </p>
      </div>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
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
            className="border p-3 rounded-md w-full sm:w-48 text-sm focus:border-[#059669] focus:ring-[#059669] transition-all"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                title={campaign.name}
                body={campaign.description}
                id={campaign.id}
                imageSrc={campaign.image}
                category={campaign.category}
              />
            ))}
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
