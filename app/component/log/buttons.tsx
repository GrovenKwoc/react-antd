import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { deleteRecord } from "@/app/lib/actions";

export function CreateRecord() {
  return (
    <Link
      href="/test/logs/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">记录仇恨</span>{" "}
      <PlusOutlined className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateRecord({ id }: { id: string }) {
  return (
    <Link
      href={`/test/logs/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EditOutlined className="w-5" />
    </Link>
  );
}

export function DeleteRecord({ id }: { id: string }) {
  const deleteRecordWithId = deleteRecord.bind(null, id);
  return (
    <form action={deleteRecordWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">删除</span>
        <DeleteOutlined className="w-5" />
      </button>
    </form>
  );
}
