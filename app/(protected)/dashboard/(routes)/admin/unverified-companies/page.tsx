import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

const CompaniesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const companies = await db.company.findMany({
    where: { status: "pending" },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={companies} />
    </div>
  );
};

export default CompaniesPage;
