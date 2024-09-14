"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "../../../components/ui/dialog";
import { DialogContent } from "../../../components/ui/dialog";
import { DialogHeader } from "../../../components/ui/dialog";
import { DialogTitle } from "../../../components/ui/dialog";
import { DialogFooter } from "../../../components/ui/dialog";
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
  return (
    <div className="p-4 w-full flex flex-col justify-between">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[60vh] object-cover rounded-md mb-4"
      />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{body}</p>
      </div>
      <div className="mt-4">
        <Link
          href={`/campaigns/${id}`}
          className="text-green-600 hover:underline"
        >
          Donate now
        </Link>
      </div>
    </div>
  );
};

const Campaigns: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search
  const [category, setCategory] = useState(""); // State for category filter


  const uniqueCategories = Array.from(
    new Set(campaigns.map((campaign) => campaign.category))
  );


  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "" || campaign.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="bg-[#059669] text-white text-center py-1">
        <h1 className="text-3xl font-bold">Donate to The Big Alliance</h1>
        <p className="text-lg mt-2">
          People in crisis need your help. Your donation will change lives.
        </p>
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-xl font-bold mb-2">Campaigns</h2>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Search by title or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded-md w-60"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded-md w-40"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="self-end">
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Campaigns</DialogTitle>
              </DialogHeader>
              <div>
                <p>Additional filter options can be added here</p>
              </div>
              <DialogFooter>
                <Button onClick={() => setFilterOpen(false)}>Apply</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};

export default Campaigns;
