import { Form } from "@/app/component/haters/create-form";
import Breadcrumbs from "@/app/component/breadcrumbs";
import { fetchAllHaters } from "@/app/lib/data";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "新增仇人",
};

export default async function Page() {
  const haters = await fetchAllHaters();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "黑名单仇人", href: "/test/haters" },
          {
            label: "追加仇人",
            href: "/test/haters/create",
            active: true,
          },
        ]}
      />
      <Form haters={haters} />
    </main>
  );
}
