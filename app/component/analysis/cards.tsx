import {
  CheckOutlined,
  HourglassOutlined,
  TeamOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { lusitana } from "@/app/component/fonts";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
  solved: CheckOutlined,
  haters: TeamOutlined,
  unsolved: HourglassOutlined,
  records: SnippetsOutlined,
};

export default async function CardWrapper() {
  const {
    numberOfRecords,
    numberOfHaters,
    totalSolvedRecords,
    totalUnsolvedRecords,
  } = await fetchCardData();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="已排解" value={totalSolvedRecords} type="solved" />
      <Card title="待排解" value={totalUnsolvedRecords} type="unsolved" />
      <Card title="仇恨事件数" value={numberOfRecords} type="records" />
      <Card title="仇人总数" value={numberOfHaters} type="haters" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "records" | "haters" | "unsolved" | "solved";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
