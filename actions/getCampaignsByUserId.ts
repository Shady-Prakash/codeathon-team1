import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

export const getCampaignsByUserId = async () => {
  try {
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

    return campaigns;
  } catch (error) {
    console.log("[GET_CAMPAIGNS_BY_USER_ID]", error);
    return [];
  }
}