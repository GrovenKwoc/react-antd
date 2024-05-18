import { fetchAllHaters, fetchFilteredHaters } from "@/app/lib/data";
import HatersTable from "@/app/component/haters/table";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "黑名单仇人",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    // page?: string;
  };
}) {
  const query = searchParams?.query || "";
  // const currentPage = Number(searchParams?.page) || 1;
  const totalHaters = await fetchFilteredHaters(query);
  return (
    <main>
      <HatersTable haters={totalHaters} />
    </main>
  );
}
