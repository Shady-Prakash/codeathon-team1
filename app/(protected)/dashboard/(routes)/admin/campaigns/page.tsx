import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";
import DataTableWithTab from "./_components/tab/page";

const CampaignsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const campaigns = await db.campaign.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    < div className="p-6" >
      <DataTableWithTab data={campaigns} />
      {/* < DataTable columns={columns} data={campaigns} /> */}
    </div >
  );
}

export default CampaignsPage;