import { Metadata } from "next";
import { GameClientComponent} from "@/app/component/GameClientComponent";

export const metadata: Metadata = {
  title: "记仇网|专业提供情绪价值",
};

export default function TestPage() {
  return <GameClientComponent/>;
}
