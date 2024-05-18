import { lusitana } from "@/app/component/fonts";
import Search from "@/app/component/search";
import { FormattedHatersTable } from "@/app/lib/definitions";
import { CreateHater } from "@/app/component/haters/buttons";
export default async function HatersTable({
  haters,
}: {
  haters: FormattedHatersTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Soul仇人黑名单
      </h1>
      <div className="flex flex-row space-x-8">
        <Search placeholder="查找仇人..." />
        <CreateHater />
      </div>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {haters?.map((hater) => (
                  <div
                    key={hater.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <p className="text-sm text-gray-500">{hater.name}</p>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">旧怨</p>
                        <p className="font-medium">{hater.total_unsolved}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">解怨</p>
                        <p className="font-medium">{hater.total_solved}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{hater.total_records} 累计积怨</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      仇人昵称
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      结仇记录数
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      未解恩怨
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      已解恩怨
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {haters.map((hater) => (
                    <tr key={hater.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{hater.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {hater.total_records}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {hater.total_unsolved}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {hater.total_solved}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
