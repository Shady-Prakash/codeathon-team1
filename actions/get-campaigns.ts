import { db } from "@/lib/db";

type GetCampaigns = {
  title?: string;
  categoryId?: string;
}

export const getCampaigns = async ({
  title,
  categoryId
}: GetCampaigns) => {
  try {
    const campaigns = await db.campaign.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return campaigns;
  } catch (error) {
    console.log("[GET_CAMPAIGNS]", error);
    return [];
  }
}