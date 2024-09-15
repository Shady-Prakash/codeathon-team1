"use client"; // This makes the component a Client Component

import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+

// Define columns with a button for pending status
export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
  },
  {
    accessorKey: "companyAddress",
    header: "Company Address",
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
  },
  {
    accessorKey: "contactEmail",
    header: "Contact Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { id, status } = row.original;
      const [loading, setLoading] = useState(false);
      const router = useRouter(); // This is now the correct hook for routing/navigation in Next.js 13+

      const handleVerify = async () => {
        setLoading(true);
        try {
          await fetch(`/api/verify-company/${id}`, {
            method: "POST",
          });
          // Reload the page or refetch the data
          router.refresh(); // Use router.refresh() to reload the data in Next.js 13+
        } catch (error) {
          console.error("Error verifying company:", error);
        } finally {
          setLoading(false);
        }
      };

      return status === "pending" ? (
        <Button onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
      ) : (
        "Verified"
      );
    },
  },
];
