import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Image } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { CampaignTitleForm } from "./_components/campaign-title-form";
import { CampaignDescriptionForm } from "./_components/campaign-description-form";
import { ImageForm } from "./_components/image-form";
import { CampaignActions } from "./_components/campaign-actions";
import { FundForm } from "./_components/fund-form";
import { CategoryForm } from "./_components/category-form";

const ChapterIdPage = async({
  params
}: {
  params: { campaignId: string }
}) => {
  const { userId } = auth();


  if(!userId) {
    return redirect("/");
  }

  const campaign = await db.campaign.findUnique({
    where: {
      id: params.campaignId,
      userId
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });



  if(!campaign) {
    return redirect("/");
  }

  const requiredFields = [
    campaign.title,
    campaign.description,
    // campaign.imageUrl,
    campaign.fund,
    campaign.categoryId,
  ];
  
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return ( 
    <>
    {!campaign.isPublished && (
      <Banner
        variant="warning"
        label="This campaign is unpublished. It will not be visible in the campaign"
      />
    )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/admin/campaigns`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2"/>
              Back to campaign setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Campaign Creation
                </h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <CampaignActions
                disabled={!isComplete}
                campaignId={params.campaignId}
                isPublished={campaign.isPublished}
              />
            </div>
          </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard}/>
                  <h2 className="text-xl">
                    Customize your campaign
                  </h2>
                </div>
                <CampaignTitleForm
                  initialData={campaign}
                  campaignId={params.campaignId}
                />
                <CampaignDescriptionForm
                  initialData={campaign}
                  campaignId={params.campaignId}
                />
                <FundForm
                  initialData={campaign}
                  campaignId={campaign.id}
                />
                <CategoryForm
                  initialData={campaign}
                  campaignId={campaign.id}
                  options={categories.map((category) => ({
                    label: category.name,
                   value: category.id,
                 }))}
                />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Image}/>
              <h2 className="text-xl">
                Add an image
              </h2>
            </div>
            <ImageForm
              initialData={campaign}
              campaignId={campaign.id}
            />
          </div>
        </div>
      </div>
    </>
   );
}
 
export default ChapterIdPage;