import  Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center h-full">
      <Link href="/dashboard" className="text-black border-b-blue-400 bg-blue-400 p-4">
        Dashboard
      </Link>
    </div>
  );
}
