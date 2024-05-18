"use client";

import { HaterField, RecordForm } from "@/app/lib/definitions";
import {
  CheckOutlined,
  HourglassOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Button } from "@/app/component/button";
import { updateRecord } from "@/app/lib/actions";

export default function EditRecordForm({
  record,
  haters,
}: {
  record: RecordForm;
  haters: HaterField[];
}) {
  const updateRecordWithId = updateRecord.bind(null, record.id);
  return (
    <form action={updateRecordWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="hater" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="hater"
              name="haterId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={record.hater_id}
            >
              <option value="" disabled>
                选择你的仇家
              </option>
              {haters.map((hater) => (
                <option key={hater.id} value={hater.id}>
                  {hater.name}
                </option>
              ))}
            </select>
            <UserOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            修改你的仇恨故事
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="content"
                name="content"
                defaultValue={record.content}
                placeholder="请重新输入你的仇恨故事"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              ></textarea>
              <EditOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            修改你的情绪状态
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="unsolved"
                  name="status"
                  type="radio"
                  value="unsolved"
                  defaultChecked={record.status === "unsolved"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="unsolved"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  未排解 <HourglassOutlined className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="solved"
                  name="status"
                  type="radio"
                  value="solved"
                  defaultChecked={record.status === "solved"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="solved"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  已排解 <CheckOutlined className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/diary/record"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">修改记录</Button>
      </div>
    </form>
  );
}
