import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";

const OrganizationIdPage = async ({
  params
}: {
  params: { organizationId: string }
}) => {
  const { userId } = auth();

  if(!userId) {
    return redirect("/");
  }

  const organization = await db.organization.findUnique({
    where: {
      id: params.organizationId,
      userId
    },
  });


  if(!organization) {
    return redirect("/");
  }


  return ( 
    <>
      {!organization && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard}/>
              <h2 className="text-xl">
                Customize your course
              </h2>
            </div>
            <TitleForm
              initialData={organization}
              organizationId={organization.id}
            />
          </div>
        </div>
      </div>
    </>
   );
}
 
export default OrganizationIdPage;