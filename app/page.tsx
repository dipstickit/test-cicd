"use client";

import { useState } from "react";
import ToDoList from "@/components/ToDoList/ToDoList";

const Home: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6">
      <div className="w-full max-w-2xl bg-gray-700 rounded-lg shadow-md p-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-6">
          Welcome to Hola Hola!
        </h1>
        <p className="text-lg mb-6">
          You have clicked the button {count} times.
        </p>
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
          onClick={() => setCount(count + 1)}
        >
          Click me!
        </button>
      </div>

      <div className="w-full max-w-3xl mt-10">
        <ToDoList />
      </div>
    </div>
  );
};

export default Home;
