"use client";

import React, { useState } from "react";

export default function ToDoList() {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [inputValue, setInputValue] = useState<string>("");

  const addToDo = () => {
    if (inputValue.trim() === "") return;
    setToDos([
      ...toDos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
  };

  const toggleComplete = (id: number) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteToDo = (id: number) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };

  const filteredToDos = toDos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">To-Do List</h1>
      <div className="flex items-center w-full max-w-md mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
        />
        <button
          onClick={addToDo}
          className="px-8 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 ml-8 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded ${
            filter === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Pending
        </button>
      </div>

      <ul className="w-full max-w-md">
        {filteredToDos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 mb-2 bg-white rounded shadow text-black"
          >
            <span
              className={`flex-grow cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteToDo(todo.id)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
