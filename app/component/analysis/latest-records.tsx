import { PieChartOutlined } from "@ant-design/icons";
import { lusitana } from "@/app/component/fonts";
import { LatestRecord } from "@/app/lib/definitions";
import { fetchLatestRecords } from "@/app/lib/data";

export default async function LatestRecords() {
  const LatestRecords = await fetchLatestRecords();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        平台新增情绪记录
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        NOTE: 负面情绪需要及时排解，请及时与亲友或AI沟通。
        <div className="bg-white px-6">
          {LatestRecords.map((record, i) => {
            return (
              <div
                key={record.id}
                className={`flex flex-row items-center justify-between py-4 ${
                  i !== 0 ? "border-t" : ""
                }`}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {record.name}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {record.content}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <PieChartOutlined className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
