import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, Map, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { NameForm } from "./_components/title-form";
import { EmailForm } from "./_components/email-form";
import { GooglemapPlaces } from "./_components/googlemap-places";
// import { DescriptionForm } from "./_components/description-form";
// import { ImageForm } from "./_components/image-form";
// import { CategoryForm } from "./_components/category-form";
// import { PriceForm } from "./_components/price-form";
// import { AttachmentForm } from "./_components/attachment-form";
// import { ChaptersForm } from "./_components/chapters-form";
// import { Actions } from "./_components/actions";

const DonorIdPage = async ({
  params
}: {
  params: { donorId: string }
}) => {
  const { userId } = auth();

  if(!userId) {
    return redirect("/");
  }

  const donor = {
    name: "ram",
    email: "ram@gmail.com",
    streetAddress: " ",
    country: " ",
    zipCode: " ",
    city: " ",
    state: " "
  }

  // const donors = await db.donor.findMany({
  //   orderBy: {
  //     name: "asc",
  //   },
  // });

  // if(!donor) {
  //   return redirect("/dashboard");
  // }

  // const requiredFields = [
  //   donor.name,
  //   // course.description,
  //   // course.imageUrl,
  //   // course.price,
  //   // course.categoryId,
  //   // course.chapters.some(chapter => chapter.isPublished),
  // ]

  // const totalFields = requiredFields.length;
  // const completedFields = requiredFields.filter(Boolean).length;

  // const completionText = `(${completedFields}/${totalFields})`;

  // const isComplete = requiredFields.every(Boolean);

  return ( 
    <>
      {/* {!course.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )} */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Donor setup
            </h1>
            <span className="text-sm text-slate-700">
              {/* Complete all fields {completionText} */}
            </span>
          </div>
          {/* <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          /> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard}/>
                <h2 className="text-xl">
                  Customize donor details
                </h2>
              </div>
              <NameForm
                initialData={donor}
                donorId={params.donorId}
              />
              <EmailForm
                initialData={donor}
                donorId={params.donorId}
              />
            </div>
          </div>
          <div>
          <div className="flex items-center gap-x-2">
              <IconBadge icon={Map}/>
              <h2 className="text-xl">
                Donor Address
              </h2>
            </div>
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
              <GooglemapPlaces/>
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default DonorIdPage;