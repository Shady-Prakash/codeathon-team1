"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaPaypal } from "react-icons/fa";

export default function DonateAsIndividual() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [donorType, setDonorType] = useState<string>("anonymous");
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (agreed) {
        // Redirect to PayPal
        window.location.href =
          "https://www.paypal.com/donate?business=your-paypal-business-email"; // Replace with actual PayPal donation URL
      } else {
        alert("You must agree to the disclaimer.");
      }
    },
    [agreed]
  );

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Donate as Individual
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-gray-700 font-medium">Donation Type</legend>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="anonymous"
              name="donorType"
              value="anonymous"
              checked={donorType === "anonymous"}
              onChange={() => setDonorType("anonymous")}
              className="form-radio h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="anonymous" className="ml-2 text-gray-700">
              Donate Anonymously
            </label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="provideDetails"
              name="donorType"
              value="provideDetails"
              checked={donorType === "provideDetails"}
              onChange={() => setDonorType("provideDetails")}
              className="form-radio h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="provideDetails" className="ml-2 text-gray-700">
              Provide Name and Email
            </label>
          </div>
        </fieldset>

        {donorType === "provideDetails" && (
          <>
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
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your full name"
              />
            </div>
          </>
        )}

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
