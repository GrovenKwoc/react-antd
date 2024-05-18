import { Metadata } from "next";

import Pagination from "@/app/component/log/pagination";
import Search from "@/app/component/search";
import Table from "@/app/component/log/table";
import { CreateRecord } from "@/app/component/log/buttons";
import { lusitana } from "@/app/component/fonts";
import { InvoicesTableSkeleton } from "@/app/component/skeletons";
import { Suspense } from "react";
import { fetchRecordsPages } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "仇恨故事",
};

export default async function LogsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchRecordsPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>仇恨故事大全</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="寻找仇恨故事..." />
        <CreateRecord />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
