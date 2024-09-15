"use client";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { campaigns } from "../../../data/campaigns";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

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

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("Link copied to clipboard!"))
      .catch((error) => console.error("Error copying link:", error));
  };

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

      {/* Share Section */}
      <section className="mt-6">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-gray-900">
            Share this campaign:
          </p>
          <div className="flex space-x-4">
            {/* Twitter Share */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `Check out this campaign: ${campaign.name}`
              )}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
              className="text-[#1DA1F2] hover:text-[#1a8cd8] text-xl"
            >
              <FaTwitter />
            </a>

            {/* Facebook Share */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="text-[#4267B2] hover:text-[#3b5998] text-xl"
            >
              <FaFacebookF />
            </a>

            {/* LinkedIn Share */}
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                window.location.href
              )}&title=${encodeURIComponent(
                campaign.name
              )}&summary=${encodeURIComponent(campaign.description)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="text-[#0077B5] hover:text-[#006699] text-xl"
            >
              <FaLinkedinIn />
            </a>

            {/* WhatsApp Share */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Check out this campaign: ${campaign.name} ${window.location.href}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="text-[#25D366] hover:text-[#25a256] text-xl"
            >
              <FaWhatsapp />
            </a>

            {/* Email Share */}
            <a
              href={`mailto:?subject=${encodeURIComponent(
                `Check out this campaign: ${campaign.name}`
              )}&body=${encodeURIComponent(
                `I found this campaign and thought you might be interested in it: ${window.location.href}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share via Email"
              className="text-[#EA4335] hover:text-[#d73d32] text-xl"
            >
              <FaEnvelope />
            </a>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy Link"
              className="text-[#37AB87] hover:text-[#2e8c6c] text-xl"
            >
              <FiCopy />
            </button>
          </div>
        </div>
      </section>

      {/* Donation Section */}
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
        <div className="mt-4 text-center">
          <button
            type="button"
            className="bg-[#059669] hover:bg-[#037f57] text-white text-sm py-2 px-5 w-36 mx-auto rounded-full"
          >
            Donate Now
          </button>
        </div>
      </section>
    </div>
  );
}
