import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
 

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

      // const ownCampaign = await db.campaign.findUnique({
      //   where: {
      //     id: params.campaignId,
      //     userId,
      //   }
      // });

      // if(!ownCampaign) {
      //   return new NextResponse("Unauthorized", { status: 401 });
      // }

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

      // const publishedCampaigns = await db.campaign.findMany({
      //   where: {
      //     id: params.campaignId,
      //     isPublished: true,
      //   }
      // });

      // if(!publishedCampaigns.length) {
      //   await db.campaign.update({
      //     where: {
      //       id: params.campaignId,
      //     },
      //     data: {
      //       isPublished: false,
      //     }
      //   });
      // }
      
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
  
    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const ownCampaign = await db.campaign.findUnique({
    //   where: {
    //     id: params.campaignId,
    //     userId
    //   }
    // });

    // if(!ownCampaign) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

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