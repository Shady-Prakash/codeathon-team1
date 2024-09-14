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

  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div>
      <header>
        <h1>{campaign.name}</h1>
      </header>
      <section>
        <img src={campaign.image} alt={campaign.name} />
        <p>{campaign.description}</p>
      </section>
      <section>
        <label>
          <input type="radio" name="donation-type" value="individual" />
          Donate as Individual
        </label>
        <label>
          <input type="radio" name="donation-type" value="company" />
          Donate as Company
        </label>
      </section>
    </div>
  );
}
