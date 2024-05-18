import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
// import { deleteRecord } from '@/app/lib/actions';

export function CreateHater() {
  return (
    <Link
      href="/test/haters/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">新增仇人</span>{" "}
      <PlusOutlined className="h-5 md:ml-4" />
    </Link>
  );
}

// export function UpdateHater({ id }: { id: string }) {
//   return (
//     <Link
//       href={`/diary/hater/${id}/edit`}
//       className="rounded-md border p-2 hover:bg-gray-100"
//     >
//       <PencilIcon className="w-5" />
//     </Link>
//   );
// }

// export function DeleteHater({ id }: { id: string }) {
//   const deleteHaterWithId = deleteHater.bind(null, id);
//   return (
//     <form action={deleteHaterWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">删除</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }
