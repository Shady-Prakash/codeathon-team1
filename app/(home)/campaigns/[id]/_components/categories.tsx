"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FcEngineering, FcFilmReel, FcMultipleDevices, FcMusic, FcOldTimeCamera, FcSalesPerformance, FcSportsMode } from "react-icons/fc";
import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

type SearchProps = {
  searchParams: Promise<{
    title: string;
    categoryId?: string;
  }>
}

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Filming": FcFilmReel,
  "Engineering": FcEngineering,
}

const Categories = (
  {
    items,
  }: CategoriesProps
) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("category");
  const currentTitle = searchParams.get("title");



  const onselectChange = (category: string) => {
    const isSelected = currentCategoryId === category;
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : category,
      }
    }, { skipNull: true, skipEmptyString: true });

    router.push(url, { scroll: false });
  }

  return (
    <>
      {
        <Select onValueChange={(value: string) => onselectChange(value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
                items.map((item) => (
                  <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      }
    </>
  )

}

export default Categories