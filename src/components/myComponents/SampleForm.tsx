import React, { useState, useRef, useEffect } from "react";

interface EditFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const SampleForm: React.FC<EditFormProps> = ({ open, setOpen }) => {
  const [title, setTitle] = useState<string>(""); // State to hold the title
  const [description, setDescription] = useState<string>(""); // State to hold the description
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // State to hold isCompleted value (true for Done, false for Undone)
  const modalRef = useRef<HTMLDivElement>(null); // Ref to detect click outside modal

  // Handle the form submission to send a POST request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!title || !description) {
      alert("Please provide both title and description");
      return;
    }

    try {
      // Make the POST request to the API
      const response = await fetch(`${BASE_URL}/api/add-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          isCompleted, // Send the isCompleted value
        }),
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        console.log("Todo added:", data);
        setOpen(false); // Close the modal after successful submission
        window.location.reload(); // Refresh the page to see the new todo
      } else {
        console.error("Error adding todo");
        alert("Failed to add todo");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the todo");
    }
  };

  // Close the modal if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false); // Close the modal if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div>
      {open && (
        <>
          {/* Full page overlay */}
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50" />

          {/* Modal Content */}
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
            <div
              ref={modalRef}
              className="bg-white p-6 rounded-md shadow-lg w-1/3 dark:bg-gray-800 dark:text-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
                Add Todo
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    className="w-full p-2 border border-gray-300 rounded-md mt-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  />
                </div>

                {/* Description Input */}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                    className="w-full p-2 border border-gray-300 rounded-md mt-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  />
                </div>

                {/* Select Field for isCompleted */}
                <div className="mb-4">
                  <label
                    htmlFor="isCompleted"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Status
                  </label>
                  <select
                    id="isCompleted"
                    value={isCompleted ? "done" : "undone"}
                    onChange={(e) => setIsCompleted(e.target.value === "done")}
                    className="w-full p-2 border border-gray-300 rounded-md mt-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  >
                    <option value="undone">Undone</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 dark:bg-gray-600 dark:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Add Todo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SampleForm;
