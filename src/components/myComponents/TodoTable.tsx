"use client";
import React, { useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Todo } from "@/types";

const TodoTable = () => {
  const [Todos, setTodos] = React.useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todoResponse = await axios.get("/api/get-todos");
      if (todoResponse.status !== 200) {
        console.error("Error fetching todos");
        return;
      }
      const todoData = todoResponse.data;
      setTodos(todoData);
    };
    fetchTodos();
  }, []);

  const DeleteTodo = async (id: string) => {
    const todoResponse = await axios.delete(`/api/delete-todo`, {
      data: { id },
    });
    if (todoResponse.status !== 200) {
      console.error("Error deleting todo");
      return;
    }
    setTodos(Todos.filter((todo) => todo._id !== id));
  };

  // Sort the todos: incomplete first, then completed
  const sortedTodos = Todos.sort((a, b) => {
    return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
  });

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow>
            <TableHead className="w-[100px] text-gray-800 dark:text-gray-200">
              Title
            </TableHead>
            <TableHead className="text-gray-800 dark:text-gray-200">
              Description
            </TableHead>
            <TableHead className="text-gray-800 dark:text-gray-200">
              Status
            </TableHead>
            <TableHead className="text-gray-800 dark:text-gray-200">
              Edit
            </TableHead>
            <TableHead className="text-gray-800 dark:text-gray-200">
              Delete
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white dark:bg-gray-900">
          {sortedTodos.map((todo: any) => (
            <TableRow
              key={todo._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                {todo.title}
              </TableCell>
              <TableCell className="text-gray-700 dark:text-gray-300">
                {todo.description}
              </TableCell>
              <TableCell className="text-gray-700 dark:text-gray-300">
                {todo.isCompleted ? "Done" : "Yet to do"}
              </TableCell>
              <TableCell>
                <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                  Edit
                </button>
              </TableCell>
              <TableCell>
                <button
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  onClick={() => DeleteTodo(todo._id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoTable;
