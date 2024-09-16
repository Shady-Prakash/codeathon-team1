"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useCallback, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { TbBrandX } from "react-icons/tb"; // X (formerly Twitter) logo

interface Campaign {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

export default function CampaignDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [isReadMore, setIsReadMore] = useState(false);
  const [donationType, setDonationType] = useState<string | null>(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/campaigns/${id}`)
      .then((res) => res.json())
      .then(setData);
  }, [id]);

  const campaign = useMemo(
    () => data && data.find(({ camp }) => camp.id === id),
    [id]
  );

  const handleCopyLink = useCallback(() => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("Link copied!"))
      .catch((error) => console.error("Error copying link:", error));
  }, []);

  const toggleReadMore = useCallback(() => {
    setIsReadMore((prev) => !prev);
  }, []);

  const handleDonateNow = useCallback(() => {
    if (donationType) {
      router.push(
        `/campaigns/${id}/${
          donationType === "individual"
            ? `donate-as-individual?campaignName=${encodeURIComponent(
                data?.title
              )}`
            : `donate-as-company?campaignName=${encodeURIComponent(
                data?.title
              )}`
        }`
      );
    } else {
      alert("Please select a donation type.");
    }
  }, [donationType, id, data?.name, router]);

  if (!data) {
    return (
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          Campaign Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <header className="flex flex-col items-start mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">{data?.name}</h1>
        <p className="text-lg text-gray-600 mt-1">{data?.category?.name}</p>
      </header>

      <section className="mb-6">
        <img
          src={data?.imageUrl}
          alt={data.title}
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
        <p className="mt-4 text-gray-800 leading-relaxed">
          {isReadMore
            ? ReactHtmlParser(data.description)
            : ReactHtmlParser(
                `${data.description.toString().slice(0, 200)}...`
              )}
          <button
            onClick={toggleReadMore}
            className="text-blue-500 hover:underline ml-1"
          >
            {isReadMore ? "Read Less" : "Read More"}
          </button>
        </p>
      </section>

      <section className="mt-6">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-gray-900">
            Share this campaign:
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `Check out this campaign: ${data.title}`
              )}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="text-[#1DA1F2] hover:text-[#1a8cd8] text-xl"
            >
              <TbBrandX />
            </a>

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

            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                window.location.href
              )}&title=${encodeURIComponent(
                data.title
              )}&summary=${encodeURIComponent(
                data.description
              )}&source=LinkedIn`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="text-[#0077B5] hover:text-[#006699] text-xl"
            >
              <FaLinkedinIn />
            </a>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Check out this campaign: ${data.title} ${window.location.href}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="text-[#25D366] hover:text-[#25a256] text-xl"
            >
              <FaWhatsapp />
            </a>

            <a
              href={`mailto:?subject=${encodeURIComponent(
                `Check out this campaign: ${data.title}`
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

            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy Link"
              className="text-[#37AB87] hover:text-[#2e8c6c] text-xl"
            >
              <FiLink />
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <p className="text-xl font-semibold text-gray-900 mb-4">
          Select Donation Type
        </p>
        <div className="flex flex-col space-y-3 mb-6">
          {["individual", "company"].map((type) => (
            <label
              key={type}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="donation-type"
                value={type}
                checked={donationType === type}
                onChange={(e) => setDonationType(e.target.value)}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded"
                aria-checked={donationType === type ? "true" : "false"}
              />
              <span className="text-gray-800 text-lg">
                Donate as {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </label>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleDonateNow}
            className="bg-[#059669] hover:bg-[#037f57] text-white text-sm py-2 px-5 w-36 mx-auto rounded-full"
          >
            Donate Now
          </button>
        </div>
      </section>
    </div>
  );
}
