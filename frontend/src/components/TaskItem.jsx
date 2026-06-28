import api from "../services/api";
import { toast } from "react-toastify";

function TaskItem({ task, fetchTasks, setEditingTask }) {
  const deleteTask = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${task._id}`);

      toast.success("Task deleted successfully");

      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task");
    }
  };

  const completeTask = async () => {
    try {
      await api.put(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        status: "Completed",
      });

      toast.success("Task marked as completed");

      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div className="flex-1">

          <h2 className="text-xl font-bold text-slate-800">
            {task.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {task.description}
          </p>

          <span
            className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-semibold ${
              task.status === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task.status}
          </span>

        </div>

        <div className="flex gap-2 flex-wrap justify-end">

          <button
            onClick={() => setEditingTask(task)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </button>

          {task.status !== "Completed" && (
            <button
              onClick={completeTask}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Complete
            </button>
          )}

          <button
            onClick={deleteTask}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default TaskItem;