import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
 

export async function GET(
  req: Request,
  { params } : { params: { campaignId: string; } }
) {
  try {
    const campaign = await db.campaign.findUnique({
      where: {
        id: params.campaignId,
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.log("[CAMPAIGN_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { campaignId: string; } }
) {
  try {
      const { userId } = auth();
      console.log(auth())
      if(!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const campaign = await db.campaign.findUnique({
        where: {
          id: params.campaignId,
        }
      });

      if (!campaign) {
        return new NextResponse("Not Found", { status: 404 });
      }


      const deletedCampaign = await db.campaign.delete({
        where: {
          id: params.campaignId
        }
      });
      
      return NextResponse.json(deletedCampaign);
} catch (error) {
  console.log("[CHAMPAIGN_ID_DELETE]", error);
  return new NextResponse("Internal Error", { status: 500 });
}

}

export async function PATCH(
  req: Request,
  { params } : { params: { campaignId: string; } }
) {
  try {
    const { userId } = auth();
    const {isPublished, ...values} = await req.json();
    console.log("data", values)
  
    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const campaign = await db.campaign.update({
      where: {
        id: params.campaignId,
      },
      data: {
        ...values,
      }
    });

    return new NextResponse
  } catch (error) {
    console.log("[CAMPAIGN_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}