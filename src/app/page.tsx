import Clock from "@/components/myComponents/Clock";
import Navbar from "@/components/myComponents/Navbar";
import TodoTable from "@/components/myComponents/TodoTable";
import Image from "next/image";

export default function Home() {
  return (
  <>
    <Navbar/>
    <Clock/>
    <TodoTable/>
  </>
  );
}
