"use client";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { campaigns } from "../../data/campaigns";

interface Campaign {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

export default function CampaignDetails() {
  const { id } = useParams();

  const campaign = useMemo(
    () => campaigns.find((campaign) => campaign.id === id),
    [id]
  );

  if (!campaign)
    return (
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          Campaign Not Found
        </h1>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <header className="flex flex-col items-start mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {campaign.name}
        </h1>
        <p className="text-lg text-gray-600 mt-1">{campaign.category}</p>
      </header>
      <section className="mb-6">
        <img
          src={campaign.image}
          alt={campaign.name}
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
        <p className="mt-4 text-gray-800 leading-relaxed">
          {campaign.description}
        </p>
      </section>
      <section className="mt-6">
        <p className="text-xl font-semibold text-gray-900 mb-4">
          Select Donation Type
        </p>
        <div className="flex flex-col space-y-3 mb-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="donation-type"
              value="individual"
              className="h-5 w-5 text-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-800 text-lg">Donate as Individual</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="donation-type"
              value="company"
              className="h-5 w-5 text-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-800 text-lg">Donate as Company</span>
          </label>
        </div>
        <button
          type="button"
          className="w-full py-4 bg-[#37AB87] text-white font-bold rounded-lg shadow-lg transition duration-300 hover:bg-[#2F8D6E] focus:outline-none focus:ring-4 focus:ring-[#37AB87]"
        >
          Donate Now
        </button>
      </section>
    </div>
  );
}
