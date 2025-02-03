import Clock from "@/components/myComponents/Clock";
import Navbar from "@/components/myComponents/Navbar";
import TodoTable from "@/components/myComponents/TodoTable";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="h-screen p-10 bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <Clock />
        <div className="">
          <TodoTable />
        </div>
      </div>
    </>
  );
}
