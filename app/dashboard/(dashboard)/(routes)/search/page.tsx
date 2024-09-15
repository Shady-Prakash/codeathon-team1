import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCampaigns } from "@/actions/get-courses";
import { CampaignsList } from "@/components/campaigns-list";

import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
}

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });
  console.log("categories", categories)

  const campaigns = await getCampaigns({
    ...searchParams,
  });

  console.log("page",campaigns)

  return ( 
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput/>
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <CampaignsList items={campaigns} />
      </div>
    </>
   );
}
 
export default SearchPage;