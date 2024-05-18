import { CheckOutlined, HourglassOutlined } from "@ant-design/icons";
// import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs">
      {status === "unsolved" ? (
        <>
          未排解
          <HourglassOutlined className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "solved" ? (
        <>
          已排解
          <CheckOutlined className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
