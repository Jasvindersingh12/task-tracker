import { useEffect, useState } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks");

      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <div className="max-w-5xl mx-auto py-10 px-4">

          <h1 className="text-4xl font-bold text-center mb-8">
            Task Tracker
          </h1>

          <TaskForm
            fetchTasks={fetchTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />

          <div className="flex flex-col md:flex-row gap-4 mb-8">

            <input
              type="text"
              placeholder="Search tasks..."
              className="flex-1 border rounded-lg p-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border rounded-lg p-3"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>

          </div>

          {loading ? (
            <div className="text-center text-xl">
              Loading...
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              fetchTasks={fetchTasks}
              setEditingTask={setEditingTask}
            />
          )}

        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
}

export default App;