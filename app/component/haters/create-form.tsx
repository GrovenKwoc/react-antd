import { Button } from "@/app/component/button";
import { createHater } from "@/app/lib/actions";
import Link from "next/link";
import { HaterField } from "@/app/lib/definitions";

export function Form({ haters }: { haters: HaterField[] }) {
  return (
    <form action={createHater}>
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          请输入你的仇人名字
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              placeholder="请输入你的仇人名字"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/test/haters"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          先不要好了
        </Link>
        <Button type="submit">新增仇人</Button>
      </div>
    </form>
  );
}
