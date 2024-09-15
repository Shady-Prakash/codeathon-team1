"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { FaPaypal } from "react-icons/fa";

const COMPANIES = ["Company A", "Company B", "Company C", "Company D"];

export default function DonateAsCompany() {
  const [email, setEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [newCompanyName, setNewCompanyName] = useState<string>("");
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const campaignName = searchParams.get("campaignName") || "";

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (agreed) {
        // Redirect to PayPal
        window.location.href = `https://www.paypal.com/donate?business=your-paypal-business-email&amount=${
          isRecurring ? "RECURRING" : "ONCE"
        }`; // Replace with actual PayPal donation URL
      } else {
        alert("You must agree to the disclaimer.");
      }
    },
    [agreed, isRecurring]
  );

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Donate as Company
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="campaignName" className="block text-gray-700">
            Campaign Name
          </label>
          <input
            type="text"
            id="campaignName"
            value={campaignName}
            readOnly
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
            aria-live="polite"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-gray-700">
            Company Name
          </label>
          <select
            id="companyName"
            value={companyName}
            onChange={(e) => {
              const value = e.target.value;
              setCompanyName(value);
              if (value !== "Other") setNewCompanyName(""); 
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              Select a company
            </option>
            {COMPANIES.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>

          {companyName === "Other" && (
            <div className="mt-2">
              <label htmlFor="newCompanyName" className="block text-gray-700">
                Enter New Company Name
              </label>
              <input
                type="text"
                id="newCompanyName"
                placeholder="e.g., Your New Company"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              {newCompanyName.trim() === "" && (
                <p className="text-red-600 mt-1">
                  New company name cannot be empty.
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={() => setIsRecurring((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">
              Make this a recurring donation
            </span>
          </label>
        </div>

        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed((prev) => !prev)}
              required
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">
              I agree to the{" "}
              <a href="/disclaimer" className="text-blue-500 hover:underline">
                disclaimer
              </a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#059669] hover:bg-[#037f57] text-white text-sm py-2 px-5 w-full rounded-full flex items-center justify-center"
        >
          Donate Now <FaPaypal className="ml-2 text-xl" />
        </button>
      </form>
    </div>
  );
}
