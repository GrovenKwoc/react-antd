import { UpdateRecord, DeleteRecord } from "@/app/component/log/buttons";
import RecordStatus from "@/app/component/log/status";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredRecords } from "@/app/lib/data";

export default async function RecordsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const records = await fetchFilteredRecords(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {records?.map((record) => (
              <div
                key={record.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{record.name}</p>
                    </div>
                  </div>
                  <RecordStatus status={record.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{record.content}</p>
                    <p>{formatDateToLocal(record.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateRecord id={record.id} />
                    <DeleteRecord id={record.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  仇家
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  事件
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  时间
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  我的状态
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {records?.map((record) => (
                <tr
                  key={record.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{record.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {record.content}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(record.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <RecordStatus status={record.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateRecord id={record.id} />
                      <DeleteRecord id={record.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
