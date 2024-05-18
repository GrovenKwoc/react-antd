import { Metadata } from "next";
import { Suspense } from "react";
import {
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/component/skeletons";
import CardWrapper from "@/app/component/analysis/cards";
import LatestRecords from "@/app/component/analysis/latest-records";
import { lusitana } from "@/app/component/fonts";

export const metadata: Metadata = {
  title: "记仇网|专业提供情绪价值",
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        情绪数据综合
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestRecords />
        </Suspense>
      </div>
    </main>
  );
}
