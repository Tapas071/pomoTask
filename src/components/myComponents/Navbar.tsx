"use client";
import { useState } from "react";
import React from "react";
import dynamic from "next/dynamic";
import Settings from "./Settings";
import Image from "next/image";
import pomoClock from "@/assets/images/clockHeroIcon.png";
import EditForm from "./EditForm";
import SampleForm from "./SampleForm";
import { ModeToggle } from "./mode-toggle";

// const EditForm = dynamic(
//   () => import("./EditForm").then((mod) => mod.EditForm),
//   { ssr: false }
// );

const Button = dynamic(() => import("../ui/button").then((mod) => mod.Button), {
  ssr: false,
});

interface Todo {
  id: number;
  text: string;
}

const Navbar = () => {
  const [todo, setTodo] = useState<Todo | null>(); // State to hold the input value
  const [todos, setTodos] = useState<Todo[]>([]); // State to hold the list of todos
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="h-16 flex items-center justify-between bg-white dark:bg-gray-900 shadow-sm px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="w-12 h-12 relative">
            <Image
              src={pomoClock}
              alt="logo"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <span className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Pomodoro App
          </span>
        </div>

        {/* Add Todo Button */}
        <div className="flex items-center">
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add Todo
          </Button>
          {/* <EditForm open={open} setOpen={setOpen} /> */}
          <SampleForm open={open} setOpen={setOpen} />
        </div>

        {/* Settings and Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <Settings />
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
