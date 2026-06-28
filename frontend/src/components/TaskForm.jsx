import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function TaskForm({ fetchTasks, editingTask, setEditingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, {
          title,
          description,
          status: editingTask.status,
        });

        toast.success("Task updated successfully");
        setEditingTask(null);
      } else {
        await api.post("/tasks", {
          title,
          description,
          status: "Pending",
        });

        toast.success("Task added successfully");
      }

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-5">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        rows="4"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;