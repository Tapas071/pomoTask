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
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTodos.map((todo: any) => (
            <TableRow key={todo._id}>
              <TableCell className="font-medium">{todo.title}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>{todo.isCompleted ? "Done" : "Yet to do"}</TableCell>
              <TableCell>
                <button className="text-blue-500">Edit</button>
              </TableCell>
              <TableCell>
                <button
                  className="text-red-500"
                  onClick={() => DeleteTodo(todo._id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TodoTable;
